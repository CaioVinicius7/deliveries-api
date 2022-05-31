import { DeliveriesRepositoryInMemory } from "@modules/deliveries/repositories/in-memory/DeliveriesRepositoryInMemory";
import { FindAllDeliveriesUseCase } from "./FindAllDeliveriesUseCase";

let findAllDeliveriesUseCase: FindAllDeliveriesUseCase;
let deliveriesRepositoryInMemory: DeliveriesRepositoryInMemory;

describe("Find All Deliveries - Deliveryman", () => {
  beforeEach(() => {
    deliveriesRepositoryInMemory = new DeliveriesRepositoryInMemory();
    findAllDeliveriesUseCase = new FindAllDeliveriesUseCase(
      deliveriesRepositoryInMemory
    );
  });

  it("Should be able to return empty array for a deliveryman if there are no deliveries", async () => {
    const result = await findAllDeliveriesUseCase.execute(
      "80c622bd-5fdd-4e71-ae30-f03e7a51d053"
    );

    expect(Array.isArray(result));
    expect(result.length).toEqual(0);
  });

  it("Should be able to return all deliveryman deliveries", async () => {
    const id_client = "334687e4-4f7a-4ffc-a44e-5b644163c109";
    const id_deliveryman = "5eb1d275-7d7b-49a0-b86c-bb47c6e6a917";

    let delivery = await deliveriesRepositoryInMemory.createDelivery({
      id_client,
      item_name: "Headset Redragon Zeus RGB",
      initial_address: "1788 Jarino Trail",
      final_address: "355 Zekrik Pass"
    });

    await deliveriesRepositoryInMemory.updateDeliveryman(
      delivery.id,
      id_deliveryman
    );

    delivery = await deliveriesRepositoryInMemory.createDelivery({
      id_client,
      item_name: "Alexa Echo Dot 3",
      initial_address: "1619 Kala Place",
      final_address: "1057 Vitsev Trail"
    });

    await deliveriesRepositoryInMemory.updateDeliveryman(
      delivery.id,
      id_deliveryman
    );

    const result = await findAllDeliveriesUseCase.execute(id_deliveryman);

    expect(Array.isArray(result));
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("id_deliveryman");
    expect(result[0]).toHaveProperty("created_at");
    expect(result[0]).toHaveProperty("end_at");
  });
});
