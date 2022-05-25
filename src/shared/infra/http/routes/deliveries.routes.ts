import { CreateDeliveryController } from "@modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "@modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { Router } from "express";
import { ensureAuthenticateClient } from "../middlewares/ensureAuthenticateClient";

const deliveriesRoutes = Router();

const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();

deliveriesRoutes.post(
  "/",
  ensureAuthenticateClient,
  createDeliveryController.handle
);

deliveriesRoutes.get("/available", findAllAvailableController.handle);

export { deliveriesRoutes };
