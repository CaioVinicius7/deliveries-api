import { inject, injectable } from "tsyringe";
import { prisma } from "@database/prismaClient";
import { hash } from "bcrypt";

import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";

interface ICreateClient {
  username: string;
  password: string;
}

@injectable()
export class CreateClientUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository
  ) {}

  async execute({ username, password }: ICreateClient) {
    const clientExists = await this.clientsRepository.findByUsername(username);

    if (clientExists) {
      throw new Error("Client already exists!");
    }

    const hashPassword = await hash(password, 10);

    const client = await this.clientsRepository.create(username, hashPassword);

    return client;
  }
}
