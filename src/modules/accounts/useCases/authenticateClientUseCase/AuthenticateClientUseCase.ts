import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { IAccountsRepository } from "@modules/accounts/repositories/IAccountsRepository";
import { auth } from "@config/auth";
import { AppError } from "@shared/errors/AppError";

interface IAuthenticateClient {
  username: string;
  password: string;
}

interface IResponse {
  token: string;
}

@injectable()
export class AuthenticateClientUseCase {
  constructor(
    @inject("AccountsRepository")
    private accountsRepository: IAccountsRepository
  ) {}

  async execute({
    username,
    password
  }: IAuthenticateClient): Promise<IResponse> {
    const client = await this.accountsRepository.verifyClient(username);

    if (!client) {
      throw new AppError("Username or password invalid!");
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new AppError("Username or password invalid!");
    }

    const token = sign(
      {
        username
      },
      auth.secret_token as string,
      {
        subject: client.id,
        expiresIn: auth.expires_in
      }
    );

    return {
      token
    };
  }
}
