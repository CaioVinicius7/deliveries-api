import { Router } from "express";

import { CreateDeliveryController } from "@modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "@modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { UpdateDeliverymanController } from "@modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { ensureAuthenticateClient } from "../middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "../middlewares/ensureAuthenticateDeliveryman";
import { UpdateEndDateController } from "@modules/deliveries/useCases/updateEndDate/UpdateEndDateController";

const deliveriesRoutes = Router();

const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const updateEndDateController = new UpdateEndDateController();

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

deliveriesRoutes.patch(
  "/updateDeliveryman/:id",
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle
);

deliveriesRoutes.patch(
  "/updateEndDate/:id",
  ensureAuthenticateDeliveryman,
  updateEndDateController.handle
);

export { deliveriesRoutes };
