import { DeliverymanRepositoryInMemory } from "@modules/deliveryman/repositories/in-memory/DeliverymanRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateDeliverymanUseCase } from "./CreateDeliverymanUseCase";

let createDeliverymanUseCase: CreateDeliverymanUseCase;
let deliverymanRepositoryInMemory: DeliverymanRepositoryInMemory;

describe("Create deliveryman", () => {
  beforeEach(() => {
    deliverymanRepositoryInMemory = new DeliverymanRepositoryInMemory();
    createDeliverymanUseCase = new CreateDeliverymanUseCase(
      deliverymanRepositoryInMemory
    );
  });

  it("Should be able to create a new deliveryman", async () => {
    const result = await createDeliverymanUseCase.execute({
      username: "Mattie Potter",
      password: "08666601"
    });

    expect(result).toHaveProperty("id");
  });

  it("Should not be able to create a new deliveryman with existent username", async () => {
    await createDeliverymanUseCase.execute({
      username: "Helen Sharp",
      password: "57285268"
    });

    await expect(
      createDeliverymanUseCase.execute({
        username: "Helen Sharp",
        password: "57285268"
      })
    ).rejects.toEqual(new AppError("Deliveryman already exists!"));
  });
});
