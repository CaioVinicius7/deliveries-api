import { CreateClientController } from "@modules/clients/useCases/createClient/CreateClientController";
import { Router } from "express";

const clientsRoutes = Router();

const createClientController = new CreateClientController();

clientsRoutes.post("/", createClientController.handle);

export { clientsRoutes };
