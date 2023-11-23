import React from 'react';
import PropTypes from 'prop-types';

import './form.css';

class Form extends React.Component {
  state = {
    email: '',
    avaliation: '',
    message: '',
    invalid: false,
  };

  // LOGICA DO REGEX RETIRADO DO POST NO SITE STACKOVERFLOW 'https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript'//
  handleInput = ({ target }) => {
    this.setState({ invalid: false });
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validation = () => {
    const regex = /\S+@\S+\.\S+/;
    const { email, avaliation } = this.state;
    return (!regex.test(email)
    || (email === '') || (avaliation === ''));
  };

  handleCheck = ({ target: { value, name } }) => {
    this.setState({ invalid: false });
    this.setState({ [name]: value });
  };

  handleButton = ({ target: { value } }) => {
    const { email, avaliation, message } = this.state;
    const invalidInputs = this.validation();
    if (invalidInputs) {
      this.setState({ invalid: true });
    } else {
      this.setState({ invalid: false });
      const reviews = JSON.parse(localStorage.getItem(value)) || [];
      const avalObj = Object.fromEntries([
        ['email', email],
        ['text', message],
        ['rating', avaliation]]);
      localStorage.setItem([value], JSON.stringify([...reviews, avalObj]));
      this.setState({ email: '',
        avaliation: '',
        message: '',
      });
    }
    this.forceUpdate();
  };

  render() {
    const { email, message, invalid } = this.state;
    const { prodId } = this.props;
    return (
      <div className="product__form">
        { invalid && <p className="error__msg">Campos inválidos</p>}
        <form className="form__body">
          <input
            type="email"
            name="email"
            className="email__input"
            placeholder="Email"
            data-testid="product-detail-email"
            value={ email }
            onChange={ this.handleCheck }
            required
          />
          <div className="product__score">
            <label htmlFor="avaliation1">
              1
              <input
                type="radio"
                name="avaliation"
                data-testid="1-rating"
                id="avaliation1"
                value={ 1 }
                onChange={ this.handleCheck }
              />
            </label>
            <label htmlFor="avaliation2">
              2
              <input
                type="radio"
                name="avaliation"
                data-testid="2-rating"
                value={ 2 }
                id="avaliation2"
                onChange={ this.handleCheck }
              />
            </label>
            <label htmlFor="avaliation3">
              3
              <input
                type="radio"
                name="avaliation"
                data-testid="3-rating"
                value={ 3 }
                id="avaliation3"
                onChange={ this.handleCheck }
              />
            </label>
            <label htmlFor="avaliation4">
              4
              <input
                type="radio"
                name="avaliation"
                data-testid="4-rating"
                value={ 4 }
                id="avaliation4"
                onChange={ this.handleCheck }
              />
            </label>
            <label htmlFor="avaliation5">
              5
              <input
                type="radio"
                name="avaliation"
                data-testid="5-rating"
                value={ 5 }
                id="avaliation5"
                onChange={ this.handleCheck }
              />
            </label>
          </div>
          <textarea
            className="product__coment"
            name="message"
            cols="30"
            rows="10"
            data-testid="product-detail-evaluation"
            placeholder="Comentário"
            value={ message }
            onChange={ this.handleInput }
          />
          <button
            type="button"
            className="btn__review"
            data-testid="submit-review-btn"
            value={ prodId }
            onClick={ this.handleButton }
          >
            Avaliar
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  prodId: PropTypes.string,
};
Form.defaultProps = {
  prodId: undefined,
};

export default Form;
