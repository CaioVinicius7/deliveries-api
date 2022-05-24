import { Router } from "express";

import { clientsRoutes } from "./clients.routes";
import { deliverymanRoutes } from "./deliveryman.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { deliveriesRoutes } from "./deliveries.routes";

const router = Router();

router.use("/", authenticateRoutes);
router.use("/client", clientsRoutes);
router.use("/deliveryman", deliverymanRoutes);
router.use("/delivery", deliveriesRoutes);

export { router };
