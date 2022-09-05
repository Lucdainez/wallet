import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import {
  fetchApiCoinsAction,
  addDataInputs,
} from '../redux/actions/index';
import WalletFormEdit from './WalletFormEdit';
import '../cssToComponents/WalletForm.css';

const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApiCoinsAction());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  dispatchActionClick = async () => {
    const { dispatch } = this.props;
    const response = await fetch(ENDPOINT);
    const json = await response.json();
    delete json.USDT;
    this.setState({ exchangeRates: json }, () => {
      dispatch(addDataInputs(this.state));
      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      });
    });
  };

  render() {
    const { coins, editor } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    return (
      !editor
        ? (
          <form className="form-WalletForm">
            <label htmlFor="value">
              <input
                type="number"
                name="value"
                placeholder="valor da despesa"
                value={ value }
                className="input-WalletForm"
                data-testid="value-input"
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="description">
              <input
                type="text"
                name="description"
                placeholder="descrição"
                value={ description }
                className="input-WalletForm"
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
                className="select-WalletForm"
                data-testid="currency-input"
                onChange={ this.handleChange }
              >
                {
                  coins.map((coin, index) => (
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
                className="select-WalletForm"
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
                className="select-WalletForm"
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
              className="button-WalletForm"
              onClick={ this.dispatchActionClick }
            >
              Adicionar despesa
            </button>
          </form>
        ) : <WalletFormEdit />
    );
  }
}

WalletForm.propTypes = {
  coins: string,
}.isRequired;

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(WalletForm);
