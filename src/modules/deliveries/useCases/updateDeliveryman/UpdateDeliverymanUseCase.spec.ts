import { DeliveriesRepositoryInMemory } from "@modules/deliveries/repositories/in-memory/DeliveriesRepositoryInMemory";
import { SmsProviderInMemory } from "@shared/container/providers/smsProvider/in-memory/SmsProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";

let updateDeliverymanUseCase: UpdateDeliverymanUseCase;
let deliveriesRepositoryInMemory: DeliveriesRepositoryInMemory;
let smsProviderInMemory: SmsProviderInMemory;

describe("Update Deliveryman", () => {
  beforeEach(() => {
    smsProviderInMemory = new SmsProviderInMemory();
    deliveriesRepositoryInMemory = new DeliveriesRepositoryInMemory();
    updateDeliverymanUseCase = new UpdateDeliverymanUseCase(
      deliveriesRepositoryInMemory,
      smsProviderInMemory
    );
  });

  it("Should be able to update a deliveryman on a delivery", async () => {
    const sendSms = jest.spyOn(smsProviderInMemory, "deliveryAccepted");

    const delivery = await deliveriesRepositoryInMemory.createDelivery({
      id_client: "96af2849-60f0-4ceb-8c8a-5db12ba004da",
      item_name: "Headset Redragon Zeus RGB",
      initial_address: "662 Cobde Road",
      final_address: "1033 Kide Places"
    });

    const result = await updateDeliverymanUseCase.execute({
      id_delivery: delivery.id,
      id_deliveryman: "d19b2546-95ac-4b21-819c-2f200a27a225",
      username_deliveryman: "Frances Haynes"
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("id_deliveryman");
    expect(sendSms).toHaveBeenCalled();
  });

  it("Should be note able to update a deliveryman on a nonexistent delivery", async () => {
    await expect(
      updateDeliverymanUseCase.execute({
        id_delivery: "6fee3d8b-4eb0-4e72-9cf5-ad27c1b6f26a",
        id_deliveryman: "d19b2546-95ac-4b21-819c-2f200a27a225",
        username_deliveryman: "Frances Haynes"
      })
    ).rejects.toEqual(new AppError("Delivery does not exists!", 404));
  });
});
