import { Deliveries } from "@prisma/client";

import { IDeliveryResponseDTO } from "../dtos/IDeliveryResponseDTO";
import { DayJsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayJsDateProvider";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";

const dateProvider: IDateProvider = new DayJsDateProvider();

class DeliveryMap {
  static toDTO({
    id,
    id_client,
    id_deliveryman,
    item_name,
    created_at,
    end_at
  }: Deliveries): IDeliveryResponseDTO {
    const delivery = {
      id,
      id_client,
      id_deliveryman,
      item_name,
      created_at: dateProvider.formatToLocal(created_at),
      end_at: end_at ? dateProvider.formatToLocal(end_at) : end_at
    };

    return delivery;
  }
}

export { DeliveryMap };
