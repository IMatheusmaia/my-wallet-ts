import { useSelector, useDispatch } from 'react-redux';
import GlobalStateType, { ExpensesType } from '../types/globalStateType';
import { deleteExpenseAction } from '../redux/actions/walletActions';

function Table() {
  const expensesState = useSelector((state:GlobalStateType) => state.wallet.expenses);
  const dispatch = useDispatch();

  const handleClickDelete = (id: number) => {
    dispatch(deleteExpenseAction(id));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão;</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expensesState.map(({ id, value, tag, currency,
          method, description, exchangeRates }:ExpensesType) => (
            <tr
              key={ id }
            >
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{Number(value).toFixed(2)}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
              <td>
                {
                  (Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)
                  }
              </td>
              <td>Real</td>
              <td>
                <button
                  id={ `edit-btn-${id}` }
                  data-testid="edit-btn"
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  onClick={ () => handleClickDelete(Number(id)) }
                >
                  Excluir
                </button>
              </td>
            </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
