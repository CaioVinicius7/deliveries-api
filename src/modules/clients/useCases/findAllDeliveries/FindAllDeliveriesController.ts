import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllDeliveriesUseCase } from "./FindAllDeliveriesUseCase";

export class FindAllDeliveriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id_client } = req;

    const findAllDeliveriesUseCase = container.resolve(
      FindAllDeliveriesUseCase
    );

    const deliveries = await findAllDeliveriesUseCase.execute(id_client);

    return res.status(200).json(deliveries);
  }
}
