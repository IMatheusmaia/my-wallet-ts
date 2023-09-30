import DispatchAsyncType from '../../types/dispatchAsync';
import fetchData from '../../helper/request';
import { ExpensesType, ExchangeRatesType } from '../../types/globalStateType';

export const currencesAction = (listCurrences: string[]) => ({
  type: 'REQUEST_CURRENCIES',
  payload: listCurrences,
});

const expenseAction = (inputExpenses: ExpensesType) => ({
  type: 'ADD_EXPENSE',
  payload: inputExpenses,
});

export const thunkExpenseAction = (expenses: any) => {
  return async (Dispatch: DispatchAsyncType) => {
    const data:ExchangeRatesType = await fetchData();
    delete data.USDT;
    Dispatch(expenseAction({ ...expenses, exchangeRates: data }));
  };
};
