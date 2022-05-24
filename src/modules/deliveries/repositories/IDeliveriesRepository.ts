import { Deliveries } from "@prisma/client";

interface IDeliveriesRepository {
  createDelivery(item_name: string, id_client: string): Promise<Deliveries>;
}

export { IDeliveriesRepository };
