import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockedQueryResult from '../__mocks__/query';
import mockFetch from '../__mocks__/mockFetch';

describe(`Testa a pagina do carrinho`, () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(mockFetch);
  });

  afterEach(() => {
    window.history.pushState(null, document.title, '/');
    localStorage.clear();
    if (global.fetch) {
      global.fetch.mockClear();
    }
  });

  it('Adiciona produtos ao carrinho e manipula suas quantidades', async () => {
    const { container } = render(<App />);
    expect(global.fetch).toHaveBeenCalled();

    userEvent.click(await screen.findByText(/Agro/));
    expect(global.fetch).toHaveBeenCalledTimes(2);
    const addBtns = await screen.findAllByText('Adicionar ao Carrinho');
    userEvent.click(addBtns[0]);
    userEvent.click(addBtns[1]);
    userEvent.click(container.querySelector('a[href="/ShoppingCart"]'));

    expect(container.querySelector('li'));
    expect(
      container.querySelectorAll('h1.title__product')[0]
    ).toHaveTextContent(mockedQueryResult.results[0].title);

    expect(
      container.querySelectorAll('div.quantity__div')[0]
    ).toHaveTextContent('1');

    expect(
      container.querySelectorAll('h1.title__product')[1]
    ).toHaveTextContent(mockedQueryResult.results[1].title);

    expect(
      container.querySelectorAll('div.quantity__div')[1]
    ).toHaveTextContent('1');
    for (let i = 0; i < 3; i++) {
      userEvent.click(
        container.querySelector(
          `button[name="mais-${mockedQueryResult.results[0].id}"]`
        )
      );
      userEvent.click(
        container.querySelector(
          `button[name="mais-${mockedQueryResult.results[1].id}"]`
        )
      );
    }

    expect(
      container.querySelectorAll('div.quantity__div h1')[0]
    ).toHaveTextContent('4');

    expect(
      container.querySelectorAll('div.quantity__div h1')[1]
    ).toHaveTextContent('3');
    for (let i = 0; i < 4; i++) {
      userEvent.click(
        container.querySelector(
          `button[name="menos-${mockedQueryResult.results[0].id}"]`
        )
      );
    }

    expect(
      container.querySelectorAll('div.quantity__div h1')[0]
    ).toHaveTextContent('1');
    expect(container.querySelector('ul').children).toHaveLength(2);
    userEvent.click(screen.getAllByText(/remover/i)[0]);
    expect(container.querySelector('ul').children).toHaveLength(1);
  });
  it('Avalia se a quantidade de produtos no carrinho da tela de listagem é renderizada corretamente', async () => {
    const { container } = render(<App />);
    userEvent.click(await screen.findByText(/Agro/));
    expect(global.fetch).toHaveBeenCalledTimes(2);
    userEvent.click((await screen.findAllByText(/adicionar ao carrinho/i))[0]);
    expect(container.querySelector('div.cart__div')).toHaveTextContent('1');
  });

  it('Avalia se a quantidade de produtos no carrinho da tela de detalhes é renderizada corretamente', async () => {
    const { container } = render(<App />);
    userEvent.click(await screen.findByText(/Agro/));
    expect(global.fetch).toHaveBeenCalledTimes(2);

    userEvent.click((await screen.findAllByText(/adicionar ao carrinho/i))[0]);
    userEvent.click((await screen.findAllByText(/adicionar ao carrinho/i))[1]);
    userEvent.click(await screen.findByText(/Pequeno Principe, O/));
    await waitFor(async () => {
      expect(container.querySelector('div.cart')).toHaveTextContent('2');
    });
  });
  it(`Avalia se não é possível adicionar ao carrinho mais produtos do que o disponível em estoque`, async () => {
    const { container } = render(<App />);
    expect(global.fetch).toHaveBeenCalled();
    userEvent.click(await screen.findByText(/Agro/));
    expect(global.fetch).toHaveBeenCalledTimes(2);
    userEvent.click((await screen.findAllByText(/adicionar ao carrinho/i))[1]);
    userEvent.click(container.querySelector('a[href="/ShoppingCart"]'));
    expect(
      await screen.findByText(
        /Diário De Anne Frank Livro Novo Lacrado Com Fotos Autenticas/
      )
    ).toBeInTheDocument();
    await waitFor(async () =>
      expect(container.querySelector('div.quantity__div')).toHaveTextContent(
        '1'
      )
    );
    const id = mockedQueryResult.results[1].id;
    for (let i = 0; i < 5; i++) {
      userEvent.click(container.querySelector(`button[name="mais-${id}"]`));
    }
    expect(container.querySelector('div.quantity__div')).toHaveTextContent(
      mockedQueryResult.results[1].available_quantity
    );
  });
});
