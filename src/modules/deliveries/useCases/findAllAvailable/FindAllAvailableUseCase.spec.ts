import { DeliveriesRepositoryInMemory } from "@modules/deliveries/repositories/in-memory/DeliveriesRepositoryInMemory";
import { FindAllAvailableUseCase } from "./FindAllAvailableUseCase";

let findAllAvailable: FindAllAvailableUseCase;
let deliveriesRepositoryInMemory: DeliveriesRepositoryInMemory;

describe("Find All Available", () => {
  beforeEach(() => {
    deliveriesRepositoryInMemory = new DeliveriesRepositoryInMemory();
    findAllAvailable = new FindAllAvailableUseCase(
      deliveriesRepositoryInMemory
    );
  });

  it("Should be able to return an empty array if no deliveries are available", async () => {
    const result = await findAllAvailable.execute();

    expect(Array.isArray(result));
    expect(result.length).toEqual(0);
  });

  it("Should be able to find all available deliveries", async () => {
    await deliveriesRepositoryInMemory.createDelivery({
      id_client: "0f9342b4-ff44-4214-88c1-bb91e5a26eaa",
      item_name: "Alexa echo dot 3",
      initial_address: "1577 Jame Place",
      final_address: "107 Laha Turnpike"
    });

    await deliveriesRepositoryInMemory.createDelivery({
      id_client: "0f9342b4-ff44-4214-88c1-bb91e5a26eaa",
      item_name: "Headset Redragon Zeus RGB",
      initial_address: "507 Jerdaz Manor",
      final_address: "548 Tuve Manor"
    });

    const result = await findAllAvailable.execute();

    expect(Array.isArray(result));
    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("created_at");
    expect(result[0].end_at).toBe(null);
  });
});
