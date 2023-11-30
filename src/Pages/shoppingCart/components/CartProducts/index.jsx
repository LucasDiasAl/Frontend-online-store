import React from 'react';
import PropTypes from 'prop-types';

import MinusSVG from '../../../../SVG/plusMinusSVG/MinusSVG';
import PlusSVG from '../../../../SVG/plusMinusSVG/PlusSVG';

import './cartProducts.css';

export default class CartProducts extends React.Component {
  render() {
    const { cart, handleRemove, handleQnt } = this.props;
    return (
      <ul className="cart__list">
        { cart.map((prod) => (
          <li key={ prod.id } className="individual__product">
            <img
              src={ prod.thumbnail }
              alt={ prod.title }
              className="img__product"
            />
            <h1
              className="title__product"
            >
              { prod.title }

            </h1>
            <div className="quantity__div">
              <div className="quantity__buttons">
                <button
                  type="button"
                  name={ `mais-${prod.id}` }
                  onClick={ () => handleQnt(`mais-${prod.id}`) }
                >
                  <PlusSVG />
                </button>
                <button
                  type="button"
                  name={ `menos-${prod.id}` }
                  onClick={ () => handleQnt(`menos-${prod.id}`) }
                >
                  <MinusSVG />
                </button>
              </div>
              <h1>
                { localStorage.getItem(`qnt${prod.id}`) }
              </h1>
            </div>
            <h1 className="individual__price">
              { prod.price }
            </h1>
            <button
              type="button"
              value={ prod.id }
              onClick={ handleRemove }
              className="remove__button"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

CartProducts.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleQnt: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};
