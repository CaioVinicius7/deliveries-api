import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateDeliverymanUseCase } from "./AuthenticateDeliverymanUseCase";

export class AuthenticateDeliverymanController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const authenticateDeliverymanUseCase = container.resolve(
      AuthenticateDeliverymanUseCase
    );

    const result = await authenticateDeliverymanUseCase.execute({
      username,
      password
    });

    return res.status(200).json(result);
  }
}
