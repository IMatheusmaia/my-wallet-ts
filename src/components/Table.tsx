import { useSelector } from 'react-redux';
import GlobalStateType, { ExpensesType } from '../types/globalStateType';

function Table() {
  const expensesState = useSelector((state:GlobalStateType) => state.wallet.expenses);

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
                <button>Editar</button>
                <button>Excluir</button>
              </td>
            </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
