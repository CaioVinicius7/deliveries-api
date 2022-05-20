import { ClientsRepository } from "@modules/clients/infra/prisma/repositories/ClientsRepository";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { container } from "tsyringe";

container.registerSingleton<IClientsRepository>(
  "ClientsRepository",
  ClientsRepository
);
