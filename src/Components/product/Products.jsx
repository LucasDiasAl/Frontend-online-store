/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';

import qtdAll from '../../services/qtdPlus';
import { getProductsFromId } from '../../services/api';
import Form from '../productForm/Form';
import HoverCardTitle from '../displayItems/HoverCard';
import CartSVG from '../../SVG/cartSVG/cartSVG';
import ReviewTable from '../reviewTable/ReviewTable';

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
                data-testid="free-shipping"
              >
                Frete grátis
              </p>)}
          </div>
          <img
            className="product___img__detail"
            data-testid="product-detail-image"
            src={ product.thumbnail }
            alt={ product.title }
          />
          <HoverCardTitle title={ product.title } className="product__title__detail" />
          <p
            className="price__detail"
            data-testid="product-detail-price"
          >
            {product.price}

          </p>
          <div>
            <button
              className="add__cart__btn"
              type="submit"
              onClick={ this.handleClickButton }
              data-testid="product-detail-add-to-cart"
            >
              Adicionar Carrinho
            </button>
          </div>
          <div className="cart">
            <p data-testid="shopping-cart-size">{localStorage.getItem('qtdAll')}</p>
            <a data-testid="shopping-cart-button" href="/ShoppingCart">
              <CartSVG />
            </a>
          </div>
          <Form
            prodId={ product.id }
          />
          <ReviewTable
            avaliaçoes={ avaliaçoes }
          />
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