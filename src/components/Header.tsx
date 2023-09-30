import { useSelector } from 'react-redux';
import { useState } from 'react';
import GlobalStateType, { ExpensesType } from '../types/globalStateType';
import logotype from '../assets/logo login Trybe Wallet.svg';
import '../styles/header.css';

function Header() {
  const userGlobalState = useSelector((state: GlobalStateType) => state);
  const walletGlobalState = useSelector(
    (state: GlobalStateType) => state.wallet.expenses,
  );
  const [expense, setExpense] = useState<number>(0);

  const totalExpense = (expenseState: ExpensesType[]) => {
    const total = expenseState.reduce((
      acc: number,
      { value, currency, exchangeRates },
    ) => {
      return acc + (Number(value) * Number(exchangeRates[currency].ask));
    }, 0);
    return (Number(total.toFixed(2)));
  };

  return (
    <div
      className="header-container"
    >
      <ul>
        <img src={ logotype } alt="trybeWallet-logo" className="logotype-wallet" />
        <li
          data-testid="total-field"
        >
          { walletGlobalState.length > 0
            ? `${totalExpense(walletGlobalState)}` : `${expense.toFixed(2)}` }
        </li>
        <span
          data-testid="header-currency-field"
        >
          BRL
        </span>
        <li
          data-testid="email-field"
        >
          {`Usuário: ${userGlobalState.user.email}`}
        </li>
      </ul>
    </div>
  );
}

export default Header;
