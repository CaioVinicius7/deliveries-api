import { hash } from "bcrypt";

import { AccountsRepositoryInMemory } from "@modules/accounts/repositories/in-memory/AccountsRepositoryInMemory";
import { AuthenticateClientUseCase } from "./AuthenticateClientUseCase";
import { AppError } from "@shared/errors/AppError";

let authenticateClientUseCase: AuthenticateClientUseCase;
let accountsRepositoryInMemory: AccountsRepositoryInMemory;

describe("Authenticate Client", () => {
  beforeEach(async () => {
    accountsRepositoryInMemory = new AccountsRepositoryInMemory();
    authenticateClientUseCase = new AuthenticateClientUseCase(
      accountsRepositoryInMemory
    );

    accountsRepositoryInMemory.clients = [
      {
        id: "7d2fb1c6-6559-4fbe-9832-080d0e63ab30",
        username: "Willie Sharp",
        password: await hash("30501379", 10),
        phone: "+5535940028922"
      }
    ];
  });

  it("Should be able to authenticate a client", async () => {
    const result = await authenticateClientUseCase.execute({
      username: "Willie Sharp",
      password: "30501379"
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate a nonexistent client", async () => {
    await expect(
      authenticateClientUseCase.execute({
        username: "Charlie Meyer",
        password: "92203070"
      })
    ).rejects.toEqual(new AppError("Username or password invalid!"));
  });

  it("Should not be able to authenticate a client with incorrect password", async () => {
    await expect(
      authenticateClientUseCase.execute({
        username: "Willie Sharp",
        password: "84510923"
      })
    ).rejects.toEqual(new AppError("Username or password invalid!"));
  });
});
