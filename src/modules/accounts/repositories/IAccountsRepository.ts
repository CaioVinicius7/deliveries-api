import { Clients } from "@prisma/client";

interface IAccountsRepository {
  verifyClient(username: string): Promise<Clients | null>;
}

export { IAccountsRepository };
