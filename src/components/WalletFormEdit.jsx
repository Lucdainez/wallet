import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { addEditElementToTable } from '../redux/actions/index';
import '../cssToComponents/WalletFormEdit.css';

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
      <form className="form-WalletFormEdit">
        <label htmlFor="value">
          <input
            type="number"
            name="value"
            placeholder="valor da despesa"
            className="input-WalletFormEdit"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          <input
            type="text"
            name="description"
            placeholder="descrição"
            className="input-WalletFormEdit"
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
            className="select-WalletFormEdit"
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
            className="select-WalletFormEdit"
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
            className="select-WalletFormEdit"
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
          className="button-WalletFormEdit"
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
