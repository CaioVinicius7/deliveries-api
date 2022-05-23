import express from "express";
import "reflect-metadata";
import "dotenv/config";

import "@shared/container";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

export { app };
