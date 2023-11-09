import React from 'react';
import { Link } from 'react-router-dom';
import qtdAll from '../../services/qtdPlus';
import { getProductsFromCategoryAndQuery, getCategories } from '../../services/api';
import Category from '../category/Category';
import CartSVG from '../../SVG/cartSVG';
import LoadingSVG from '../../SVG/loading/loadingSVG';

import './home.css';

export default class Home extends React.Component {
  state = {
    search: '',
    selectedCategory: '',
    productsApi: [],
    categorias: [],
    searchHappened: false,
  };

  componentDidMount() {
    getCategories().then((response) => this.setState({ categorias: response }));
  }

  handleSearchInput = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  };

  handleSearch = async () => {
    const { search, selectedCategory } = this.state;
    console.log(selectedCategory, 2, search);
    const response = await getProductsFromCategoryAndQuery(selectedCategory, search);
    this.setState({ productsApi: response.results, searchHappened: true });
  };

  handleCategory = async ({ target }) => {
    const { value, name } = target;
    console.log(value, name);
    this.setState({ selectedCategory: value }, () => this.handleSearch());
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
    const { search, productsApi, categorias, searchHappened } = this.state;
    const paragraph = searchHappened === true ? 'Nenhum produto foi encontrado'
      : 'Digite algum termo de pesquisa ou escolha uma categoria.';
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
              onChange={ this.handleSearchInput }
            />
            <button
              type="submit"
              data-testid="query-button"
              onClick={ this.handleSearch }
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
            { productsApi.length === 0 ? <p>{`${paragraph}`}</p>
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
