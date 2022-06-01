import request from "supertest";

import { prisma } from "@database/prismaClient";
import { app } from "@shared/infra/http/app";

describe("Create Deliveryman Controller", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.deliveryman.deleteMany();
    await prisma.$disconnect();
  });

  it("Should be able to create a new deliveryman", async () => {
    const response = await request(app).post("/deliveryman/").send({
      username: "Juan Weber",
      password: "test123"
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("username");
  });

  it("Should not be able to create a deliveryman if desired username already exists", async () => {
    await request(app).post("/deliveryman/").send({
      username: "username error",
      password: "test123"
    });

    const response = await request(app).post("/deliveryman/").send({
      username: "username error",
      password: "test123"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Deliveryman already exists!");
  });
});
