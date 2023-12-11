import React from 'react';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import App from '../App';
import mockFetch from '../__mocks__/mockFetch';
import userEvent from '@testing-library/user-event';
import searchedQuery from '../__mocks__/searchQuery';
import mockFetchNull from '../__mocks__/mockFetchNull';

describe(`5 - Liste os produtos buscados por termos, com os dados resumidos, associados a esses termos`, () => {
  afterEach(() => {
    if (global.fetch) {
      global.fetch.mockClear();
    }
  });
  it('Exibe a mensagem "Nenhum produto foi encontrado" caso a busca não retorne produtos', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetchNull)
    render(<App />);

    userEvent.clear(screen.getByPlaceholderText('Search'));
    await waitFor(() => expect(screen.getByText('Digite algum termo de pesquisa ou escolha uma categoria.')).toBeInTheDocument());
    userEvent.click(screen.getByRole('button',  {value: {text: 'PESQUISAR' }}));
    await waitFor(() => expect(screen.getByText('Nenhum produto foi encontrado')).toBeInTheDocument());
  })
  
  it(`Exibe todos os produtos retornados pela API, dado um determinado filtro`, async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch)
    render(<App />);
   
    userEvent.type(
      screen.getByPlaceholderText('Search'),
      'carro'
    );
  
    const buttonSearch = screen.getByRole('button', { value: { text: 'PESQUISAR' } });
    userEvent.click(buttonSearch);
  
    expect(global.fetch).toHaveBeenCalled();
  
    await screen.findByRole('list');
  
    const productsElements = screen.getAllByRole('listitem');
    expect(productsElements.length).toEqual(searchedQuery.results.length);
  });
});
