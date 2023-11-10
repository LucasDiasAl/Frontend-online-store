/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { PropTypes } from 'prop-types';
import * as HoverCard from '@radix-ui/react-hover-card';

import './displayItems.css';

export default class DisplayItems extends React.Component {
  render() {
    const { productsApi, addToCart } = this.props;
    return (
      <ul className="list__items">
        {productsApi.map((product) => (
          <li key={ product.id } className="product__item">
            <a href={ `/Products/${product.id}` } className="product__link">
              <img
                className="product__image"
                src={ product.thumbnail }
                alt={ product.title }
              />
              <div
                className="title__div"
              >
                <HoverCard.Root openDelay={ 0 } closeDelay={ 0 }>
                  <HoverCard.Trigger className="product__title" asChild>
                    <h1>
                      {product.title}
                    </h1>
                  </HoverCard.Trigger>
                  <HoverCard.Content
                    side="right"
                    className="HoverCardContent"
                  >
                    <HoverCard.Arrow className="HoverCardArrow" />
                    {product.title}
                  </HoverCard.Content>
                </HoverCard.Root>
              </div>
              <h1 className="product__price">{product.price}</h1>
            </a>
            {product.shipping.free_shipping === true && (
              <h1 className="free__shipping__badge">Frete grátis</h1>
            )}
            <button
              type="button"
              className="add__to__cart__button"
              data-testid="product__add__to__cart"
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
