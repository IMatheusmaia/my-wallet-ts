import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currencesAction,
  thunkExpenseAction, updateExpenseAction } from '../redux/actions/walletActions';
import GlobalStateType from '../types/globalStateType';
import fetchData from '../services/request';
import DispatchAsyncType from '../types/dispatchAsync';
import '../styles/walletForm.css';

function WalletForm() {
  const dispatch = useDispatch();
  const dispatchAsync: DispatchAsyncType = useDispatch();
  const currencesState = useSelector((state:GlobalStateType) => state.wallet.currencies);
  const editState = useSelector((state:GlobalStateType) => state.wallet.editor);
  const idState = useSelector((state:GlobalStateType) => state.wallet.idToEdit);
  const globalExpenseEdit = useSelector((state
  :GlobalStateType) => state.wallet.expenses[idState]);

  const INITIAL_INPUT_STATE = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  const [inputValue, setInputValue] = useState(INITIAL_INPUT_STATE);

  useEffect(() => {
    const fetchCurrecyCoins = async () => {
      const data = await fetchData();
      const allCurrences = Object.keys(data);
      const filterCurrences = allCurrences.filter((currence) => currence !== 'USDT');
      dispatch(currencesAction(filterCurrences));
    };
    fetchCurrecyCoins();
  }, [dispatch]);

  const handleChange = ({ name, value }: HTMLInputElement | HTMLSelectElement) => {
    setInputValue({ ...inputValue, [name]: value });
  };
  const clearInputs = () => {
    setInputValue(INITIAL_INPUT_STATE);
  };

  const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatchAsync(thunkExpenseAction({ ...inputValue }));
    setInputValue(globalExpenseEdit);
    clearInputs();
  };

  const handleClickUpdate = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(updateExpenseAction({ ...inputValue, id: idState }));
    clearInputs();
  };

  return (
    <form className="input-form">
      <label>
        Descrição:
        <input
          name="description"
          data-testid="description-input"
          type="text"
          value={ inputValue.description }
          onChange={ ({ target }) => handleChange(target) }
          required
        />
      </label>
      <label>
        Categoria:
        <select
          name="tag"
          data-testid="tag-input"
          value={ inputValue.tag }
          onChange={ ({ target }) => handleChange(target) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
      <label>
        Valor:
        <input
          name="value"
          data-testid="value-input"
          type="text"
          value={ inputValue.value }
          onChange={ ({ target }) => handleChange(target) }
          required
        />
      </label>
      <label>
        Método de Pagamento:
        <select
          name="method"
          data-testid="method-input"
          value={ inputValue.method }
          onChange={ ({ target }) => handleChange(target) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
      <label>
        Moeda:
        <select
          name="currency"
          data-testid="currency-input"
          value={ inputValue.currency }
          onChange={ ({ target }) => handleChange(target) }
        >
          { currencesState.map((currency, index) => (
            <option
              key={ index }
              value={ currency }
            >
              {currency}
            </option>
          ))}
        </select>
      </label>
      { editState ? (
        <button
          id="update-button"
          onClick={ handleClickUpdate }
        >
          Editar Despesa
        </button>) : (
          <button onClick={ handleClick }>
            Adicionar Despesa
          </button>) }
    </form>
  );
}

export default WalletForm;
