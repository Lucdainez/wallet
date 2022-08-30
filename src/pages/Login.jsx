import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPersonalLogin } from '../redux/actions/index';

const MIN_LENGTH_PASSWORD = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    enableButton: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (regexEmail.test(email) && password.length >= MIN_LENGTH_PASSWORD) {
        this.setState({ enableButton: false });
      } else {
        this.setState({ enableButton: true });
      }
    });
  };

  changePageAndSaveEmailInGlobalStateWithClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(addPersonalLogin(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, enableButton } = this.state;
    return (
      <section>
        <h2>TrybeWallet</h2>
        <form>
          <label htmlFor="email">
            Email:
            {' '}
            <input
              data-testid="email-input"
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            {' '}
            <input
              data-testid="password-input"
              type="password"
              name="password"
              id="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ enableButton }
            onClick={
              this.changePageAndSaveEmailInGlobalStateWithClick
            }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
