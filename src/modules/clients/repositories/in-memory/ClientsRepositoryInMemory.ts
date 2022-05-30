import { Clients } from "@prisma/client";
import { IClientsRepository } from "../IClientsRepository";

export class ClientsRepositoryInMemory implements IClientsRepository {
  private clients: Clients[] = [];

  async findByUsername(username: string): Promise<Clients | null> {
    const result = this.clients.find((client) => client.username === username);

    return result || null;
  }

  async findByPhone(phone: string): Promise<Clients | null> {
    const result = this.clients.find((client) => client.phone === phone);

    return result || null;
  }

  async create(
    username: string,
    password: string,
    phone: string
  ): Promise<Clients> {
    const client = {
      id: "ef260490-313f-4ab0-a794-0d9611a19a3c",
      username,
      password,
      phone,
      created_at: new Date()
    };

    this.clients.push(client);

    return client;
  }
}
