import { AppError } from "@shared/errors/AppError";

import { ClientsRepositoryInMemory } from "@modules/clients/repositories/in-memory/ClientsRepositoryInMemory";
import { SmsProviderInMemory } from "@shared/container/providers/smsProvider/in-memory/SmsProviderInMemory";
import { CreateClientUseCase } from "./CreateClientUseCase";

let createClientUseCase: CreateClientUseCase;
let clientsRepositoryInMemory: ClientsRepositoryInMemory;
let smsProviderInMemory: SmsProviderInMemory;

describe("Create Client", () => {
  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    smsProviderInMemory = new SmsProviderInMemory();
    createClientUseCase = new CreateClientUseCase(
      clientsRepositoryInMemory,
      smsProviderInMemory
    );
  });

  it("Should be able to create a new client", async () => {
    const sendSms = jest.spyOn(smsProviderInMemory, "accountCreated");

    const result = await createClientUseCase.execute({
      username: "Mittie Day",
      password: "19916757",
      phone: "+5535994879632"
    });

    expect(result).toHaveProperty("id");
    expect(sendSms).toHaveBeenCalled();
  });

  it("Should not be able to create a new client with existent username", async () => {
    await createClientUseCase.execute({
      username: "Harold Walton",
      password: "19916757",
      phone: "+5535987563214"
    });

    await expect(
      createClientUseCase.execute({
        username: "Harold Walton",
        password: "19916757",
        phone: "+5535983593114"
      })
    ).rejects.toEqual(new AppError("Client already exists!"));
  });

  it("Should not be able to create a new client with existent phone", async () => {
    await createClientUseCase.execute({
      username: "Jesse Wilkerson",
      password: "19916757",
      phone: "+5535987563214"
    });

    await expect(
      createClientUseCase.execute({
        username: "Maria Hoffman",
        password: "19916757",
        phone: "+5535987563214"
      })
    ).rejects.toEqual(
      new AppError("A client register with this phone already exists!")
    );
  });
});
