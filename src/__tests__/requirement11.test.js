import React, { Children } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockedQueryResult from '../__mocks__/query';
import mockFetch from '../__mocks__/mockFetch';
import mockLocalStorage from '../__mocks__/localStorage';
import mockDetails from '../__mocks__/details';
import userEvent from '@testing-library/user-event';

describe(`11 - Avalie e comente acerca de um produto em sua tela de exibição detalhada`, () => {
  beforeEach(() => global.fetch = jest.fn().mockImplementation(mockFetch));
  beforeEach(() => localStorage.clear())

  it('Avalia se é possível realizar uma avaliação na tela de detalhes de um produto', async () => {
    const evaluationEmail = `teste@gmail.com`;
    const evaluationContent = `Esta é uma avaliação sobre o primeiro produto realizada na tela de detalhe.`;

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
      expect(container.querySelector(`label[for='avaliation${index}']`)).toBeVisible();
    }
    userEvent.click(container.querySelector("label[for='avaliation3']"));

    expect(await screen.findByText(/avaliar/i)).toBeVisible();
    userEvent.click(await screen.findByText(/avaliar/i));

    expect(await screen.findByPlaceholderText('Email')).toHaveValue('');
    expect(await screen.findByPlaceholderText('Comentário')).toHaveValue(
      ''
    );
    
    await waitFor(async () => {
      expect(await screen.findByText(evaluationEmail)).toBeVisible();
      expect(await screen.findByText(evaluationContent)).toBeVisible();
    });
  });

  it('Avalia se o formulário é validado corretamente', async () => {
    const evaluationEmailError = 'teste';
    const fullEmail = 'teste@gmail.com';

    const { container } = render(<App />);
    // userEvent.click(await screen.findByText(/Agro/));
    
    // userEvent.click(await screen.findByText(/Pequeno Principe, O/));
    
    screen.debug();
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

    userEvent.type(
      await screen.findByPlaceholderText('Email'),
      fullEmail
    );

    userEvent.click(await screen.findByText(/avaliar/i));

    await waitFor(async () =>
      expect(await screen.findByText(/Campos inválidos/i)).toBeInTheDocument()
    );

    userEvent.click(container.querySelector("label[for='avaliation3']"));
    userEvent.click(await screen.findByText(/avaliar/i));
    screen.debug();
      expect( screen.queryByText(/Campos inválidos/i)).toBeNull()
  });

  it('Avalia se a avaliação continua após recarregar a pagina', async () => {
    localStorage.clear();
    localStorage.setItem(mockDetails.id, JSON.stringify(mockLocalStorage));

    const { container } = render(<App />);
    await waitFor(async () => await screen.findByText(/comentários/i))
    expect((container.querySelector('ul.reviews__list')).children.length).toEqual(
      2
    );
  });

  it('Avalia se a avaliação feita para um produto não aparece na tela de detalhes de outro produto', async () => {
    window.history.pushState(null, document.title, '/');
    render(<App />);

    userEvent.click(await screen.findByText(/Agro/));
    userEvent.click(await screen.findByText(/Diário De Anne Frank Livro Novo Lacrado Com Fotos Autenticas/));
    expect(screen.queryByText(/comentários/i)).toBeNull();
  });
});
