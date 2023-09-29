type ActionWalletType = {
  type: string,
  payload: any
};

const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_WALLET_STATE, action: ActionWalletType) => {
  return state;
};

export default walletReducer;
