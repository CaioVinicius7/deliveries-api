import request from "supertest";

import { prisma } from "@database/prismaClient";
import { app } from "@shared/infra/http/app";

describe("Create Client Controller", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.clients.deleteMany();
    await prisma.$disconnect();
  });

  it("Should be able to create a new client", async () => {
    const response = await request(app).post("/client/").send({
      username: "Juan Weber",
      password: "test123",
      phone: "+55940028922"
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("username");
    expect(response.body).toHaveProperty("phone");
  });

  it("Should not be able to create a client if desired username already exists", async () => {
    await request(app).post("/client/").send({
      username: "username error",
      password: "test123",
      phone: "+55912345678"
    });

    const response = await request(app).post("/client/").send({
      username: "username error",
      password: "test123",
      phone: "+55987654321"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Client already exists!");
  });

  it("Should not be able to create a client if phone already registered", async () => {
    await request(app).post("/client/").send({
      username: "Lida Ramsey",
      password: "test123",
      phone: "+55936521487"
    });

    const response = await request(app).post("/client/").send({
      username: "phone error",
      password: "test123",
      phone: "+55936521487"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "A client register with this phone already exists!"
    );
  });
});
