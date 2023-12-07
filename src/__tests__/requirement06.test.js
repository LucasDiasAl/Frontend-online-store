import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockedQueryResult from '../__mocks__/query';
import mockFetch from '../__mocks__/mockFetch';
import userEvent from '@testing-library/user-event';

describe('6 - Selecione uma categoria e mostre somente os produtos daquela categoria', () => {
  beforeEach(()=> jest.spyOn(global, 'fetch').mockImplementation(mockFetch));
  it(`Filtra corretamente os produtos de uma página para exibir somente os daquela
      categoria`, async () => {

    render(<App />);
    expect(global.fetch).toHaveBeenCalled();

    const category = await screen.findByText(/Acessórios para Veículos/)
    userEvent.click(category);

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const products = await screen.findAllByRole('listitem');
    expect(products.length).toEqual(
      mockedQueryResult.results.length,
    );
  });
});
