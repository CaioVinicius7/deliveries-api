import { Clients } from "@prisma/client";

interface IClientsRepository {
  findByUsername(username: string): Promise<Clients | null>;
  create(username: string, password: string): Promise<Clients>;
}

export { IClientsRepository };
