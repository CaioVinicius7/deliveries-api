import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IDeliverymanRepository } from "@modules/deliveryman/repositories/IDeliverymanRepository";
import { AppError } from "@shared/errors/AppError";
import { DeliverymanMap } from "@modules/deliveryman/mappers/DeliverymanMap";
import { IDeliverymanResponseDTO } from "@modules/deliveryman/dtos/IDeliverymanResponseDTO";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

@injectable()
export class CreateDeliverymanUseCase {
  constructor(
    @inject("DeliverymanRepository")
    private deliverymanRepository: IDeliverymanRepository
  ) {}

  async execute({
    username,
    password
  }: ICreateDeliveryman): Promise<IDeliverymanResponseDTO> {
    const deliverymanExists = await this.deliverymanRepository.findByUsername(
      username
    );

    if (deliverymanExists) {
      throw new AppError("Deliveryman already exists!");
    }

    const hashPassword = await hash(password, 10);

    const deliveryman = await this.deliverymanRepository.create(
      username,
      hashPassword
    );

    return DeliverymanMap.toDTO(deliveryman);
  }
}
