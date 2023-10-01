import { ExpensesType } from '../../types/globalStateType';

type ActionWalletType = {
  type: string,
  payload: ExpensesType,
  editor?: boolean,
};

const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_WALLET_STATE, action: ActionWalletType) => {
  switch (action.type) {
    case 'REQUEST_CURRENCIES':
      return { ...state, currencies: action.payload };
    case 'ADD_EXPENSE':
      return { ...state,
        expenses: [...state.expenses, {
          ...action.payload,
          id: state.expenses.length,
        }],
        editor: false,
        idToEdit: 0,
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses].filter(({ id }) => id !== action.payload) };
    case 'EDIT_EXPENSE':
      return {
        ...state,
        idToEdit: action.payload,
        editor: action.editor,
      };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((obj: ExpensesType) => {
          if (obj.id === state.idToEdit) {
            return { ...action.payload, exchangeRates: obj.exchangeRates };
          }
          return obj;
        }),
        editor: false,
        idToEdit: 0,
      };
    default:
      return state;
  }
};

export default walletReducer;
