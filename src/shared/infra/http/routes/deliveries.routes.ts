import { CreateDeliveryController } from "@modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { Router } from "express";
import { ensureAuthenticateClient } from "../middlewares/ensureAuthenticateClient";

const deliveriesRoutes = Router();

const createDeliveryController = new CreateDeliveryController();

deliveriesRoutes.post(
  "/",
  ensureAuthenticateClient,
  createDeliveryController.handle
);

export { deliveriesRoutes };
