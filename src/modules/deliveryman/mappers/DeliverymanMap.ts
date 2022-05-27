import { Deliveryman } from "@prisma/client";
import { IDeliverymanResponseDTO } from "../dtos/IDeliverymanResponseDTO";

class DeliverymanMap {
  static toDTO({ id, username }: Deliveryman): IDeliverymanResponseDTO {
    const deliveryman = {
      id,
      username
    };

    return deliveryman;
  }
}

export { DeliverymanMap };
