import { inject, injectable } from "tsyringe";

import { IDeliveryResponseDTO } from "@modules/deliveries/dtos/IDeliveryResponseDTO";
import { IDeliveriesRepository } from "@modules/deliveries/repositories/IDeliveriesRepository";
import { DeliveryMap } from "@modules/deliveries/mappers/DeliveryMap";

@injectable()
export class FindAllAvailableUseCase {
  constructor(
    @inject("DeliveriesRepository")
    private deliveriesRepository: IDeliveriesRepository
  ) {}

  async execute(): Promise<IDeliveryResponseDTO[]> {
    const deliveries = await this.deliveriesRepository.findAllWithoutEndDate();

    let deliveriesFormatted = deliveries.map((delivery) => {
      return DeliveryMap.toDTO(delivery);
    });

    return deliveriesFormatted;
  }
}
