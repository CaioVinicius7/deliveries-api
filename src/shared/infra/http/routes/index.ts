import { Router } from "express";

import { clientsRoutes } from "./clients.routes";
import { authenticateRoutes } from "./authenticate.routes";

const router = Router();

router.use("/", authenticateRoutes);
router.use("/client", clientsRoutes);

export { router };
