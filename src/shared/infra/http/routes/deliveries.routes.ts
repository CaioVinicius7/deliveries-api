import { CreateDeliveryController } from "@modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "@modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { Router } from "express";
import { ensureAuthenticateClient } from "../middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "../middlewares/ensureAuthenticateDeliveryman";

const deliveriesRoutes = Router();

const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();

deliveriesRoutes.post(
  "/",
  ensureAuthenticateClient,
  createDeliveryController.handle
);

deliveriesRoutes.get(
  "/available",
  ensureAuthenticateDeliveryman,
  findAllAvailableController.handle
);

export { deliveriesRoutes };
