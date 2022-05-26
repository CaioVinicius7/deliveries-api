import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IDeliverymanRepository } from "@modules/deliveryman/repositories/IDeliverymanRepository";
import { Deliveryman } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";

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
  }: ICreateDeliveryman): Promise<Deliveryman> {
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

    return deliveryman;
  }
}
