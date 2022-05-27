import { Deliveries } from "@prisma/client";

interface IDeliveriesRepository {
  createDelivery(item_name: string, id_client: string): Promise<Deliveries>;
  findAllWithoutEndDate(): Promise<Deliveries[]>;
  findById(id: string): Promise<Deliveries | null>;
  updateDeliveryman(
    id_delivery: string,
    id_deliveryman: string
  ): Promise<Deliveries>;
  findByClientId(id_client: string): Promise<Deliveries[]>;
  findByDeliverymanId(id_deliveryman: string): Promise<Deliveries[]>;
  updateEndDate(id_delivery: string, id_deliveryman: string): Promise<Object>;
}

export { IDeliveriesRepository };
