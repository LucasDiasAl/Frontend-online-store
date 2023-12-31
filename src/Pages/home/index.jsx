import React from 'react';
import { Link } from 'react-router-dom';

import qtdAll from '../../services/qtdPlus';
import { getProductsFromCategoryAndQuery, getCategories } from '../../services/api';
import Category from './components/category';
import CartSVG from '../../SVG/cartSVG/cartSVG';
import LoadingSVG from '../../SVG/loading/loadingSVG';
import DisplayItems from './components/displayItems';

import './home.css';

export default class Home extends React.Component {
  state = {
    search: '',
    selectedCategory: '',
    loading: false,
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
    this.setState({ loading: true });
    const response = await getProductsFromCategoryAndQuery(selectedCategory, search);
    this.setState({
      productsApi: response.results,
      searchHappened: true,
      loading: false });
  };

  handleCategory = async ({ target }) => {
    const { value } = target;
    this.setState({ selectedCategory: value }, () => this.handleSearch());
  };

  addToCart = ({ target: { value } }) => {
    const { productsApi } = this.state;
    const produToAdd = Object.entries(productsApi.filter(({ id }) => id === value)[0]);
    const localProds = JSON.parse(localStorage.getItem('products')) || [];
    const prodsNew = [...localProds, produToAdd];
    localStorage.setItem('products', JSON.stringify(prodsNew));
    localStorage.setItem(`qnt${produToAdd[0][1]}`, '1');
    qtdAll();
    this.forceUpdate();
  };

  render() {
    const { search, productsApi, categorias, searchHappened, loading } = this.state;
    const paragraph = searchHappened === true ? 'Nenhum produto foi encontrado'
      : 'Digite algum termo de pesquisa ou escolha uma categoria.';
    const displatSection = loading === false ? (
      <DisplayItems
        addToCart={ this.addToCart }
        productsApi={ productsApi }
      />) : <LoadingSVG />;
    return (
      <div className="home">
        <div className="home__header">
          <div className="search__div">
            <input
              type="text"
              name="search"
              placeholder="Search"
              search={ search }
              onChange={ this.handleSearchInput }
            />
            <button
              type="submit"
              onClick={ this.handleSearch }
            >
              Pesquisar
            </button>
          </div>
          <div className="cart__div">
            <p>{localStorage.getItem('qtdAll')}</p>
            <Link to="/ShoppingCart">
              <CartSVG />
            </Link>
          </div>
        </div>
        <div className="home__main">
          <div className="display__items">
            { productsApi.length === 0 ? <p>{`${paragraph}`}</p>
              : displatSection}

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
