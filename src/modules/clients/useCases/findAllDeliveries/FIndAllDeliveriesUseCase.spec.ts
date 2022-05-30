import { DeliveriesRepositoryInMemory } from "@modules/deliveries/repositories/in-memory/DeliveriesRepositoryInMemory";
import { FindAllDeliveriesUseCase } from "./FindAllDeliveriesUseCase";

let findAllDeliveriesUseCase: FindAllDeliveriesUseCase;
let deliveriesRepositoryInMemory: DeliveriesRepositoryInMemory;

describe("Find All Deliveries - Client", () => {
  beforeEach(() => {
    deliveriesRepositoryInMemory = new DeliveriesRepositoryInMemory();
    findAllDeliveriesUseCase = new FindAllDeliveriesUseCase(
      deliveriesRepositoryInMemory
    );
  });

  it("Should be able to return empty array for a client if there are no deliveries", async () => {
    const result = await findAllDeliveriesUseCase.execute(
      "7f42a4c7-6524-4ef1-9a74-eeb4e16ad39d"
    );

    expect(Array.isArray(result));
    expect(result.length).toEqual(0);
  });

  it("Should be able to return all client deliveries", async () => {
    const id_client = "334687e4-4f7a-4ffc-a44e-5b644163c109";

    await deliveriesRepositoryInMemory.createDelivery({
      id_client,
      item_name: "Headset Redragon Zeus RGB",
      initial_address: "1788 Jarino Trail",
      final_address: "355 Zekrik Pass"
    });

    await deliveriesRepositoryInMemory.createDelivery({
      id_client,
      item_name: "Alexa Echo Dot 3",
      initial_address: "1619 Kala Place",
      final_address: "1057 Vitsev Trail"
    });

    const result = await findAllDeliveriesUseCase.execute(id_client);

    expect(Array.isArray(result));
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("created_at");
    expect(result[0]).toHaveProperty("end_at");
  });
});
