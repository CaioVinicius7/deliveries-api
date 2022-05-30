import { Clients } from "@prisma/client";
import { IClientResponseDTO } from "../dtos/IClientResponseDTO";

class ClientMap {
  static toDTO({ id, username, phone }: Clients): IClientResponseDTO {
    const client = {
      id,
      username,
      phone
    };

    return client;
  }
}

export { ClientMap };
