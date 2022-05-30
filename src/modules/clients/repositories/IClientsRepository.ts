import { Clients } from "@prisma/client";

interface IClientsRepository {
  findByUsername(username: string): Promise<Clients | null>;
  findByPhone(phone: string): Promise<Clients | null>;
  create(username: string, password: string, phone: string): Promise<Clients>;
}

export { IClientsRepository };
