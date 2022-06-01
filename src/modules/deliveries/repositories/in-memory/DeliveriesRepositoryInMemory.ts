import { Deliveries } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";

import { ICreateDeliveryDTO } from "@modules/deliveries/dtos/ICreateDeliveryDTO";
import { IDeliveriesRepository } from "../IDeliveriesRepository";
import { IDeliveryTestDTO } from "@modules/deliveries/dtos/IDeliveryTestDTO";

export class DeliveriesRepositoryInMemory implements IDeliveriesRepository {
  private deliveries: IDeliveryTestDTO[] = [];

  async createDelivery(data: ICreateDeliveryDTO): Promise<Deliveries> {
    const { id_client, item_name, initial_address, final_address } = data;

    const delivery: IDeliveryTestDTO = {
      id: uuidV4(),
      id_client,
      id_deliveryman: null,
      item_name,
      initial_address,
      final_address,
      created_at: new Date(),
      end_at: null,
      client: {
        id: "423dea89-8436-4fd5-af00-5313159dc846",
        username: "Anthony Harrington",
        password: "97442126",
        phone: "+5535940028922"
      }
    };

    this.deliveries.push(delivery);

    return delivery;
  }

  async findAllWithoutEndDate(): Promise<Deliveries[]> {
    const result = this.deliveries.filter(
      (delivery) => delivery.end_at === null
    );

    return result;
  }

  async findById(id: string): Promise<Deliveries | null> {
    const result = this.deliveries.find((delivery) => delivery.id === id);

    return result || null;
  }

  async updateDeliveryman(
    id_delivery: string,
    id_deliveryman: string
  ): Promise<Deliveries> {
    const delivery = this.deliveries.find(
      (delivery) => delivery.id === id_delivery
    );

    Object.assign(delivery, {
      id_deliveryman
    });

    // @ts-ignore
    return delivery;
  }

  async findByClientId(id_client: string): Promise<Deliveries[]> {
    const result = this.deliveries.filter(
      (delivery) => delivery.id_client === id_client
    );

    return result;
  }

  async findByDeliverymanId(id_deliveryman: string): Promise<Deliveries[]> {
    const result = this.deliveries.filter(
      (delivery) => delivery.id_deliveryman === id_deliveryman
    );

    return result;
  }

  async updateEndDate(
    id_delivery: string,
    id_deliveryman: string
  ): Promise<Object> {
    throw new Error("Method not implemented.");
  }
}
