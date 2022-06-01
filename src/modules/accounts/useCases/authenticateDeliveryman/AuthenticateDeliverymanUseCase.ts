import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { IAccountsRepository } from "@modules/accounts/repositories/IAccountsRepository";
import { auth } from "@config/auth";
import { AppError } from "@shared/errors/AppError";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

interface IResponse {
  token: string;
}

@injectable()
export class AuthenticateDeliverymanUseCase {
  constructor(
    @inject("AccountsRepository")
    private accountsRepository: IAccountsRepository
  ) {}

  async execute({
    username,
    password
  }: IAuthenticateDeliveryman): Promise<IResponse> {
    const deliveryman = await this.accountsRepository.verifyDeliveryman(
      username
    );

    if (!deliveryman) {
      throw new AppError("Username or password invalid!", 401);
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new AppError("Username or password invalid!", 401);
    }

    const token = sign(
      {
        username
      },
      auth.secret_token_deliveryman as string,
      {
        subject: deliveryman.id,
        expiresIn: auth.expires_in
      }
    );

    return {
      token
    };
  }
}
