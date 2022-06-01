import { Twilio } from "twilio";

import { ISmsProvider } from "../ISmsProvider";
import { twilio } from "@config/twilio";
import { AppError } from "@shared/errors/AppError";

export class TwilioSmsProvider implements ISmsProvider {
  private client;

  constructor() {
    this.client = new Twilio(twilio.account_sid, twilio.auth_token);
  }

  async accountCreated(phone: string, username: string): Promise<void> {
    await this.client.messages
      .create({
        to: phone,
        from: twilio.phone,
        body: `Welcome to Deliveries App ${username}! \n your account was created successfully`
      })
      .catch(() => new AppError("Error to send sms"));
  }

  async deliveryAccepted(phone: string, deliveryman: string): Promise<void> {
    await this.client.messages
      .create({
        to: phone,
        from: twilio.phone,
        body: `Your delivery has been accepted by ${deliveryman}`
      })
      .catch(() => new AppError("Error to send sms"));
  }

  async deliveryCompletion(phone: string): Promise<void> {
    await this.client.messages
      .create({
        to: phone,
        from: twilio.phone,
        body: "your delivery has been completed"
      })
      .catch(() => new AppError("Error to send sms"));
  }
}
