import React from 'react';
import { act, findByText, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockedQueryResult from '../__mocks__/query';
import mockFetch from '../__mocks__/mockFetch';
import mockedCategoriesResult from '../__mocks__/categories';
import userEvent from '@testing-library/user-event';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

describe(`12 - Finalize a compra vendo um resumo dela, preenchendo os seus dados e escolhendo a forma de pagamento`, () => {
  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));
  window.ResizeObserver = ResizeObserver;
  it('Avalia se, na página de checkout, existe um resumo do pedido', async () => {
    const { container } = render(<App />);

    expect(global.fetch).toHaveBeenCalled();

    userEvent.click(await screen.findByText(/Agro/));
    expect(global.fetch).toHaveBeenCalledTimes(2);
    userEvent.click((await screen.findAllByText(/Adicionar ao carrinho/i))[0]);
    userEvent.click((await screen.findAllByText(/Adicionar ao carrinho/i))[1]);

    userEvent.click(container.querySelector('a[href="/ShoppingCart"]'));
    expect(await screen.findByText(/finalizar compras/i));

    expect(
      (container.querySelectorAll('h1.title__product'))[0]
    ).toHaveTextContent(mockedQueryResult.results[0].title);
    expect(
      (container.querySelectorAll('h1.title__product'))[1]
    ).toHaveTextContent(mockedQueryResult.results[1].title);
    act(() => {
      userEvent.click(screen.getByText(/finalizar compras/i));
    })
    expect(screen.getByText(mockedQueryResult.results[0].title));

    expect(
      screen.getByText(mockedQueryResult.results[0].title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockedQueryResult.results[1].title)
    ).toBeInTheDocument();
  });

  it('Avalia se, após a compra ser finalizada, é redirecionado para a página inicial', async () => {
    const fullName = 'my full name';
    const email = 'my@email.com';
    const cpf = '12345678900';
    const phone = '99999999999';
    const cep = '99999999';
    const address = 'my address is where I live';

    const { container } = render(<App />);

    userEvent.type(screen.getByPlaceholderText('Nome'), fullName);
    userEvent.type(screen.getByPlaceholderText('Email'), email);
    userEvent.type(screen.getByPlaceholderText('CPF'), cpf);
    userEvent.type(screen.getByPlaceholderText('Telefone'), phone);
    userEvent.type(screen.getByPlaceholderText('CEP'), cep);
    userEvent.type(screen.getByPlaceholderText('Endereço'), address);
    userEvent.click(await screen.findByText('MasterCard'));
    
    expect(screen.getByPlaceholderText('Nome')).toHaveValue(fullName);
    expect(screen.getByPlaceholderText('Email')).toHaveValue(email);
    expect(screen.getByPlaceholderText('CPF')).toHaveValue(Number(cpf));
    expect(screen.getByPlaceholderText('Telefone')).toHaveValue(Number(phone));
    expect(screen.getByPlaceholderText('CEP')).toHaveValue(Number(cep));
    expect(screen.getByPlaceholderText('Endereço')).toHaveValue(address);
    
    userEvent.click(screen.getByText(/concluir/i));

    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() =>
      expect(container.querySelector('div.categories').children.length).toEqual(
        mockedCategoriesResult.length
      )
    );
  });

  it('Avalia se, ao entrar na página do carrinho, não há nenhum produto', async () => {
    const { container } = render(<App />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    userEvent.click(container.querySelector('a[href="/ShoppingCart"]'));
    await waitFor(() =>  expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument());
  });
});
