import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockFetch from '../__mocks__/mockFetch';
import userEvent from '@testing-library/user-event';

describe('15 - Mostre quais produtos tem o frete grátis', () => {
  beforeEach(() => global.fetch = jest.fn().mockImplementation(mockFetch));
  it('Exibe corretmente a informação de frete grátis dos produtos', async () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalled();
    userEvent.click(await screen.findByText(/Agro/));
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect((await screen.findAllByText(/frete grátis/i)).length).toBe(1);
  });
});
