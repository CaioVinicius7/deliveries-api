import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { Clients } from "@prisma/client";
import { prisma } from "@database/prismaClient";

export class ClientsRepository implements IClientsRepository {
  async findByUsername(username: string): Promise<Clients | null> {
    const result = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive"
        }
      }
    });

    return result;
  }

  async findByPhone(phone: string): Promise<Clients | null> {
    const result = await prisma.clients.findUnique({
      where: {
        phone
      }
    });

    return result;
  }

  async create(
    username: string,
    password: string,
    phone: string
  ): Promise<Clients> {
    const result = await prisma.clients.create({
      data: {
        username,
        password,
        phone
      }
    });

    return result;
  }
}
