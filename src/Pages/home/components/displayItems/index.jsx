import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import HoverCardTitle from '../../../GlobalComponents/hoverCard';
import './displayItems.css';

export default class DisplayItems extends React.Component {
  render() {
    const { productsApi, addToCart } = this.props;
    return (
      <ul className="list__items">
        {productsApi.map((product) => (
          <li key={ product.id } className="product__item">
            <Link to={ `/Products/${product.id}` } className="product__link">
              <img
                className="product__image"
                src={ product.thumbnail }
                alt={ product.title }
              />
              <HoverCardTitle title={ product.title } className="product__title" />
              <h1 className="product__price">{product.price}</h1>
            </Link>
            {product.shipping.free_shipping === true && (
              <h1 className="free__shipping__badge">Frete grátis</h1>
            )}
            <button
              type="button"
              className="add__to__cart__button"
              value={ product.id }
              onClick={ addToCart }
            >
              Adicionar ao Carrinho
            </button>
          </li>
        ))}
      </ul>

    );
  }
}

DisplayItems.propTypes = {
  addToCart: PropTypes.func.isRequired,
  productsApi: PropTypes.arrayOf(Object).isRequired,
};
