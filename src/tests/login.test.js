import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

const TEST_EMAIL = 'test@test.com';

describe('teste do componente <Login />', () => {
  test('Verifica se existe dois inputs e um botão', () => {
    renderWithRouterAndRedux(<App />);
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
});
