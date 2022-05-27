import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DayJsDateProvider implements IDateProvider {
  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  formatToLocal(date: Date): string {
    return dayjs(date).format("DD/MM/YYYY HH:mm:ss");
  }
}
