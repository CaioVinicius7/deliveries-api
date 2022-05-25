import { inject, injectable } from "tsyringe";

import { IDeliveriesRepository } from "@modules/deliveries/repositories/IDeliveriesRepository";
import { Deliveries } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";

interface IUpdateDeliveryman {
  id_delivery: string;
  id_deliveryman: string;
}

@injectable()
export class UpdateDeliverymanUseCase {
  constructor(
    @inject("DeliveriesRepository")
    private deliveriesRepository: IDeliveriesRepository
  ) {}

  async execute({
    id_delivery,
    id_deliveryman
  }: IUpdateDeliveryman): Promise<Deliveries> {
    const deliveryExists = await this.deliveriesRepository.findById(
      id_delivery
    );

    if (!deliveryExists) {
      throw new AppError("Delivery does not exists!", 404);
    }

    const delivery = await this.deliveriesRepository.updateDeliveryman(
      id_delivery,
      id_deliveryman
    );

    return delivery;
  }
}