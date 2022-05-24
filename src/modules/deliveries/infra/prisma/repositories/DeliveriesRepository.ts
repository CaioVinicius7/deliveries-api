import { IDeliveriesRepository } from "@modules/deliveries/repositories/IDeliveriesRepository";
import { Deliveries } from "@prisma/client";
import { prisma } from "@database/prismaClient";

export class DeliveriesRepository implements IDeliveriesRepository {
  async createDelivery(
    item_name: string,
    id_client: string
  ): Promise<Deliveries> {
    const result = await prisma.deliveries.create({
      data: {
        item_name,
        id_client
      }
    });

    return result;
  }
}
