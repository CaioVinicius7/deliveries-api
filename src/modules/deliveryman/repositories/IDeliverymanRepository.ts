import { Deliveryman } from "@prisma/client";

interface IDeliverymanRepository {
  findByUsername(username: string): Promise<Deliveryman | null>;
  create(username: string, password: string): Promise<Deliveryman>;
}

export { IDeliverymanRepository };
