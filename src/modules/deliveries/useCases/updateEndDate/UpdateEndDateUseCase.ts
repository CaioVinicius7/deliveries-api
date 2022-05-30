import { inject, injectable } from "tsyringe";

import { IDeliveriesRepository } from "@modules/deliveries/repositories/IDeliveriesRepository";
import { Deliveries } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { ISmsProvider } from "@shared/container/providers/smsProvider/ISmsProvider";

interface IUpdateEndDate {
  id_delivery: string;
  id_deliveryman: string;
}

@injectable()
export class UpdateEndDateUseCase {
  constructor(
    @inject("DeliveriesRepository")
    private deliveriesRepository: IDeliveriesRepository,
    @inject("SmsProvider")
    private smsProvider: ISmsProvider
  ) {}

  async execute({
    id_delivery,
    id_deliveryman
  }: IUpdateEndDate): Promise<Object> {
    const deliveryExists = await this.deliveriesRepository.findById(
      id_delivery
    );

    if (!deliveryExists) {
      throw new AppError("Delivery does not exists!", 404);
    }

    const delivery = await this.deliveriesRepository.updateEndDate(
      id_delivery,
      id_deliveryman
    );

    // @ts-ignore
    const { phone: client_phone } = deliveryExists.client;

    await this.smsProvider.deliveryCompletion(client_phone);

    return delivery;
  }
}
