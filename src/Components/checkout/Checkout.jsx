import React from 'react';
import PropTypes from 'prop-types';

import CheckoutForm from './CheckoutForm';
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
  };

  componentDidMount() {
    this.getProducts();
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    console.log(target);
    this.setState({ [name]: value }, () => console.log(this.state));
  };

  handleRadio = ({ target }) => {
    const { value } = target;
    this.setState({ payment: value }, () => console.log(this.state));
  };

  getProducts() {
    const response = JSON.parse(localStorage.getItem('products'));
    const products = response.map((e) => Object.fromEntries(e));
    this.setState({ products });
  }

  validation = () => {
    const { name, email, cpf, phone, cep, adress, payment } = this.state;
    const { history } = this.props;
    const all = [name, email, cpf, phone, cep, adress, payment];
    if (all.some((e) => e === '')) {
      this.setState({ verify: true });
    } else {
      this.setState({ verify: false });
      localStorage.clear();
      history.push('/');
    }
  };

  render() {
    const { products, name, email, cpf, phone, cep, adress, verify } = this.state;
    return (
      <div className="checkout__main">
        <div className="checkout__header">
          <h1> Pagamento </h1>
        </div>
        <div className="checkout__body">
          <div className="products">
            { products.map((product) => <p key={ product.id }>{product.title}</p>)}
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
