import React from 'react';
import PropTypes from 'prop-types';

import HoverCardTitle from '../GlobalComponents/hoverCard';
import CheckoutForm from './components/checkoutForm';
import './checkout.css';

class Checkout extends React.Component {
  state = {
    products: [],
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    adress: '',
    payment: '',
    verify: false,
    totalPrice: 0,
  };

  componentDidMount() {
    this.getProducts();
    this.getTotalPrice();
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleRadio = ({ target }) => {
    const { value } = target;
    this.setState({ payment: value, verify: false });
  };

  getProducts() {
    const response = JSON.parse(localStorage.getItem('products'));
    const products = response.map((e) => Object.fromEntries(e));
    this.setState({ products });
  }

  getTotalPrice = () => {
    const totalPrice = localStorage.getItem('totalPrice');
    this.setState({ totalPrice });
  };

  validation = () => {
    const { payment } = this.state;
    const { history } = this.props;
    if (payment === '') {
      this.setState({ verify: true });
    } else {
      this.setState({ verify: false });
      localStorage.clear();
      history.push('/');
    }
  };

  render() {
    const { products, name, email, cpf, phone,
      cep, adress, verify, totalPrice } = this.state;
    return (
      <div className="checkout__main">
        <div className="checkout__header">
          <h1 className="checkout__title"> Pagamento </h1>
          <h1 className="total__price__checkout">
            {`Preço total: R$${totalPrice}`}
          </h1>
        </div>
        <div className="checkout__body">
          <div className="products">
            { products.map((product) => (
              <div key={ product.id } className="list__products">
                <img
                  src={ product.thumbnail }
                  alt={ product.title }
                  className="product__img"
                />
                <HoverCardTitle title={ product.title } className="product__text" />
              </div>
            ))}
          </div>
          <CheckoutForm
            name={ name }
            email={ email }
            cpf={ cpf }
            phone={ phone }
            cep={ cep }
            adress={ adress }
            verify={ verify }
            handleRadio={ this.handleRadio }
            handleInput={ this.handleInput }
            validation={ this.validation }
          />
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
// corrijir erro na contagem de produtos do carrinho
