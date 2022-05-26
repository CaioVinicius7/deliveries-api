import { inject, injectable } from "tsyringe";

import { IDeliveriesRepository } from "@modules/deliveries/repositories/IDeliveriesRepository";
import { Deliveries } from "@prisma/client";

@injectable()
export class FindAllDeliveriesUseCase {
  constructor(
    @inject("DeliveriesRepository")
    private deliveriesRepository: IDeliveriesRepository
  ) {}

  async execute(id_client: string): Promise<Deliveries[]> {
    const deliveries = await this.deliveriesRepository.findByClientId(
      id_client
    );

    return deliveries;
  }
}
