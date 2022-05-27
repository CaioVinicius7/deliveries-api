interface IDateProvider {
  convertToUtc(date: Date): string;
  formatToLocal(date: Date): string;
}

export { IDateProvider };
