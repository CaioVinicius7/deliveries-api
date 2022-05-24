import { IDeliveriesRepository } from "@modules/deliveries/repositories/IDeliveriesRepository";
import { Deliveries } from "@prisma/client";
import { inject, injectable } from "tsyringe";

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
  }: ICreateDelivery): Promise<Deliveries> {
    const delivery = await this.deliveriesRepository.createDelivery(
      item_name,
      id_client
    );

    return delivery;
  }
}
