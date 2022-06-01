import request from "supertest";

import { prisma } from "@database/prismaClient";
import { app } from "@shared/infra/http/app";

describe("Find All Available", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.deliveries.deleteMany();
    await prisma.deliveryman.deleteMany();
    await prisma.clients.deleteMany();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.deliveries.deleteMany();
  });

  it("Should be able to return an empty array if no deliveries are available", async () => {
    const { body: deliveryman } = await request(app)
      .post("/deliveryman/")
      .send({
        username: "no available",
        password: "test123"
      });

    const responseToken = await request(app)
      .post("/deliveryman/authenticate")
      .send({
        username: deliveryman.username,
        password: "test123"
      });

    const { token } = responseToken.body;

    const response = await request(app)
      .get("/delivery/available")
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("Should be able to return all available deliveries", async () => {
    const { body: client } = await request(app).post("/client/").send({
      username: "client deliveries",
      password: "test123",
      phone: "+5535922982004"
    });

    const responseToken = await request(app).post("/client/authenticate").send({
      username: client.username,
      password: "test123"
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/delivery/")
      .send({
        item_name: "Headset Redragon Zeus RGB",
        initial_address: "1656 Sagwa Trail",
        final_address: "1766 Mujib Circle"
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const { body: deliveryman } = await request(app)
      .post("/deliveryman/")
      .send({
        username: "deliveryman",
        password: "test123"
      });

    const responseTokenDeliveryman = await request(app)
      .post("/deliveryman/authenticate")
      .send({
        username: deliveryman.username,
        password: "test123"
      });

    const { token: tokenDeliveryman } = responseTokenDeliveryman.body;

    const response = await request(app)
      .get("/delivery/available")
      .set({
        Authorization: `Bearer ${tokenDeliveryman}`
      });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body));
    expect(response.body[0].id_deliveryman).toEqual(null);
  });
});
