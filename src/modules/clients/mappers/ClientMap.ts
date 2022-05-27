import { Clients } from "@prisma/client";
import { IClientResponseDTO } from "../dtos/IClientResponseDTO";

class ClientMap {
  static toDTO({ id, username }: Clients): IClientResponseDTO {
    const client = {
      id,
      username
    };

    return client;
  }
}

export { ClientMap };
