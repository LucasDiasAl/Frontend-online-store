/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';

import * as Form from '@radix-ui/react-form';
import * as RadioGroup from '@radix-ui/react-radio-group';

export default class CheckoutForm extends React.Component {
  render() {
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
      verify,
      validation,
      handleInput,
      handleRadio,
    } = this.props;
    return (
      <div className="payment__form">
        <Form.Root className="form__root">
          <div className="form__inputs">
            <Form.Field className="FormField" name="name">
              <div
                style={ { display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between' } }
              >
                <Form.Label className="FormLabel">Nome</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Insira seu nome
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Insira um nome válido
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
            <Form.Field className="FormField" name="email">
              <div
                style={ labelDivStyle }
              >
                <Form.Label className="FormLabel">Email</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Insira seu email
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Insira um email válido
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
            <Form.Field className="FormField" name="cpf">
              <div
                style={ labelDivStyle }
              >
                <Form.Label className="FormLabel">CPF</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Insira seu CPF
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Insira um CPF válido
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  type="text"
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
            <Form.Field className="FormField" name="phone">
              <div
                style={ labelDivStyle }
              >
                <Form.Label className="FormLabel">Telefone</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Insira seu telefone
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Insira um telefone válido
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  type="text"
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
            <Form.Field className="FormField" name="cep">
              <div
                style={ labelDivStyle }
              >
                <Form.Label className="FormLabel">CEP</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Insira seu CEP
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Insira um CEP válido
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  type="text"
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
            <Form.Field className="FormField" name="adress">
              <div
                style={ labelDivStyle }
              >
                <Form.Label className="FormLabel">Endereço</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                  Insira seu endereço
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch">
                  Insira um endereço válido
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
          <RadioGroup.Root className="radio__group">
            <div>
              <RadioGroup.Item
                className="radio__group__item"
                value="Boleto"
                onClick={ handleRadio }
                id="Boleto"
              >
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="Label" htmlFor="Boleto">
                Boleto
              </label>
            </div>
            <div>
              <RadioGroup.Item
                className="radio__group__item"
                value="Visa"
                onClick={ handleRadio }
                id="Visa"
              >
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="Label" htmlFor="Visa">
                Visa
              </label>
            </div>
            <div>
              <RadioGroup.Item
                className="radio__group__item"
                value="MasterCard"
                onClick={ handleRadio }
                id="MasterCard"
              >
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="Label" htmlFor="MasterCard">
                MasterCard
              </label>
            </div>
            <div>
              <RadioGroup.Item
                className="radio__group__item"
                value="Elo"
                onClick={ handleRadio }
                id="Elo"
              >
                <RadioGroup.Indicator className="RadioGroupIndicator" />
              </RadioGroup.Item>
              <label className="Label" htmlFor="Elo">
                Elo
              </label>
            </div>
          </RadioGroup.Root>
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
  verify: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  cpf: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  cep: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  validation: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleRadio: PropTypes.func.isRequired,
};
