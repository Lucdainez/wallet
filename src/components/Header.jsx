import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

class Header extends Component {
  render() {
    const { email, value } = this.props;
    const SUM_VALUE = value.reduce((acc, curr) => acc + Number(curr), 0);
    return (
      <section>
        <p data-testid="email-field">{email}</p>
        <p
          data-testid="total-field"
        >
          { SUM_VALUE }
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
  value: state.wallet.expensesValue,
});

export default connect(mapStateToProps)(Header);
