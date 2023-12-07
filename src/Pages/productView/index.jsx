/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import qtdAll from '../../services/qtdPlus';
import { getProductsFromId } from '../../services/api';
import Form from './components/productForm';
import HoverCardTitle from '../GlobalComponents/hoverCard';
import CartSVG from '../../SVG/cartSVG/cartSVG';
import ReviewTable from './components/reviewTable';

import './products.css';

class Products extends React.Component {
  state = {
    product: [],
    shipping: false,
    avaliaçoes: [],
  };

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    getProductsFromId(id).then((response) => {
      this.setState(
        { product: response, shipping: response.shipping.free_shipping },
        () => {
          this.getAvaliation();
        },
      );
    });
  }

  getAvaliation = () => {
    const { product } = this.state;
    const reviews = JSON.parse(localStorage.getItem(product.id)) || [];
    this.setState({ avaliaçoes: reviews });
  };

  handleClickButton = () => {
    const { product } = this.state;
    const localProds = JSON.parse(localStorage.getItem('products')) || [];
    const produToAdd = Object.entries(product);
    const prodsNew = [...localProds, produToAdd];
    localStorage.setItem('products', JSON.stringify(prodsNew));
    localStorage.setItem(`qnt${product.id}`, '1');
    qtdAll();
    this.forceUpdate();
  };

  render() {
    const { product, shipping, avaliaçoes } = this.state;
    const productPage = (
      <div className="product__body">
        <div className="product__details">
          <div>
            {shipping && (
              <p
                className="free__shipping__details"
              >
                Frete grátis
              </p>)}
          </div>
          <img
            className="product___img__detail"
            src={ product.thumbnail }
            alt={ product.title }
          />
          <HoverCardTitle title={ product.title } className="product__title__detail" />
          <p
            className="price__detail"
          >
            {product.price}

          </p>
          <div>
            <button
              className="add__cart__btn"
              type="submit"
              onClick={ this.handleClickButton }
            >
              Adicionar ao Carrinho
            </button>
          </div>
          <div className="cart">
            <p>{localStorage.getItem('qtdAll')}</p>
            <Link to="/ShoppingCart">
              <CartSVG />
            </Link>
          </div>
          <Form
            prodId={ product.id }
          />

          {avaliaçoes.length !== 0
          && (
            <>
              <h1 className="coment__tag">Comentários</h1>
              <ReviewTable
                avaliaçoes={ avaliaçoes }
              />
            </>)}
        </div>
      </div>
    );
    return productPage;
  }
}

Products.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Products;
