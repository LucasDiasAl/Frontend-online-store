/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import * as RadioGroup from '@radix-ui/react-radio-group';

export default class CheckoutRadio extends React.Component {
  render() {
    const { handleRadio, verify } = this.props;
    return (
      <div
        style={ { display: 'flex',
          flexDirection: 'column',
          gap: '0.3rem',
          alignItems: 'center',
          justifyContent: 'space-between' } }
      >
        {verify && (
          <span
            className="payment__warning"
          >
            escolha um metodo de pagamento

          </span>)}
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
      </div>
    );
  }
}

CheckoutRadio.propTypes = {
  handleRadio: PropTypes.func.isRequired,
  verify: PropTypes.bool.isRequired,
};
