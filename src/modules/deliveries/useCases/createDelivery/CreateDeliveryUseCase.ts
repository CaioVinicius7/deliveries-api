import { inject, injectable } from "tsyringe";

import { IDeliveriesRepository } from "@modules/deliveries/repositories/IDeliveriesRepository";
import { Deliveries } from "@prisma/client";
import { DeliveryMap } from "@modules/deliveries/mappers/DeliveryMap";
import { IDeliveryResponseDTO } from "@modules/deliveries/dtos/IDeliveryResponseDTO";

interface ICreateDelivery {
  item_name: string;
  id_client: string;
}

@injectable()
export class CreateDeliveryUseCase {
  constructor(
    @inject("DeliveriesRepository")
    private deliveriesRepository: IDeliveriesRepository
  ) {}

  async execute({
    item_name,
    id_client
  }: ICreateDelivery): Promise<IDeliveryResponseDTO> {
    const delivery = await this.deliveriesRepository.createDelivery(
      item_name,
      id_client
    );

    return DeliveryMap.toDTO(delivery);
  }
}
