import { AccountsRepository } from "@modules/accounts/infra/prisma/repositories/AccountsRepository";
import { IAccountsRepository } from "@modules/accounts/repositories/IAccountsRepository";
import { ClientsRepository } from "@modules/clients/infra/prisma/repositories/ClientsRepository";
import { IClientsRepository } from "@modules/clients/repositories/IClientsRepository";
import { DeliveriesRepository } from "@modules/deliveries/infra/prisma/repositories/DeliveriesRepository";
import { IDeliveriesRepository } from "@modules/deliveries/repositories/IDeliveriesRepository";
import { DeliverymanRepository } from "@modules/deliveryman/infra/prisma/repositories/DeliverymanRepository";
import { IDeliverymanRepository } from "@modules/deliveryman/repositories/IDeliverymanRepository";
import { container } from "tsyringe";

container.registerSingleton<IClientsRepository>(
  "ClientsRepository",
  ClientsRepository
);

container.registerSingleton<IAccountsRepository>(
  "AccountsRepository",
  AccountsRepository
);

container.registerSingleton<IDeliverymanRepository>(
  "DeliverymanRepository",
  DeliverymanRepository
);

container.registerSingleton<IDeliveriesRepository>(
  "DeliveriesRepository",
  DeliveriesRepository
);
