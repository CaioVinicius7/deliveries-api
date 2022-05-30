import { inject, injectable } from "tsyringe";
import { Clients } from "@prisma/client";
import { hash } from "bcrypt";

import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { AppError } from "@shared/errors/AppError";
import { ClientMap } from "@modules/clients/mappers/ClientMap";
import { IClientResponseDTO } from "@modules/clients/dtos/IClientResponseDTO";
import { ISmsProvider } from "@shared/container/providers/smsProvider/ISmsProvider";

interface ICreateClient {
  username: string;
  password: string;
  phone: string;
}

@injectable()
export class CreateClientUseCase {
  constructor(
    @inject("ClientsRepository")
    private clientsRepository: IClientsRepository,
    @inject("SmsProvider")
    private smsProvider: ISmsProvider
  ) {}

  async execute({
    username,
    password,
    phone
  }: ICreateClient): Promise<IClientResponseDTO> {
    const clientExists = await this.clientsRepository.findByUsername(username);

    if (clientExists) {
      throw new AppError("Client already exists!");
    }

    const phoneExists = await this.clientsRepository.findByPhone(phone);

    if (phoneExists) {
      throw new AppError("A client register with this phone already exists!");
    }

    const hashPassword = await hash(password, 10);

    const client = await this.clientsRepository.create(
      username,
      hashPassword,
      phone
    );

    await this.smsProvider.accountCreated(phone, username);

    return ClientMap.toDTO(client);
  }
}
