import { CreateDeliverymanController } from "@modules/deliveryman/useCases/createDeliveeryman/CreateDeliverymanController";
import { Router } from "express";

const deliverymanRoutes = Router();

const createDeliverymanController = new CreateDeliverymanController();

deliverymanRoutes.post("/", createDeliverymanController.handle);

export { deliverymanRoutes };
