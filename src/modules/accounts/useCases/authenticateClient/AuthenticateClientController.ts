import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateClientUseCase } from "./AuthenticateClientUseCase";

export class AuthenticateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const authenticateClientUseCase = container.resolve(
      AuthenticateClientUseCase
    );

    const result = await authenticateClientUseCase.execute({
      username,
      password
    });

    return res.status(200).json(result);
  }
}
