import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
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
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((dataExpense) => (
              <tr key={ dataExpense.id }>
                <td>{dataExpense.description}</td>
                <td>{dataExpense.tag}</td>
                <td>{dataExpense.method}</td>
                <td>{Number(dataExpense.value).toFixed(2)}</td>
                <td>
                  {
                    dataExpense.exchangeRates[dataExpense.currency].name
                  }
                </td>
                <td>
                  {
                    Number(dataExpense.exchangeRates[dataExpense.currency].ask).toFixed(2)
                  }
                </td>
                <td>
                  {
                    Number(
                      dataExpense.value
                      * dataExpense.exchangeRates[dataExpense.currency].ask,
                    ).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <button type="button">
                  Editar
                </button>
                <button type="button">
                  Excluir
                </button>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: string,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
