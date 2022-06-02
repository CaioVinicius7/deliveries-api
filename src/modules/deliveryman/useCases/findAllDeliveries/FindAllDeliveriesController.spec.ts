import request from "supertest";

import { prisma } from "@database/prismaClient";
import { app } from "@shared/infra/http/app";

describe("Find All Deliveries Controller - deliveryman", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.deliveries.deleteMany();
    await prisma.clients.deleteMany();
    await prisma.deliveryman.deleteMany();
  });

  it("Should be able to return empty array for a deliveryman if there are no deliveries", async () => {
    const { body: deliveryman } = await request(app)
      .post("/deliveryman/")
      .send({
        username: "no deliveries",
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
      .get("/deliveryman/deliveries")
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("Should be able to return all deliveryman deliveries", async () => {
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

    const { token: tokenClient } = responseTokenClient.body;

    const { body: delivery } = await request(app)
      .post("/delivery/")
      .send({
        item_name: "Headset Redragon Zeus RGB",
        initial_address: "1656 Sagwa Trail",
        final_address: "1766 Mujib Circle"
      })
      .set({
        Authorization: `Bearer ${tokenClient}`
      });

    const { body: deliveryman } = await request(app)
      .post("/deliveryman/")
      .send({
        username: "deliveryman",
        password: "test123"
      });

    const responseToken = await request(app)
      .post("/deliveryman/authenticate")
      .send({
        username: deliveryman.username,
        password: "test123"
      });

    const { token } = responseToken.body;

    await request(app)
      .patch(`/delivery/updateDeliveryman/${delivery.id}`)
      .set({
        Authorization: `Bearer ${token}`
      });

    const response = await request(app)
      .get("/deliveryman/deliveries")
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("created_at");
  });
});
