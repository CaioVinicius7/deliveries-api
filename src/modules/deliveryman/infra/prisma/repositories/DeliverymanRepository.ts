import { IDeliverymanRepository } from "@modules/deliveryman/repositories/IDeliverymanRepository";
import { Deliveryman } from "@prisma/client";
import { prisma } from "@database/prismaClient";

export class DeliverymanRepository implements IDeliverymanRepository {
  async findByUsername(username: string): Promise<Deliveryman | null> {
    const result = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive"
        }
      }
    });

    return result;
  }

  async create(username: string, password: string): Promise<Deliveryman> {
    const result = await prisma.deliveryman.create({
      data: {
        username,
        password
      }
    });

    return result;
  }
}
