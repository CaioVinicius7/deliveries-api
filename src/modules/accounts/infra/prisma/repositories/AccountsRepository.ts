import { IAccountsRepository } from "@modules/accounts/repositories/IAccountsRepository";
import { Clients } from "@prisma/client";
import { prisma } from "@database/prismaClient";

export class AccountsRepository implements IAccountsRepository {
  async verifyClient(username: string): Promise<Clients | null> {
    const result = await prisma.clients.findFirst({
      where: {
        username
      }
    });

    return result;
  }
}
