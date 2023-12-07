import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import mockedQueryResult from '../__mocks__/query';
import mockFetch from '../__mocks__/mockFetch';
import userEvent from '@testing-library/user-event';

describe('8 - Adicione produtos a partir da tela de listagem de produtos', () => {
  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));
  it('Adiciona um produto ao carrinho a partir da tela principal', async () => {
    const { container } = render(<App />);
    expect(global.fetch).toHaveBeenCalled();

    const category = await screen.findByText(/Agro/);
    expect(category).toBeInTheDocument();
    act(() => {
      userEvent.click(category);
    })
    const item = await screen.findByText(/Pequeno Principe, O/);
    expect(item).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    await act(async () => {
      userEvent.click((await screen.findAllByText('Adicionar ao Carrinho'))[0]);
    })
    const cartLink = container.querySelector('a[href="/ShoppingCart"]')
    act(() => {
      userEvent.click(cartLink);
    })
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(container.querySelector('li'));
    expect(container.querySelector('h1.title__product')).toHaveTextContent(
      mockedQueryResult.results[0].title
    );
    expect(
      container.querySelector('div.total__price')
    ).toHaveTextContent(mockedQueryResult.results[0].price);
  });
});
