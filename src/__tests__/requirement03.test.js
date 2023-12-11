import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockFetch from '../__mocks__/mockFetch';


describe('3 - Crie a página do carrinho de compras', () => {
  beforeEach(() => global.fetch = jest.fn().mockImplementation(mockFetch));
  it('A home deve ter o botão do carrinho de compras', async () => {
    render(<App />);
    const cartSVG = screen.getByRole('link');
    expect(cartSVG).toBeInTheDocument();
    userEvent.click(cartSVG)

    const emptyText = screen.getByText(/Seu carrinho está vazio/);

    expect(emptyText).toBeInTheDocument();
  });
});
