import { CreateDeliveryController } from "@modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { Router } from "express";

const deliveriesRoutes = Router();

const createDeliveryController = new CreateDeliveryController();

deliveriesRoutes.post("/", createDeliveryController.handle);

export { deliveriesRoutes };
