import React from 'react';
import PropTypes from 'prop-types';
import * as Form from '@radix-ui/react-form';

import InputValidation from '../../../../../helpers/InputValidation';

import './checkoutInputs.css';

export default class CheckoutInputs extends React.Component {
  render() {
    const inputValidation = new InputValidation();
    const labelDivStyle = { display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between' };
    const {
      name,
      email,
      cpf,
      phone,
      cep,
      adress,
      handleInput,
    } = this.props;
    return (
      <div className="form__inputs">
        <Form.Field className="form__field" name="name">
          <div
            style={ labelDivStyle }
          >
            <Form.Label className="form__label">Nome</Form.Label>
            <Form.Message className="form__message" match="valueMissing">
              Insira seu nome
            </Form.Message>
            <Form.Message
              className="form__message"
              match={ (value) => inputValidation.validateString(value, 'name') }
            >
              nome inválido
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              type="text"
              name="name"
              className="input"
              value={ name }
              onChange={ handleInput }
              placeholder="Name"
              data-testid="checkout-fullname"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="form__field" name="email">
          <div
            style={ labelDivStyle }
          >
            <Form.Label className="form__label">Email</Form.Label>
            <Form.Message className="form__message" match="valueMissing">
              Insira seu email
            </Form.Message>
            <Form.Message
              className="form__message"
              match="typeMismatch"
            >
              email inválido
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              type="email"
              name="email"
              className="input"
              value={ email }
              onChange={ handleInput }
              data-testid="checkout-email"
              placeholder="Email"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="form__field" name="cpf">
          <div
            style={ labelDivStyle }
          >
            <Form.Label className="form__label">CPF</Form.Label>
            <Form.Message className="form__message" match="valueMissing">
              Insira seu CPF
            </Form.Message>
            <Form.Message
              className="form__message"
              match={ (value) => inputValidation.validateString(value, 'cpf') }
            >
              CPF inválido
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              type="number"
              name="cpf"
              className="input"
              value={ cpf }
              onChange={ handleInput }
              placeholder="CPF"
              data-testid="checkout-cpf"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="form__field" name="phone">
          <div
            style={ labelDivStyle }
          >
            <Form.Label className="form__label">Telefone</Form.Label>
            <Form.Message className="form__message" match="valueMissing">
              Insira seu telefone
            </Form.Message>
            <Form.Message
              className="form__message"
              match={ (value) => inputValidation.validateString(value, 'phone') }
            >
              telefone inválido
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              type="number"
              name="phone"
              className="input"
              value={ phone }
              onChange={ handleInput }
              placeholder="Telefone"
              data-testid="checkout-phone"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="form__field" name="cep">
          <div
            style={ labelDivStyle }
          >
            <Form.Label className="form__label">CEP</Form.Label>
            <Form.Message className="form__message" match="valueMissing">
              Insira seu CEP
            </Form.Message>
            <Form.Message
              className="form__message"
              match={ (value) => inputValidation.validateString(value, 'cep') }
            >
              CEP inválido
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              type="number"
              name="cep"
              className="input"
              value={ cep }
              onChange={ handleInput }
              placeholder="CEP"
              data-testid="checkout-cep"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="form__field" name="adress">
          <div
            style={ labelDivStyle }
          >
            <Form.Label className="form__label">Endereço</Form.Label>
            <Form.Message className="form__message" match="valueMissing">
              Insira seu endereço
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              type="text"
              name="adress"
              className="input"
              value={ adress }
              onChange={ handleInput }
              placeholder="Endereço"
              data-testid="checkout-address"
              required
            />
          </Form.Control>
        </Form.Field>
      </div>
    );
  }
}

CheckoutInputs.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  cpf: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  cep: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
};
