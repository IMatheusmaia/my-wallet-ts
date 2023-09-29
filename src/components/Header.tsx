import { useSelector } from 'react-redux';
import { useState } from 'react';
import GlobalStateType from '../types/globalStateType';
import logotype from '../assets/logo login Trybe Wallet.svg';
import '../styles/header.css';

function Header() {
  const globalState = useSelector((state: GlobalStateType) => state);
  const [expenses, setExpenses] = useState<number>(0);

  return (
    <div
      className="header-container"
    >
      <ul>
        <img src={ logotype } alt="trybeWallet-logo" className="logotype-wallet" />
        <li
          data-testid="total-field"
        >
          {`Total de despesas: ${expenses}`}
          {' '}
          <span
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </li>
        <li
          data-testid="email-field"
        >
          {`Usuário: ${globalState.user.email}`}
        </li>
      </ul>
    </div>
  );
}

export default Header;
