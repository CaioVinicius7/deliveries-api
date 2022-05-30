import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateClientUseCase } from "./CreateClientUseCase";

export class CreateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password, phone } = req.body;

    const createClientUseCase = container.resolve(CreateClientUseCase);

    const result = await createClientUseCase.execute({
      username,
      password,
      phone
    });

    return res.status(201).json(result);
  }
}
