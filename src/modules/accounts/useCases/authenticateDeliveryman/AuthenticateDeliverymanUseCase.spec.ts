import { hash } from "bcrypt";

import { AppError } from "@shared/errors/AppError";
import { AccountsRepositoryInMemory } from "@modules/accounts/repositories/in-memory/AccountsRepositoryInMemory";
import { AuthenticateDeliverymanUseCase } from "./AuthenticateDeliverymanUseCase";

let authenticateDeliverymanUseCase: AuthenticateDeliverymanUseCase;
let accountsRepositoryInMemory: AccountsRepositoryInMemory;

describe("Authenticate Deliveryman", () => {
  beforeEach(async () => {
    accountsRepositoryInMemory = new AccountsRepositoryInMemory();
    authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase(
      accountsRepositoryInMemory
    );

    accountsRepositoryInMemory.deliveryman = [
      {
        id: "e1679495-9cd7-450e-bdfc-a85cfb918e74",
        username: "Connor Lloyd",
        password: await hash("95476106", 10)
      }
    ];
  });

  it("Should be able to authenticate a deliveryman", async () => {
    const result = await authenticateDeliverymanUseCase.execute({
      username: "Connor Lloyd",
      password: "95476106"
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate a nonexistent deliveryman", async () => {
    await expect(
      authenticateDeliverymanUseCase.execute({
        username: "Katharine Roberson",
        password: "60353442"
      })
    ).rejects.toEqual(new AppError("Username or password invalid!", 401));
  });

  it("Should not be able to authenticate a deliveryman with incorrect password", async () => {
    await expect(
      authenticateDeliverymanUseCase.execute({
        username: "Connor Lloyd",
        password: "84510923"
      })
    ).rejects.toEqual(new AppError("Username or password invalid!", 401));
  });
});
