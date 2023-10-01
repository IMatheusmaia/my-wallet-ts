import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux, renderWithRouter } from './helpers/renderWith';
import mockData from './helpers/mockData';
import * as API from '../services/request';
import App from '../App';

beforeEach(() => {
  vi.spyOn(API, 'default').mockResolvedValue(mockData);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Testando a página de Login', () => {
  test('Verifica se ao digitar email e senha corretos e clicar em entrar é redirecionado para página da carteira', async () => {
    renderWithRouterAndRedux(<App />);

    const email = screen.getByPlaceholderText('digite seu e-mail');
    const password = screen.getByPlaceholderText('digite sua senha');
    const buttonEnter = screen.getByText('Entrar');

    await userEvent.type(email, 'mail@mail.com');
    await userEvent.type(password, '123456');
    await userEvent.click(buttonEnter);

    const user = screen.getByText(/mail@mail.com/);
    await waitFor(() => {
      expect(user).toBeInTheDocument();
    });
  });
  test('testa se o usuário ao digitar uma rota inexistente na aplicação é redirecionado para a página NotFound', () => {
    renderWithRouter(<App />, { initialEntries: ['/any'] });

    expect(screen.getByText(/Página não encontrada/)).toBeInTheDocument();
    expect(screen.getByText(/retornar/)).toBeInTheDocument();
  });
});

describe('Testando as funcionalidades da página Wallet', () => {
  test('Verifica funcionalidade de criar, editar e deletar despesas', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const buttonAdd = screen.getByRole('button', {
      name: /Adicionar Despesa/i,
    });
    await userEvent.type(value, '1');
    await userEvent.type(description, 'café');
    await userEvent.click(buttonAdd);

    const buttonEdit = screen.getByText('Editar');
    const buttonDelete = screen.getByText('Excluir');

    await waitFor(() => {
      expect(buttonEdit).toBeInTheDocument();
      expect(buttonDelete).toBeInTheDocument();
    });
    await userEvent.click(buttonEdit);
    const updateButton = screen.getByText('Editar Despesa');
    await waitFor(() => {
      expect(updateButton).toBeInTheDocument();
    });
    await userEvent.type(description, 'xablau');
    await userEvent.type(value, '10');
    await userEvent.click(updateButton);
    await waitFor(() => {
      expect(screen.getByText(/xablau/)).toBeInTheDocument();
    });
    await userEvent.click(buttonDelete);
    await waitFor(() => {
      expect(buttonDelete).not.toBeInTheDocument();
      expect(buttonEdit).not.toBeInTheDocument();
    });
  });
});
