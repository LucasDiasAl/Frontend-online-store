const categories = require('./categories');
const details = require('./details');
const queryNull = require('./queryNull')

const mockFetchNull = (url) => {
  if (url === 'https://api.mercadolibre.com/sites/MLB/categories') {
    return Promise.resolve({
      json: () => Promise.resolve(categories)
    })
  }

  if (url.includes('https://api.mercadolibre.com/sites/MLB/search?category=') && url.includes('&q=')) {
    return Promise.resolve({
      json: () => Promise.resolve(queryNull)
    })
  }

  if (url.includes('https://api.mercadolibre.com/sites/MLB/search?q=')) {
    return Promise.resolve({
      json: () => Promise.resolve(queryNull)
    })
  }

  if (url.includes('https://api.mercadolibre.com/sites/MLB/search?category=')) {
    return Promise.resolve({
      json: () => Promise.resolve(queryNull)
    })
  }

  if (url.includes('https://api.mercadolibre.com/items/')) {
    return Promise.resolve({
      json: () => Promise.resolve(details)
    })
  }

  return Promise.reject('Houve algo de errado com o endpoint, verifique se ele está correto')
};

module.exports = mockFetchNull;
