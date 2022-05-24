import { Clients, Deliveryman } from "@prisma/client";

interface IAccountsRepository {
  verifyClient(username: string): Promise<Clients | null>;
  verifyDeliveryman(username: string): Promise<Deliveryman | null>;
}

export { IAccountsRepository };
