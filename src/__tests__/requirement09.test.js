import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockedQueryResult from '../__mocks__/query';
import mockFetch from '../__mocks__/mockFetch';
import userEvent from '@testing-library/user-event';

describe(`9 - Adicione um produto ao carrinho a partir de sua tela de exibição detalhada`, () => {
  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));
  it('Adiciona um produto ao carrinho a partir da sua tela de detalhes', async () => {
    const { container } = render(<App />);
    expect(global.fetch).toHaveBeenCalled();

    userEvent.click(await screen.findByText(/Agro/));
    expect(global.fetch).toHaveBeenCalledTimes(2);
    userEvent.click(await screen.findByText(/Pequeno Principe, O/));

    await waitFor(() =>
      expect(container.querySelector('h1.product__title__detail')).toHaveTextContent(
        mockedQueryResult.results[0].title
      )
    );

    userEvent.click(screen.getByText('Adicionar ao Carrinho'));
    userEvent.click(container.querySelector('a[href="/ShoppingCart"]'));

    expect(container.querySelector('li'));
    expect(container.querySelector('h1.title__product')).toHaveTextContent(
      mockedQueryResult.results[0].title
    );
    expect(
      container.querySelector('div.total__price')
    ).toHaveTextContent(mockedQueryResult.results[0].price);
  });
});
