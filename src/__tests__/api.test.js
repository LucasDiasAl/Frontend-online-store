import * as api from '../services/api';
import mockedCategoriesResult from '../__mocks__/categories';
import mockFetch from '../__mocks__/mockFetch';

describe('1 - Implemente o módulo de acesso à api do Mercado Livre', () => {

  beforeEach(() => global.fetch = jest.fn().mockImplementation(mockFetch));

  afterEach(() => {
    if (global.fetch) {
      global.fetch.mockClear();
    }
  });

  it('Implementa a função `getCategories`', () => {
    return api.getCategories().then((categories) => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.mercadolibre.com/sites/MLB/categories',
      );
      expect(categories).toEqual(mockedCategoriesResult);
    });
  });

  it('Implementa a função `getProductsFromCategoryAndQuery`', () => {
    const categoryId = 'category1';
    const query = 'my-query';
    const successResponseBody = {};

    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(successResponseBody),
    });

    global.fetch.mockImplementation(() => mockFetchPromise);

    return api.getProductsFromCategoryAndQuery(categoryId, query).then((products) => {
      expect(global.fetch).toHaveBeenCalled();
      expect(products).toEqual(successResponseBody);
    });
  });
});
