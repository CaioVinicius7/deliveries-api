import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";

export class CreateDeliveryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: id_client } = req.client;
    const { item_name, initial_address, final_address } = req.body;

    const createDeliveryUseCase = container.resolve(CreateDeliveryUseCase);

    const delivery = await createDeliveryUseCase.execute({
      item_name,
      initial_address,
      final_address,
      id_client
    });

    return res.status(201).json(delivery);
  }
}
