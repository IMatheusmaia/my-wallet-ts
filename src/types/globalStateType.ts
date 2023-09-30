import { UserType } from '../redux/actions/useActions';

export type ExchangeRatesType = {
  [currency: string]: { ask: string, name: string };
  USD: { ask: string, name: string };
  ARS: { ask: string, name: string };
  AUD: { ask: string, name: string };
  BTC: { ask: string, name: string };
  CAD: { ask: string, name: string };
  CHF: { ask: string, name: string };
  XRP: { ask: string, name: string };
  CNY: { ask: string, name: string };
  DOGE: { ask: string, name: string };
  ETH: { ask: string, name: string };
  EUR: { ask: string, name: string };
  GBP: { ask: string, name: string };
  ILS: { ask: string, name: string };
  JPY: { ask: string, name: string };
  LTC: { ask: string, name: string };
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
