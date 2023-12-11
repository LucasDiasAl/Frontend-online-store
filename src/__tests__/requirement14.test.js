import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockedQueryResult from '../__mocks__/query';
import mockFetch from '../__mocks__/mockFetch';
import userEvent from '@testing-library/user-event';

describe(`14 - Limite a quantidade de produtos adicionados ao carrinho pela quantidade disponível em estoque`, () => {
  beforeEach(() => global.fetch = jest.fn().mockImplementation(mockFetch));
  it(`Avalia se não é possível adicionar ao carrinho mais produtos do que o disponível em estoque`, async () => {

    const { container } = render(<App />);
    expect(global.fetch).toHaveBeenCalled();
    userEvent.click(await screen.findByText(/Agro/));
    expect(global.fetch).toHaveBeenCalledTimes(2);
    userEvent.click((await screen.findAllByText(/adicionar ao carrinho/i))[1]);
    userEvent.click(container.querySelector('a[href="/ShoppingCart"]'));
    expect((await screen.findByText(/Diário De Anne Frank Livro Novo Lacrado Com Fotos Autenticas/))).toBeInTheDocument();
    await waitFor(async () => expect(container.querySelector('div.quantity__div')).toHaveTextContent(
      '1',
    ))
    const id = mockedQueryResult.results[1].id;
    for (let i = 0; i < 5; i++) {
      userEvent.click(container.querySelector(`button[name="mais-${id}"]`));
    }
    expect(container.querySelector('div.quantity__div')).toHaveTextContent(
      mockedQueryResult.results[1].available_quantity,
    );
  });
});
