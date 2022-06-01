import request from "supertest";

import { prisma } from "@database/prismaClient";
import { app } from "@shared/infra/http/app";

describe("Authenticate client Controller", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.clients.deleteMany();
    await prisma.$disconnect();
  });

  it("Should be able to authenticate a client", async () => {
    const { body: client } = await request(app).post("/client/").send({
      username: "login client",
      password: "test123",
      phone: "+5535940028922"
    });

    const response = await request(app).post("/client/authenticate").send({
      username: client.username,
      password: "test123"
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Should not be able to authenticate a nonexistent client", async () => {
    const response = await request(app).post("/client/authenticate").send({
      username: "authenticate error",
      password: "test123"
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Username or password invalid!");
  });

  it("Should not be able to authenticate a client with an incorrect password", async () => {
    const { body: client } = await request(app).post("/client/").send({
      username: "password error",
      password: "test123",
      phone: "+5535922982004"
    });

    const response = await request(app).post("/client/authenticate").send({
      username: client.username,
      password: "incorrect"
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Username or password invalid!");
  });
});
