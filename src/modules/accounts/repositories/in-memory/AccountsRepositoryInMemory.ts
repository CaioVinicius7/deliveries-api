import { Clients, Deliveryman } from "@prisma/client";
import { IAccountsRepository } from "../IAccountsRepository";

export class AccountsRepositoryInMemory implements IAccountsRepository {
  public clients: Clients[] = [];

  public deliveryman: Deliveryman[] = [];

  async verifyClient(username: string): Promise<Clients | null> {
    const result = this.clients.find((client) => client.username === username);

    return result || null;
  }

  async verifyDeliveryman(username: string): Promise<Deliveryman | null> {
    const result = this.deliveryman.find(
      (deliveryman) => deliveryman.username === username
    );

    return result || null;
  }
}
