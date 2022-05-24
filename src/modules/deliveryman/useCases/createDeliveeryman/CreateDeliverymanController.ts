import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateDeliverymanUseCase } from "./CreateDeliveryMainUseCase";

export class CreateDeliverymanController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const createDeliverymanUseCase = container.resolve(
      CreateDeliverymanUseCase
    );

    const result = await createDeliverymanUseCase.execute({
      username,
      password
    });

    return res.status(201).json(result);
  }
}
