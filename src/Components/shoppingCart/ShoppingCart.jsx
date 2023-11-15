import React, { Component } from 'react';
import qtdAll from '../../services/qtdPlus';
import MinusSVG from '../../SVG/plusMinusSVG/MinusSVG';
import PlusSVG from '../../SVG/plusMinusSVG/PlusSVG';

import './shoppingCart.css';

export default class Cart extends Component {
  state = {
    cart: [],
    totalPrice: 0.00,
  };

  componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    const localProds = JSON.parse(localStorage.getItem('products')) || [];
    const prodsObj = localProds.map((curr) => Object.fromEntries(curr));
    prodsObj.forEach(({ id }) => {
      localStorage.setItem(`qnt${id}`, '1');
    });
    this.setState({ cart: prodsObj }, this.totalPrice);
  }

  totalPrice = () => {
    const { cart } = this.state;
    const totalPrice = cart.reduce((acc, { price, id }) => {
      const productQuantity = Number(localStorage.getItem(`qnt${id}`));
      const productPrice = productQuantity * Number(price);
      acc += productPrice;
      return Math.round(acc * 100) / 100;
    }, 0);
    this.setState({ totalPrice });
  };

  handleQntMinus = () => {
    const { cart } = this.state;
    const qtd = cart.length;
    const localQtd = Number(localStorage.getItem('qtdAll'));
    const sub = localQtd - 1;
    const verify = sub < qtd ? qtd : sub;
    localStorage.setItem('qtdAll', verify);
  };

  handleQnt = (name) => {
    const { cart } = this.state;
    const valorUm = 1;
    const id = name.split('-');
    if (name.includes('mais')) {
      const currentQnt = Number(localStorage.getItem(`qnt${id[1]}`));
      const soma = (currentQnt + valorUm);
      const valueMax = cart.filter((e) => e.id === id[1]);
      const verifyValueMax = soma > valueMax[0].available_quantity
        ? valueMax[0].available_quantity : soma;
      if (verifyValueMax !== currentQnt) {
        qtdAll();
        localStorage.setItem(`qnt${id[1]}`, verifyValueMax);
      }
    } else {
      const soma = (Number(localStorage.getItem(`qnt${id[1]}`)) - valorUm);
      const result = soma < 1 ? 1 : soma;
      if (soma > 0) {
        this.handleQntMinus();
        localStorage.setItem(`qnt${id[1]}`, result);
      }
    }
    this.totalPrice();
    this.forceUpdate();
  };

  handleRemove = ({ target: { value } }) => {
    const { cart } = this.state;
    const removedItem = cart.filter(({ id }) => id !== value);
    const removedItemArray = removedItem.map((curr) => Object.entries(curr)) || [];
    const individualQnt = localStorage.getItem(`qnt${value}`);
    const qntAll = localStorage.getItem('qtdAll');
    const newQnt = Number(qntAll) - Number(individualQnt);
    localStorage.setItem('qtdAll', newQnt);
    localStorage.removeItem(`qnt${value}`);
    localStorage.setItem('products', JSON.stringify(removedItemArray));
    this.setState({ cart: removedItem }, this.totalPrice);
  };

  render() {
    const { cart, totalPrice } = this.state;
    return (
      <div className="cart__main">
        <div className="cart__header">
          <div className="header__links">
            {cart.length !== 0 && (
              <a
                data-testid="checkout-products"
                href="/Checkout"
                className="checkout__link"
              >
                Finalizar compras
              </a>
            )}
            <a
              data-testid="checkout-products"
              href="/"
              className="checkout__link"
            >
              Continuar comprando
            </a>
          </div>
          <div className="total__price">
            <h1>
              {`Preço total: R$${totalPrice}`}
            </h1>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="empty__message">
            <h1 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h1>
          </div>
        )
          : (
            <ul className="cart__list">
              { cart.map((prod) => (
                <li key={ prod.id } className="individual__product">
                  <img
                    src={ prod.thumbnail }
                    alt={ prod.title }
                    className="img__product"
                  />
                  <h1
                    data-testid="shopping-cart-product-name"
                    className="title__product"
                  >
                    { prod.title }

                  </h1>
                  <div className="quantity__div">
                    <div className="quantity__buttons">
                      <button
                        type="button"
                        name={ `mais-${prod.id}` }
                        data-testid="product-increase-quantity"
                        onClick={ () => this
                          .handleQnt(`mais-${prod.id}`) }
                      >
                        <PlusSVG />
                      </button>
                      <button
                        type="button"
                        name={ `menos-${prod.id}` }
                        data-testid="product-decrease-quantity"
                        onClick={ () => this
                          .handleQnt(`menos-${prod.id}`) }
                      >
                        <MinusSVG />
                      </button>
                    </div>
                    <h1 data-testid="shopping-cart-product-quantity">
                      { localStorage.getItem(`qnt${prod.id}`) }
                    </h1>
                  </div>
                  <h1 className="individual__price">
                    { prod.price }
                  </h1>
                  <button
                    type="button"
                    data-testid="remove-product"
                    value={ prod.id }
                    onClick={ this.handleRemove }
                    className="remove__button"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
      </div>
    );
  }
}
