import { AuthenticateClientController } from "@modules/accounts/useCases/authenticateClientUseCase/AuthenticateClientController";
import { Router } from "express";

const authenticateRoutes = Router();

const authenticateClientController = new AuthenticateClientController();

authenticateRoutes.post("/authenticate", authenticateClientController.handle);

export { authenticateRoutes };
