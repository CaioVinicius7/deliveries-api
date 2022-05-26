import { Router } from "express";

import { CreateDeliverymanController } from "@modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { ensureAuthenticateDeliveryman } from "../middlewares/ensureAuthenticateDeliveryman";
import { FindAllDeliveriesController } from "@modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesController";

const deliverymanRoutes = Router();

const createDeliverymanController = new CreateDeliverymanController();
const findAllDeliveries = new FindAllDeliveriesController();

deliverymanRoutes.post("/", createDeliverymanController.handle);

deliverymanRoutes.get(
  "/deliveries",
  ensureAuthenticateDeliveryman,
  findAllDeliveries.handle
);

export { deliverymanRoutes };
