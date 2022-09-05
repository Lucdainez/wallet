import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { removeElementToTable, editElementToTable } from '../redux/actions';
import '../cssToComponents/Table.css';

class Table extends Component {
  removingTableElement = ({ target }) => {
    const { id } = target;
    const { dispatch } = this.props;
    dispatch(removeElementToTable(id));
  };

  editingTableElement = ({ target }) => {
    const { id } = target;
    const { dispatch } = this.props;
    dispatch(editElementToTable(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table className="table-table">
        <thead className="thead-table">
          <tr className="tr-table">
            <th className="th-table">Descrição</th>
            <th className="th-table">Tag</th>
            <th className="th-table">Método de pagamento</th>
            <th className="th-table">Valor</th>
            <th className="th-table">Moeda de conversão</th>
            <th className="th-table">Câmbio utilizado</th>
            <th className="th-table">Valor convertido</th>
            <th className="th-table">Moeda</th>
            <th className="th-table">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody className="tbody-table">
          {
            expenses.map((dataExpense) => (
              <tr className="tr-tbody-table" key={ dataExpense.id }>
                <td className="td-table description">{dataExpense.description}</td>
                <td className="td-table">{dataExpense.tag}</td>
                <td className="td-table">{dataExpense.method}</td>
                <td className="td-table">{Number(dataExpense.value).toFixed(2)}</td>
                <td className="td-table">Real</td>
                <td className="td-table">
                  {
                    Number(dataExpense.exchangeRates[dataExpense.currency].ask).toFixed(2)
                  }
                </td>
                <td className="td-table">
                  R$
                  {' '}
                  {
                    Number(
                      dataExpense.value
                      * dataExpense.exchangeRates[dataExpense.currency].ask,
                    ).toFixed(2)
                  }
                </td>
                <td className="td-table">
                  {
                    (dataExpense.exchangeRates[dataExpense.currency].name)
                      .split('/Real Brasileiro')
                  }
                </td>
                <td className="td-table">
                  <button
                    type="button"
                    data-testid="edit-btn"
                    className="button-edit-table"
                    id={ dataExpense.id }
                    onClick={ this.editingTableElement }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    className="button-dell-table"
                    id={ dataExpense.id }
                    onClick={ this.removingTableElement }
                  >
                    Excluir
                  </button>
                </td>
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
