import { ISmsProvider } from "../ISmsProvider";

export class SmsProviderInMemory implements ISmsProvider {
  async accountCreated(phone: string, username: string): Promise<void> {
    return;
  }

  async deliveryAccepted(phone: string, deliveryman: string): Promise<void> {
    return;
  }

  async deliveryCompletion(phone: string): Promise<void> {
    return;
  }
}
