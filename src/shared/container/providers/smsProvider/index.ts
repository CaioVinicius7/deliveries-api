import { container } from "tsyringe";

import { ISmsProvider } from "./ISmsProvider";
import { TwilioSmsProvider } from "./implementations/TwilioSmsProvider";

container.registerSingleton<ISmsProvider>("SmsProvider", TwilioSmsProvider);
