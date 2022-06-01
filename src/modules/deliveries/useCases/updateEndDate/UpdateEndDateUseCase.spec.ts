import { DeliveriesRepositoryInMemory } from "@modules/deliveries/repositories/in-memory/DeliveriesRepositoryInMemory";
import { SmsProviderInMemory } from "@shared/container/providers/smsProvider/in-memory/SmsProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { UpdateEndDateUseCase } from "./UpdateEndDateUseCase";

let updateEndDateUseCase: UpdateEndDateUseCase;
let deliveriesRepositoryInMemory: DeliveriesRepositoryInMemory;
let smsProviderInMemory: SmsProviderInMemory;

describe("Update End Date", () => {
  beforeEach(() => {
    smsProviderInMemory = new SmsProviderInMemory();
    deliveriesRepositoryInMemory = new DeliveriesRepositoryInMemory();
    updateEndDateUseCase = new UpdateEndDateUseCase(
      deliveriesRepositoryInMemory,
      smsProviderInMemory
    );
  });

  it("Should be able to update a end date of a delivery", async () => {
    const sendSms = jest.spyOn(smsProviderInMemory, "deliveryCompletion");

    const delivery = await deliveriesRepositoryInMemory.createDelivery({
      id_client: "96af2849-60f0-4ceb-8c8a-5db12ba004da",
      item_name: "Headset Redragon Zeus RGB",
      initial_address: "662 Cobde Road",
      final_address: "1033 Kide Places"
    });

    await deliveriesRepositoryInMemory.updateDeliveryman(
      delivery.id,
      "ccca8604-6ac6-4925-a854-4193584058ab"
    );

    const result = await updateEndDateUseCase.execute({
      id_delivery: delivery.id,
      id_deliveryman: "ccca8604-6ac6-4925-a854-4193584058ab"
    });

    expect(result).toHaveProperty("count");
    // @ts-ignore
    expect(result.count).toEqual(1);
    expect(sendSms).toHaveBeenCalled();
  });

  it("Should not be able to update a end date of a nonexistent delivery", async () => {
    await expect(
      updateEndDateUseCase.execute({
        id_delivery: "b0c81cf6-b9d8-4ddc-a6fb-e481e10f306c",
        id_deliveryman: "b6c82906-f972-4cf6-b430-99d411ca21c4"
      })
    ).rejects.toEqual(new AppError("Delivery does not exists!", 404));
  });

  it("Should not be able to update the end date with the id of a different deliveryman than the one responsible for it", async () => {
    const delivery = await deliveriesRepositoryInMemory.createDelivery({
      id_client: "96af2849-60f0-4ceb-8c8a-5db12ba004da",
      item_name: "Headset Redragon Zeus RGB",
      initial_address: "662 Cobde Road",
      final_address: "1033 Kide Places"
    });

    const result = await updateEndDateUseCase.execute({
      id_delivery: delivery.id,
      id_deliveryman: "67927365-9cc8-4cdc-8149-05a836b1d42e"
    });

    expect(result).toHaveProperty("count");
    // @ts-ignore
    expect(result.count).toEqual(0);
  });
});
