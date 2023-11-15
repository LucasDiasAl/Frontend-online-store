import React from 'react';
import PropTypes from 'prop-types';

import * as Form from '@radix-ui/react-form';
import CheckoutRadio from './CheckoutRadios';
import CheckoutInputs from './CheckoutInputs';

export default class CheckoutForm extends React.Component {
  render() {
    const {
      name,
      email,
      cpf,
      phone,
      cep,
      adress,
      handleInput,
      handleRadio,
      validation,
      verify,
    } = this.props;
    return (
      <div className="payment__form">
        <Form.Root className="form__root">
          <CheckoutInputs
            name={ name }
            email={ email }
            cpf={ cpf }
            phone={ phone }
            cep={ cep }
            adress={ adress }
            handleInput={ handleInput }
          />
          <CheckoutRadio handleRadio={ handleRadio } verify={ verify } />
          <Form.Submit asChild>
            <button
              type="submit"
              className="checkout__btn"
              data-testid="checkout-btn"
              onClick={ validation }
            >
              Concluir
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    );
  }
}

CheckoutForm.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  cpf: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  cep: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleRadio: PropTypes.func.isRequired,
  validation: PropTypes.func.isRequired,
  verify: PropTypes.bool.isRequired,
};
