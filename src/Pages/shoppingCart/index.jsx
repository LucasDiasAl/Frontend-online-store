import React, { Component } from 'react';
import qtdAll from '../../services/qtdPlus';
import CartProducts from './components/CartProducts';

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
    localStorage.setItem('totalPrice', totalPrice);
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
            <CartProducts
              cart={ cart }
              handleRemove={ this.handleRemove }
              handleQnt={ this.handleQnt }
            />
          )}
      </div>
    );
  }
}
