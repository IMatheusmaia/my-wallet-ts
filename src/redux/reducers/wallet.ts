import { ExpensesType } from '../../types/globalStateType';

type ActionWalletType = {
  type: string,
  payload: string[] | ExpensesType
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
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses].filter(({ id }) => id !== action.payload) };
    default:
      return state;
  }
};

export default walletReducer;
