import request from "supertest";

import { prisma } from "@database/prismaClient";
import { app } from "@shared/infra/http/app";

describe("Authenticate Deliveryman Controller", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.deliveryman.deleteMany();
    await prisma.$disconnect();
  });

  it("Should be able to authenticate a deliveryman", async () => {
    const { body: deliveryman } = await request(app)
      .post("/deliveryman/")
      .send({
        username: "login deliveryman",
        password: "test123"
      });

    const response = await request(app).post("/deliveryman/authenticate").send({
      username: deliveryman.username,
      password: "test123"
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Should not be able to authenticate a nonexistent deliveryman", async () => {
    const response = await request(app).post("/deliveryman/authenticate").send({
      username: "authenticate error",
      password: "test123"
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Username or password invalid!");
  });

  it("Should not be able to authenticate a deliveryman with an incorrect password", async () => {
    const { body: deliveryman } = await request(app)
      .post("/deliveryman/")
      .send({
        username: "password error",
        password: "test123"
      });

    const response = await request(app).post("/client/authenticate").send({
      username: deliveryman.username,
      password: "incorrect"
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Username or password invalid!");
  });
});
