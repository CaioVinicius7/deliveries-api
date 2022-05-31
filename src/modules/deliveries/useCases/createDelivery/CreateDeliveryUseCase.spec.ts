import { DeliveriesRepositoryInMemory } from "@modules/deliveries/repositories/in-memory/DeliveriesRepositoryInMemory";
import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";

let createDeliveryUseCase: CreateDeliveryUseCase;
let deliveriesRepositoryInMemory: DeliveriesRepositoryInMemory;

describe("Create Delivery", () => {
  beforeEach(() => {
    deliveriesRepositoryInMemory = new DeliveriesRepositoryInMemory();
    createDeliveryUseCase = new CreateDeliveryUseCase(
      deliveriesRepositoryInMemory
    );
  });

  it("Should be able to create a new delivery", async () => {
    const delivery = await createDeliveryUseCase.execute({
      id_client: "bd9774be-59e0-490a-983f-0b4e85f6cc59",
      item_name: "Headset Redragon Zeus RGB",
      initial_address: "1059 Kaeba Ridge",
      final_address: "1441 Gugiv River"
    });

    expect(delivery).toHaveProperty("id");
    expect(delivery).toHaveProperty("created_at");
    expect(delivery).toHaveProperty("end_at");
    expect(delivery.id_deliveryman).toEqual(null);
  });
});
