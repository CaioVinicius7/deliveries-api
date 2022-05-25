import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";

export class UpdateDeliverymanController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id_deliveryman } = req;
    const { id: id_delivery } = req.params;

    const updateDeliverymanUseCase = container.resolve(
      UpdateDeliverymanUseCase
    );

    const delivery = await updateDeliverymanUseCase.execute({
      id_delivery,
      id_deliveryman
    });

    return res.status(200).json(delivery);
  }
}
