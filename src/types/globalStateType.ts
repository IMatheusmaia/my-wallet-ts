import { UserType } from '../redux/actions/useActions';

export type ExchangeRatesType = {
  [currency: string]: { ask: string };
  USD: { ask: string };
  ARS: { ask: string };
  AUD: { ask: string };
  BTC: { ask: string };
  CAD: { ask: string };
  CHF: { ask: string };
  XRP: { ask: string };
  CNY: { ask: string };
  DOGE: { ask: string };
  ETH: { ask: string };
  EUR: { ask: string };
  GBP: { ask: string };
  ILS: { ask: string };
  JPY: { ask: string };
  LTC: { ask: string };
};

export type ExpensesType = {
  id?: number,
  value: string,
  currency: string,
  method: string,
  tag: string,
  description: string,
  exchangeRates: ExchangeRatesType
};

type WalletType = {
  currencies: string[] | [],
  expenses: ExpensesType[] | [],
  editor: boolean,
  idToEdit: number,
};

type GlobalStateType = {
  user: UserType
  wallet: WalletType
};

export default GlobalStateType;
