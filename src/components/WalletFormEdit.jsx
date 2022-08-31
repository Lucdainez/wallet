import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { addEditElementToTable } from '../redux/actions/index';

const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

class WalletFormEdit extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  async componentDidMount() {
    const response = await fetch(ENDPOINT);
    const json = await response.json();
    delete json.USDT;
    const { expensesEdit } = this.props;
    this.setState({
      value: expensesEdit.value,
      description: expensesEdit.description,
      currency: expensesEdit.currency,
      method: expensesEdit.method,
      tag: expensesEdit.tag,
      exchangeRates: json,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  dispatchActionClick = () => {
    const { dispatch } = this.props;
    dispatch(addEditElementToTable(this.state));
  };

  render() {
    const { edit } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      <form>
        <label htmlFor="value">
          valor da despesa:
          {' '}
          <input
            type="number"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          descrição:
          {' '}
          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">
          moeda:
          {' '}
          <select
            name="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {
              edit.map((coin, index) => (
                <option
                  value={ coin }
                  key={ index }
                >
                  {coin}
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method">
          pagamento:
          {' '}
          <select
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          despesa:
          {' '}
          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ this.dispatchActionClick }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

WalletFormEdit.propTypes = {
  edit: string,
}.isRequired;

const mapStateToProps = (state) => ({
  edit: state.wallet.currencies,
  expensesEdit: state.wallet.expensesEdit[0],
});

export default connect(mapStateToProps)(WalletFormEdit);
