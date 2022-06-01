import { Clients } from "@prisma/client";

interface IDeliveryTestDTO {
  id: string;
  id_client: string;
  id_deliveryman: string | null;
  item_name: string;
  initial_address: string;
  final_address: string;
  created_at: Date;
  end_at: Date | null;
  client?: Clients;
}

export { IDeliveryTestDTO };
