import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe.skip('2 - Crie uma página de listagem de produtos vazia', () => {
  it(`A tela contém a mensagem pedida: 'Digite algum termo de pesquisa ou escolha uma
      categoria.'`, async () => {
    render(<App />);
    const initialText = await screen.findByText(/Digite algum termo de pesquisa ou escolha uma categoria/)
    expect(initialText)
    .toBeInTheDocument();
  });
});
