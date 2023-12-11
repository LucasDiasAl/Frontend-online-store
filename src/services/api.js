export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Error fetching products for category ${categoryId} and query ${query}:`,
      error,
    );
    throw error;
  }
}

export async function getProductsFromId(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
}
