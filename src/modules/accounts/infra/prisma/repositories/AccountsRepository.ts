import { IAccountsRepository } from "@modules/accounts/repositories/IAccountsRepository";
import { Clients, Deliveryman } from "@prisma/client";
import { prisma } from "@database/prismaClient";

export class AccountsRepository implements IAccountsRepository {
  async verifyClient(username: string): Promise<Clients | null> {
    const result = await prisma.clients.findFirst({
      where: {
        username,
        AND: {
          username: {
            mode: "insensitive"
          }
        }
      }
    });

    return result;
  }

  async verifyDeliveryman(username: string): Promise<Deliveryman | null> {
    const result = await prisma.deliveryman.findFirst({
      where: {
        username,
        AND: {
          username: {
            mode: "insensitive"
          }
        }
      }
    });

    return result;
  }
}
