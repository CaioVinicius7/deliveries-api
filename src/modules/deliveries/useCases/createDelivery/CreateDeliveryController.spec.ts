import request from "supertest";

import { prisma } from "@database/prismaClient";
import { app } from "@shared/infra/http/app";

describe("Create Delivery Controller", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.deliveries.deleteMany();
    await prisma.clients.deleteMany();
    await prisma.$disconnect();
  });

  it("Should be able to create a new delivery", async () => {
    const { body: client } = await request(app).post("/client/").send({
      username: "client test",
      password: "test123",
      phone: "+5535922982004"
    });

    const responseTokenClient = await request(app)
      .post("/client/authenticate")
      .send({
        username: client.username,
        password: "test123"
      });

    const { token: token } = responseTokenClient.body;

    const response = await request(app)
      .post("/delivery/")
      .send({
        item_name: "Headset Redragon Zeus RGB",
        initial_address: "1656 Sagwa Trail",
        final_address: "1766 Mujib Circle"
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("id_client");
    expect(response.body).toHaveProperty("created_at");
  });
});
