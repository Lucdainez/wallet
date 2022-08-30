import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

const TEST_EMAIL = 'test@test.com';

describe('teste dos componentes', () => {
  test('Verifica se existe dois inputs e um botão', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Verifica se o botão é habilitado ao digitar as informações corretas', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(inputEmail).toHaveValue('');
    expect(inputPassword).toHaveValue('');
    userEvent.type(inputEmail, TEST_EMAIL);
    expect(button).toBeDisabled();
    userEvent.type(inputPassword, '1234567');
    expect(button).not.toBeDisabled();
  });

  test('Verifica se ao clicar no botão a página é redirecionada para a carteira', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/senha/i);
    userEvent.type(inputEmail, TEST_EMAIL);
    userEvent.type(inputPassword, '1234567');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
    const { user } = store.getState();
    expect(user.email).toBe(TEST_EMAIL);
  });

  test('Verifica se existe uma tag com o valor do email, uma com o valor 0 e outra com o valor BRL ', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(inputEmail).toHaveValue('');
    expect(inputPassword).toHaveValue('');
    userEvent.type(inputEmail, TEST_EMAIL);
    expect(button).toBeDisabled();
    userEvent.type(inputPassword, '1234567');
    expect(button).not.toBeDisabled();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
    const testIdEmail = screen.getByTestId('email-field');
    const testIdTotalValue = screen.getByTestId('total-field');
    const testIdHeaderCurrency = screen.getByTestId('header-currency-field');
    expect(testIdEmail).toBeInTheDocument();
    expect(testIdHeaderCurrency).toBeInTheDocument();
    expect(testIdTotalValue).toBeInTheDocument();
  });

  test('teste do componente Wallet', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByLabelText(/email/i);
    const inputPassword = screen.getByLabelText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(inputEmail).toHaveValue('');
    expect(inputPassword).toHaveValue('');
    userEvent.type(inputEmail, TEST_EMAIL);
    expect(button).toBeDisabled();
    userEvent.type(inputPassword, '1234567');
    expect(button).not.toBeDisabled();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
    const testIdValue = screen.getByTestId('value-input');
    expect(testIdValue).toBeInTheDocument();
    userEvent.type(testIdValue, '12');
    expect(testIdValue).toHaveProperty('value', '12');
    const walletButtonSubmit = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(walletButtonSubmit).toBeInTheDocument();
  });
});
