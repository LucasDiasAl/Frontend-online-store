import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockedQueryResult from '../__mocks__/query';
import mockFetch from '../__mocks__/mockFetch';
import mockDetails from '../__mocks__/details';
import mockLocalStorage from '../__mocks__/localStorage';

describe(`Testes da pagina de detalhes do produto`, () => {
  beforeEach(() => (global.fetch = jest.fn().mockImplementation(mockFetch)));
  afterEach(() => {
    window.history.pushState(null, document.title, '/');
    localStorage.clear();
    if (global.fetch) {
      global.fetch.mockClear();
    }
  });
  it('Clicar no card de um produto leva à página com seus detalhes', async () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalled();

    const category = await screen.findByText(/Acessórios para Veículos/);

    act(() => {
      userEvent.click(category);
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const productLink = await screen.findByText(/Pequeno Principe, O/);

    act(() => {
      userEvent.click(productLink);
    });

    const productName = await screen.findByText(/Pequeno Principe, O/);
    const productImage = await screen.findByRole('img');
    const productPrice = await screen.findByText(/7.7/);

    expect(productImage).toBeInTheDocument();
    expect(productName).toHaveTextContent(mockedQueryResult.results[0].title);
    expect(productImage).toBeInTheDocument();
    expect(productPrice).toHaveTextContent(mockedQueryResult.results[0].price);
  });

  it('Na página de detalhes de um produto, o elemento que redireciona para o carrinho de compras é exibido', async () => {
    const { container } = render(<App />);
    const link = container.querySelector('a');

    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/ShoppingCart');
  });

  it('Adiciona um produto ao carrinho a partir da sua tela de detalhes', async () => {
    const { container } = render(<App />);

    expect(global.fetch).toHaveBeenCalled();

    userEvent.click(await screen.findByText(/Agro/));

    expect(global.fetch).toHaveBeenCalledTimes(2);

    userEvent.click(await screen.findByText(/Pequeno Principe, O/));

    await waitFor(() =>
      expect(
        container.querySelector('h1.product__title__detail')
      ).toHaveTextContent(mockedQueryResult.results[0].title)
    );

    userEvent.click(screen.getByText('Adicionar ao Carrinho'));
    userEvent.click(container.querySelector('a[href="/ShoppingCart"]'));

    expect(container.querySelector('li'));
    expect(container.querySelector('h1.title__product')).toHaveTextContent(
      mockedQueryResult.results[0].title
    );
    expect(container.querySelector('div.total__price')).toHaveTextContent(
      mockedQueryResult.results[0].price
    );
  });
  it('Avalia se é possível realizar uma avaliação na tela de detalhes de um produto', async () => {
    const evaluationEmail = `teste@gmail.com`;
    const evaluationContent = `Esta é uma avaliação sobre o primeiro produto realizada na tela de detalhe.`;

    const { container } = render(<App />);

    expect(global.fetch).toHaveBeenCalled();

    userEvent.click(await screen.findByText(/Agro/));

    expect(global.fetch).toHaveBeenCalledTimes(2);

    userEvent.click(await screen.findByText(/Pequeno Principe, O/));

    await waitFor(() =>
      expect(
        container.querySelector('h1.product__title__detail')
      ).toHaveTextContent(mockedQueryResult.results[0].title)
    );

    userEvent.type(screen.getByPlaceholderText('Email'), evaluationEmail);

    expect(await screen.findByPlaceholderText('Email')).toHaveValue(
      evaluationEmail
    );

    userEvent.type(
      screen.getByPlaceholderText('Comentário'),
      evaluationContent
    );

    expect(await screen.findByPlaceholderText('Comentário')).toHaveValue(
      evaluationContent
    );

    for (let index = 1; index <= 5; index += 1) {
      expect(
        container.querySelector(`label[for='avaliation${index}']`)
      ).toBeVisible();
    };

    userEvent.click(container.querySelector("label[for='avaliation3']"));

    expect(await screen.findByText(/avaliar/i)).toBeVisible();
    
    userEvent.click(await screen.findByText(/avaliar/i));

    expect(await screen.findByPlaceholderText('Email')).toHaveValue('');
    expect(await screen.findByPlaceholderText('Comentário')).toHaveValue('');

    await waitFor(async () => {
      expect(await screen.findByText(evaluationEmail)).toBeVisible();
      expect(await screen.findByText(evaluationContent)).toBeVisible();
    });
  });

  it('Avalia se o formulário é validado corretamente', async () => {
    const evaluationEmailError = 'teste';
    const fullEmail = 'teste@gmail.com';

    const { container } = render(<App />);

    userEvent.click(await screen.findByText(/Agro/));

    userEvent.click(await screen.findByText(/Pequeno Principe, O/));

    const emailErrado = await screen.findByPlaceholderText('Email');

    userEvent.type(emailErrado, evaluationEmailError);

    expect(await screen.findByPlaceholderText('Email')).toHaveValue(
      evaluationEmailError
    );

    expect(await screen.findByText(/avaliar/i)).toBeVisible();
    userEvent.click(await screen.findByText(/avaliar/i));

    await waitFor(async () =>
      expect(await screen.findByText(/Campos inválidos/i)).toBeInTheDocument()
    );

    userEvent.type(await screen.findByPlaceholderText('Email'), fullEmail);

    userEvent.click(await screen.findByText(/avaliar/i));

    await waitFor(async () =>
      expect(await screen.findByText(/Campos inválidos/i)).toBeInTheDocument()
    );

    userEvent.click(container.querySelector("label[for='avaliation3']"));

    userEvent.click(await screen.findByText(/avaliar/i));

    expect(screen.queryByText(/Campos inválidos/i)).toBeNull();
  });

  it('Avalia se a avaliação continua após recarregar a pagina', async () => {
    localStorage.clear();
    localStorage.setItem(mockDetails.id, JSON.stringify(mockLocalStorage));

    const { container } = render(<App />);

    userEvent.click(await screen.findByText(/Agro/));

    userEvent.click(await screen.findByText(/Pequeno Principe, O/));

    await waitFor(async () => await screen.findByText(/comentários/i));
    expect(container.querySelector('ul.reviews__list').children.length).toEqual(
      2
    );
  });

  it('Avalia se a avaliação feita para um produto não aparece na tela de detalhes de outro produto', async () => {
    window.history.pushState(null, document.title, '/');
    render(<App />);

    userEvent.click(await screen.findByText(/Agro/));
    userEvent.click(
      await screen.findByText(
        /Diário De Anne Frank Livro Novo Lacrado Com Fotos Autenticas/
      )
    );
    expect(screen.queryByText(/comentários/i)).toBeNull();
  });
});
