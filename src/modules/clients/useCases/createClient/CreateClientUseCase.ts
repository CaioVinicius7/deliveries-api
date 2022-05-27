import { inject, injectable } from "tsyringe";
import { Clients } from "@prisma/client";
import { hash } from "bcrypt";

import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { AppError } from "@shared/errors/AppError";
import { ClientMap } from "@modules/clients/mappers/ClientMap";
import { IClientResponseDTO } from "@modules/clients/dtos/IClientResponseDTO";

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

  async execute({
    username,
    password
  }: ICreateClient): Promise<IClientResponseDTO> {
    const clientExists = await this.clientsRepository.findByUsername(username);

    if (clientExists) {
      throw new AppError("Client already exists!");
    }

    const hashPassword = await hash(password, 10);

    const client = await this.clientsRepository.create(username, hashPassword);

    return ClientMap.toDTO(client);
  }
}
