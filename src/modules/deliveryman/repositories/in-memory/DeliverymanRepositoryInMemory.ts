import { Deliveryman } from "@prisma/client";
import { IDeliverymanRepository } from "../IDeliverymanRepository";

export class DeliverymanRepositoryInMemory implements IDeliverymanRepository {
  private deliveryman: Deliveryman[] = [];

  async findByUsername(username: string): Promise<Deliveryman | null> {
    const result = this.deliveryman.find(
      (deliveryman) => deliveryman.username === username
    );

    return result || null;
  }

  async create(username: string, password: string): Promise<Deliveryman> {
    const deliveryman: Deliveryman = {
      id: "d09fdf9c-2402-42cd-969d-9973fd132022",
      username,
      password
    };

    this.deliveryman.push(deliveryman);

    return deliveryman;
  }
}
