import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { auth } from "@config/auth";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  phone: string;
}

export async function ensureAuthenticateClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub, phone } = verify(
      token,
      auth.secret_token_client as string
    ) as IPayload;

    req.client.id = sub;
    req.client.phone = phone;

    return next();
  } catch (err) {
    throw new AppError("Invalid token!", 401);
  }
}
