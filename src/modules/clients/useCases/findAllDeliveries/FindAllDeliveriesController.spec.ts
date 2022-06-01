import request from "supertest";

import { prisma } from "@database/prismaClient";
import { app } from "@shared/infra/http/app";

describe("Find All Deliveries Controller - client", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.deliveries.deleteMany();
    await prisma.clients.deleteMany();
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.deliveries.deleteMany();
  });

  it("Should be able to return empty array for a client if there are no deliveries", async () => {
    const { body: client } = await request(app).post("/client/").send({
      username: "no deliveries",
      password: "test123",
      phone: "+5535940028922"
    });

    const responseToken = await request(app).post("/client/authenticate").send({
      username: client.username,
      password: "test123"
    });

    const { token } = responseToken.body;

    const response = await await request(app)
      .get("/client/deliveries")
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("Should be able to return all client deliveries", async () => {
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

    const response = await await request(app)
      .get("/client/deliveries")
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body));
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("created_at");
  });
});
