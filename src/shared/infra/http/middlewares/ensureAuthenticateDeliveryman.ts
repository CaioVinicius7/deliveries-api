import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { auth } from "@config/auth";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  username: string;
}

export async function ensureAuthenticateDeliveryman(
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
    const { sub, username } = verify(
      token,
      auth.secret_token_deliveryman as string
    ) as IPayload;

    req.id_deliveryman = sub;
    req.username_deliveryman = username;

    return next();
  } catch (err) {
    throw new AppError("Invalid token!", 401);
  }
}
