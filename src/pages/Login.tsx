import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logotype from '../assets/logo login Trybe Wallet.svg';
import { actionUser } from '../redux/actions';
import '../styles/login.css';

type UserType = {
  email: string,
  password: string,
};

function Login() {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [user, setUser] = useState<UserType>({ email: '', password: '' });

  const navigate = useNavigate();

  const verification = ({ email, password }: UserType) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(email) && password.length >= 6) {
      setDisabled(false);
    }
    if (!emailRegex.test(email) || password.length < 6) {
      setDisabled(true);
    }
  };

  const handleChange = ({ target: { name, value } }
  : React.ChangeEvent<HTMLInputElement>) => {
    const newInputUser = { ...user, [name]: value };
    setUser(newInputUser);
    verification(newInputUser);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(actionUser(user));
    navigate('/carteira');
  };

  return (
    <div className="login-container">
      <img src={ logotype } alt="tryneWallet-logo" />
      <form>
        <input
          type="email"
          name="email"
          value={ user.email }
          data-testid="email-input"
          placeholder="digite seu e-mail"
          onChange={ (event) => handleChange(event) }
        />
        <input
          type="password"
          name="password"
          value={ user.password }
          data-testid="password-input"
          placeholder="digite sua senha"
          onChange={ (event) => handleChange(event) }
        />
        <button
          disabled={ disabled }
          onClick={ (event) => handleClick(event) }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
