import { Router } from "express";

import { AuthenticateClientController } from "@modules/accounts/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "@modules/accounts/useCases/authenticateDeliveryman/AuthenticateDeliverymanController";

const authenticateRoutes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

authenticateRoutes.post(
  "/client/authenticate",
  authenticateClientController.handle
);

authenticateRoutes.post(
  "/deliveryman/authenticate",
  authenticateDeliverymanController.handle
);

export { authenticateRoutes };
