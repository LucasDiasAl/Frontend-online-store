import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockedQueryResult from '../__mocks__/query';
import mockFetch from '../__mocks__/mockFetch';
import userEvent from '@testing-library/user-event';

describe(`7 - Redirecione para uma tela com a exibição detalhada ao clicar na exibição resumida de um produto`, () => {
  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));
  it('Clicar no card de um produto leva à página com seus detalhes', async () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalled();

    const category = await screen.findByText(/Acessórios para Veículos/);
    act(() => {
      userEvent.click(category);
    })

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const productLink = await screen.findByText(/Pequeno Principe, O/);

     act(() => {
      userEvent.click(productLink);
    })
    
    const productName = await screen.findByText(/Pequeno Principe, O/);
    const productImage = await screen.findByRole('img');
    const productPrice = await screen.findByText(/7.7/);

    expect(productImage).toBeInTheDocument();

    expect(productName).toHaveTextContent(
      mockedQueryResult.results[0].title
    );
    expect(productImage).toBeInTheDocument();
    expect(productPrice).toHaveTextContent(
      mockedQueryResult.results[0].price
    );
  });

  it('Na página de detalhes de um produto, o elemento que redireciona para o carrinho de compras é exibido', async () => {
    const { container } = render(<App />);
    const link = container.querySelector('a');
  
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/ShoppingCart');
  });
});
