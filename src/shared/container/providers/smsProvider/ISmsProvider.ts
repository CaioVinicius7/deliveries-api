interface ISmsProvider {
  accountCreated(phone: string, username: string): Promise<void>;
  deliveryAccepted(phone: string, deliveryman: string): Promise<void>;
  deliveryCompletion(phone: string): Promise<void>;
}

export { ISmsProvider };
