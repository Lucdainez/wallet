import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { addPersonalLogin } from '../redux/actions/index';
import '../cssToComponents/Login.css';

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
      <section className="section-login">
        <h2>TrybeWallet</h2>
        <form className="form-login">
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
            className="button-login"
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
  dispatch: string,
}.isRequired;

export default connect()(Login);
