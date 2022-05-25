import { IDeliveriesRepository } from "@modules/deliveries/repositories/IDeliveriesRepository";
import { Deliveries } from "@prisma/client";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllAvailableUseCase {
  constructor(
    @inject("DeliveriesRepository")
    private deliveriesRepository: IDeliveriesRepository
  ) {}

  async execute(): Promise<Deliveries[]> {
    const deliveries = await this.deliveriesRepository.findAllWithoutEndDate();

    return deliveries;
  }
}
