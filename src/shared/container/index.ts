import { AccountsRepository } from "@modules/accounts/infra/prisma/repositories/AccountsRepository";
import { IAccountsRepository } from "@modules/accounts/repositories/IAccountsRepository";
import { ClientsRepository } from "@modules/clients/infra/prisma/repositories/ClientsRepository";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { container } from "tsyringe";

container.registerSingleton<IClientsRepository>(
  "ClientsRepository",
  ClientsRepository
);

container.registerSingleton<IAccountsRepository>(
  "AccountsRepository",
  AccountsRepository
);
