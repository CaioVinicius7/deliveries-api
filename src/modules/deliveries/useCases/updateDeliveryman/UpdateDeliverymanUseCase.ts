import { inject, injectable } from "tsyringe";

import { IDeliveriesRepository } from "@modules/deliveries/repositories/IDeliveriesRepository";
import { AppError } from "@shared/errors/AppError";
import { DeliveryMap } from "@modules/deliveries/mappers/DeliveryMap";
import { IDeliveryResponseDTO } from "@modules/deliveries/dtos/IDeliveryResponseDTO";
import { ISmsProvider } from "@shared/container/providers/smsProvider/ISmsProvider";

interface IUpdateDeliveryman {
  id_delivery: string;
  id_deliveryman: string;
  username_deliveryman: string;
}

@injectable()
export class UpdateDeliverymanUseCase {
  constructor(
    @inject("DeliveriesRepository")
    private deliveriesRepository: IDeliveriesRepository,
    @inject("SmsProvider")
    private smsProvider: ISmsProvider
  ) {}

  async execute({
    id_delivery,
    id_deliveryman,
    username_deliveryman
  }: IUpdateDeliveryman): Promise<IDeliveryResponseDTO> {
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

    // @ts-ignore
    const { phone: client_phone } = deliveryExists.client;

    await this.smsProvider.deliveryAccepted(client_phone, username_deliveryman);

    return DeliveryMap.toDTO(delivery);
  }
}
