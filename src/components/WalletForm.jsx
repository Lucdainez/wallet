import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiCoinsAction } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApiCoinsAction());
  }

  render() {
    const { coins } = this.props;
    return (
      <form>
        <label htmlFor="valueExpense">
          valor da despesa:
          {' '}
          <input
            type="number"
            name="valueExpense"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="descriptionExpense">
          descrição:
          {' '}
          <input
            type="text"
            name="descriptionExpense"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="coin">
          moeda:
          {' '}
          <select name="coin" data-testid="currency-input">
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
          <select name="method" data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          despesa:
          {' '}
          <select name="tag" data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  coins: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ coins: state.wallet.currencies });

export default connect(mapStateToProps)(WalletForm);
