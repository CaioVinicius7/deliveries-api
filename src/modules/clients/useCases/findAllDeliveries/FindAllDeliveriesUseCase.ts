import { inject, injectable } from "tsyringe";
import { Deliveries } from "@prisma/client";

import { IDeliveriesRepository } from "@modules/deliveries/repositories/IDeliveriesRepository";
import { DeliveryMap } from "@modules/deliveries/mappers/DeliveryMap";
import { IDeliveryResponseDTO } from "@modules/deliveries/dtos/IDeliveryResponseDTO";

@injectable()
export class FindAllDeliveriesUseCase {
  constructor(
    @inject("DeliveriesRepository")
    private deliveriesRepository: IDeliveriesRepository
  ) {}

  async execute(id_client: string): Promise<IDeliveryResponseDTO[]> {
    const deliveries = await this.deliveriesRepository.findByClientId(
      id_client
    );

    let deliveriesFormatted = deliveries.map((delivery) => {
      return DeliveryMap.toDTO(delivery);
    });

    return deliveriesFormatted;
  }
}
