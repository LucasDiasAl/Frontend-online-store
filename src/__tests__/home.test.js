import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockFetch from '../__mocks__/mockFetch';
import mockedCategoriesResult from '../__mocks__/categories';
import mockedQueryResult from '../__mocks__/query';
import searchedQuery from '../__mocks__/searchQuery';
import mockFetchNull from '../__mocks__/mockFetchNull';

describe('Testes da pagina Home', () => {
  beforeEach(() => (global.fetch = jest.fn().mockImplementation(mockFetch)));
  it(`A tela contém a mensagem pedida: 'Digite algum termo de pesquisa ou escolha uma
      categoria.'`, async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const initialText = await screen.findByText(
      /Digite algum termo de pesquisa ou escolha uma categoria/
    );

    expect(initialText).toBeInTheDocument();
  });
  it('A home deve ter o botão do carrinho de compras', async () => {
    render(<App />);

    const cartSVG = screen.getByRole('link');

    expect(cartSVG).toBeInTheDocument();

    userEvent.click(cartSVG);

    const emptyText = screen.getByText(/Seu carrinho está vazio/);

    expect(emptyText).toBeInTheDocument();
  });
  it(`Exibe as categorias retornadas pela API na página de listagem de
  produtos`, async () => {
    window.history.pushState(null, document.title, '/');

    render(<App />);

    const categoriesElements = (
      await screen.findByText(/Acessórios para Veículos/)
    ).parentNode.parentNode;

    expect(categoriesElements.children.length).toEqual(
      mockedCategoriesResult.length
    );
  });
  it('Exibe a mensagem "Nenhum produto foi encontrado" caso a busca não retorne produtos', async () => {
    global.fetch = jest.fn().mockImplementation(mockFetchNull);

    render(<App />);

    userEvent.clear(screen.getByPlaceholderText('Search'));

    await waitFor(() =>
      expect(
        screen.getByText(
          'Digite algum termo de pesquisa ou escolha uma categoria.'
        )
      ).toBeInTheDocument()
    );

    userEvent.click(
      screen.getByRole('button', { value: { text: 'PESQUISAR' } })
    );

    await waitFor(() =>
      expect(
        screen.getByText('Nenhum produto foi encontrado')
      ).toBeInTheDocument()
    );
  });

  it(`Exibe todos os produtos retornados pela API, dado um determinado filtro`, async () => {
    global.fetch = jest.fn().mockImplementation(mockFetch);

    render(<App />);

    userEvent.type(screen.getByPlaceholderText('Search'), 'carro');

    const buttonSearch = screen.getByRole('button', {
      value: { text: 'PESQUISAR' },
    });

    userEvent.click(buttonSearch);

    expect(global.fetch).toHaveBeenCalled();

    await screen.findByRole('list');

    const productsElements = screen.getAllByRole('listitem');

    expect(productsElements.length).toEqual(searchedQuery.results.length);
  });
  it(`Filtra corretamente os produtos de uma página para exibir somente os daquela
  categoria`, async () => {
    render(<App />);

    expect(global.fetch).toHaveBeenCalled();

    const category = await screen.findByText(/Acessórios para Veículos/);
    userEvent.click(category);

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const products = await screen.findAllByRole('listitem');
    expect(products.length).toEqual(mockedQueryResult.results.length);
  });
  it('Exibe corretmente a informação de frete grátis dos produtos', async () => {
    render(<App />);

    expect(global.fetch).toHaveBeenCalled();

    userEvent.click(await screen.findByText(/Agro/));

    expect(global.fetch).toHaveBeenCalledTimes(2);

    expect((await screen.findAllByText(/frete grátis/i)).length).toBe(1);
  });
  it('Adiciona um produto ao carrinho a partir da tela principal', async () => {
    const { container } = render(<App />);

    expect(global.fetch).toHaveBeenCalled();

    const category = await screen.findByText(/Agro/);
    expect(category).toBeInTheDocument();
    act(() => {
      userEvent.click(category);
    });

    const item = await screen.findByText(/Pequeno Principe, O/);
    expect(item).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledTimes(2);

    await act(async () => {
      userEvent.click((await screen.findAllByText('Adicionar ao Carrinho'))[0]);
    });

    const cartLink = container.querySelector('a[href="/ShoppingCart"]');
    act(() => {
      userEvent.click(cartLink);
    });

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
