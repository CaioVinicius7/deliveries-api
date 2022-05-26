import { inject, injectable } from "tsyringe";

import { IDeliveriesRepository } from "@modules/deliveries/repositories/IDeliveriesRepository";
import { Deliveries } from "@prisma/client";

@injectable()
export class FindAllDeliveriesUseCase {
  constructor(
    @inject("DeliveriesRepository")
    private deliveriesRepository: IDeliveriesRepository
  ) {}

  async execute(id_deliveryman: string): Promise<Deliveries[]> {
    const deliveries = await this.deliveriesRepository.findByDeliverymanId(
      id_deliveryman
    );

    return deliveries;
  }
}
