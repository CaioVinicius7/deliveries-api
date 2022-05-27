import { IDeliveriesRepository } from "@modules/deliveries/repositories/IDeliveriesRepository";
import { Deliveries } from "@prisma/client";
import { prisma } from "@database/prismaClient";
import { ICreateDeliveryDTO } from "@modules/deliveries/dtos/ICreateDeliveryDTO";

export class DeliveriesRepository implements IDeliveriesRepository {
  async createDelivery({
    item_name,
    initial_address,
    final_address,
    id_client
  }: ICreateDeliveryDTO): Promise<Deliveries> {
    const result = await prisma.deliveries.create({
      data: {
        item_name,
        initial_address,
        final_address,
        id_client
      }
    });

    return result;
  }

  async findAllWithoutEndDate(): Promise<Deliveries[]> {
    const result = await prisma.deliveries.findMany({
      where: {
        end_at: null,
        id_deliveryman: null
      }
    });

    return result;
  }

  async findById(id: string): Promise<Deliveries | null> {
    const result = await prisma.deliveries.findUnique({
      where: {
        id
      }
    });

    return result;
  }

  async updateDeliveryman(
    id_delivery: string,
    id_deliveryman: string
  ): Promise<Deliveries> {
    const result = await prisma.deliveries.update({
      where: {
        id: id_delivery
      },
      data: {
        id_deliveryman
      }
    });

    return result;
  }

  async findByClientId(id_client: string): Promise<Deliveries[]> {
    const result = await prisma.deliveries.findMany({
      where: {
        id_client
      }
    });

    return result;
  }

  async findByDeliverymanId(id_deliveryman: string): Promise<Deliveries[]> {
    const result = await prisma.deliveries.findMany({
      where: {
        id_deliveryman
      }
    });

    return result;
  }

  async updateEndDate(
    id_delivery: string,
    id_deliveryman: string
  ): Promise<Object> {
    const result = await prisma.deliveries.updateMany({
      where: {
        id: id_delivery,
        id_deliveryman
      },
      data: {
        end_at: new Date()
      }
    });

    return result;
  }
}
