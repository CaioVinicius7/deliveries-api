import { inject, injectable } from "tsyringe";

import { IDeliveriesRepository } from "@modules/deliveries/repositories/IDeliveriesRepository";
import { DeliveryMap } from "@modules/deliveries/mappers/DeliveryMap";
import { IDeliveryResponseDTO } from "@modules/deliveries/dtos/IDeliveryResponseDTO";
import { ICreateDeliveryDTO } from "@modules/deliveries/dtos/ICreateDeliveryDTO";

@injectable()
export class CreateDeliveryUseCase {
  constructor(
    @inject("DeliveriesRepository")
    private deliveriesRepository: IDeliveriesRepository
  ) {}

  async execute({
    item_name,
    initial_address,
    final_address,
    id_client
  }: ICreateDeliveryDTO): Promise<IDeliveryResponseDTO> {
    const delivery = await this.deliveriesRepository.createDelivery({
      item_name,
      initial_address,
      final_address,
      id_client
    });

    return DeliveryMap.toDTO(delivery);
  }
}
