import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Header extends Component {
  render() {
    const { email, values } = this.props;
    const SUM_VALUE = values.reduce((acc, curr) => {
      const { value, currency, exchangeRates } = curr;
      const { ask } = exchangeRates[currency];
      return acc + (value * ask);
    }, 0);
    return (
      <section>
        <p data-testid="email-field">{email}</p>
        <p
          data-testid="total-field"
        >
          { SUM_VALUE.toFixed(2) }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </section>
    );
  }
}

Header.propTypes = {
  email: string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  values: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
