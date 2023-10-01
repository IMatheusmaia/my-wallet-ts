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

export const deleteExpenseAction = (id: number) => (
  {
    type: 'DELETE_EXPENSE',
    payload: id,
  });

export const editExpenseAction = (id: number) => (
  {
    type: 'EDIT_EXPENSE',
    payload: id,
    editor: true,
  });

export const updateExpenseAction = (newExpense: ExpensesType) => ({
  type: 'UPDATE_EXPENSE',
  payload: newExpense,
});
