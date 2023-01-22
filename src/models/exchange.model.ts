import { ExchangeStatus } from "../enum/exchangeStatus.enum";

export class ExchangeModel {
  hearts: number;
  amount: number;

  constructor(hearts: number, amount: number, status: ExchangeStatus) {
    this.hearts = hearts;
    this.amount = amount;
  }
}
