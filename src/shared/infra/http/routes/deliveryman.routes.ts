import { Router } from "express";

import { CreateDeliverymanController } from "@modules/deliveryman/useCases/createDeliveeryman/CreateDeliverymanController";

const deliverymanRoutes = Router();
const createDeliverymanController = new CreateDeliverymanController();

deliverymanRoutes.post("/", createDeliverymanController.handle);

export { deliverymanRoutes };
