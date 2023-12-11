import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockFetch from '../__mocks__/mockFetch';
import userEvent from '@testing-library/user-event';

describe(`13 - Mostre junto ao ícone do carrinho a quantidade de produtos dentro dele, em todas as telas em que ele aparece`, () => {
  afterEach(() => {
    global.fetch.mockClear();
  });

  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));
  it('Avalia se a quantidade de produtos no carrinho da tela de listagem é renderizada corretamente', async () => {
    const { container } = render(<App />);
    expect(global.fetch).toHaveBeenCalled();
    userEvent.click(await screen.findByText(/Agro/));
    expect(global.fetch).toHaveBeenCalledTimes(2);
    userEvent.click((await screen.findAllByText(/adicionar ao carrinho/i))[0]);
    expect(container.querySelector('div.cart__div')).toHaveTextContent(
      '1'
    );
  });

  it('Avalia se a quantidade de produtos no carrinho da tela de detalhes é renderizada corretamente', async () => {
    const { container } = render(<App />);
    expect(global.fetch).toHaveBeenCalled();
    userEvent.click(await screen.findByText(/Agro/));
    expect(global.fetch).toHaveBeenCalledTimes(2);

    userEvent.click((await screen.findAllByText(/adicionar ao carrinho/i))[1]);
    userEvent.click(await screen.findByText(/Pequeno Principe, O/));
    await waitFor(async () => {
      expect(container.querySelector('div.cart')).toHaveTextContent('2');
    })
  });
});
