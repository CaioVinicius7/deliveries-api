import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateEndDateUseCase } from "./UpdateEndDateUseCase";

export class UpdateEndDateController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id_deliveryman } = req;
    const { id: id_delivery } = req.params;

    const updateEndDateUseCase = container.resolve(UpdateEndDateUseCase);

    const delivery = await updateEndDateUseCase.execute({
      id_delivery,
      id_deliveryman
    });

    return res.status(200).json(delivery);
  }
}
