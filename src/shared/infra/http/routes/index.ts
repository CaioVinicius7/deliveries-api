import { Router } from "express";

import { clientsRoutes } from "./clients.routes";

const router = Router();

router.use("/client", clientsRoutes);

export { router };
