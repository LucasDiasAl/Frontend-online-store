import React from 'react';
import { Link } from 'react-router-dom';
import qtdAll from '../../services/qtdPlus';
import { getProductsFromCategoryAndQuery, getCategories } from '../../services/api';
import Category from '../category/Category';
import CartSVG from '../../SVG/cartSvg';

import './home.css';

export default class Home extends React.Component {
  state = {
    search: '',
    productsApi: [],
    categorias: [],
  };

  componentDidMount() {
    getCategories().then((response) => this.setState({ categorias: response }));
  }

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  };

  handleCategory = async ({ target }) => {
    const { search } = this.state;
    const { value } = target;
    const response = await getProductsFromCategoryAndQuery(value, search);
    this.setState({ productsApi: response.results });
  };

  addToCart = ({ target: { value } }) => {
    const { productsApi } = this.state;
    const produToAdd = Object.entries(productsApi.filter(({ id }) => id === value)[0]);
    const localProds = JSON.parse(localStorage.getItem('products')) || [];
    const prodsNew = [...localProds, produToAdd];
    localStorage.setItem('products', JSON.stringify(prodsNew));
    qtdAll();
    this.forceUpdate();
  };

  render() {
    const { search, productsApi, categorias } = this.state;
    return (
      <div className="home">
        <div className="home__header">
          <div className="search__div">
            <input
              type="text"
              name="search"
              placeholder="Search"
              data-testid="query-input"
              search={ search }
              onChange={ this.handleSearch }
            />
            <button
              type="submit"
              data-testid="query-button"
              onClick={ this.handleCategory }
            >
              Pesquisar
            </button>
          </div>
          <div className="cart__div">
            <p data-testid="shopping-cart-size">{localStorage.getItem('qtdAll')}</p>
            <a data-testid="shopping-cart-button" href="/ShoppingCart">
              <CartSVG />
            </a>
          </div>
        </div>
        <div className="home__main">
          <div className="display__items">
            <div>
              { productsApi.length === 0
          && (
            <div>
              <p
                data-testid="home-initial-message"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            </div>
          )}
            </div>

            { productsApi.length === 0 ? <p>Nenhum produto foi encontrado</p>
              : (
                <ul>
                  {productsApi.map((product) => (
                    <li
                      data-testid="product"
                      key={ product.id }
                    >
                      <div>
                        {product.shipping.free_shipping
                    && (<p data-testid="free-shipping">Frete grátis</p>)}
                      </div>
                      <Link
                        to={ `/Products/${product.id}` }
                        data-testid="product-detail-link"
                      >
                        <p>
                          { product.title }
                        </p>
                        <img src={ product.thumbnail } alt={ product.title } />
                        <p />
                        <p>
                          { product.price }
                        </p>
                      </Link>
                      <button
                        type="button"
                        data-testid="product-add-to-cart"
                        value={ product.id }
                        onClick={ this.addToCart }
                      >
                        Adicionar ao Carrinho
                      </button>
                    </li>
                  ))}
                </ul>
              )}

          </div>
          <div className="categories__items">
            <Category
              handleCategory={ this.handleCategory }
              categorias={ categorias }
            />
          </div>
        </div>
      </div>
    );
  }
}
