class InputValidation {
  constructor() {
    this.allRegex = {
      name: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/,
      cpf: /^\d{11}$/,
      phone: /^\d{9,11}$/,
      cep: /^\d{8}$/,
    };
  }

  validateString = (value, regexType) => {
    const regex = this.allRegex[regexType];
    const validationResult = !regex.test(value);
    console.log(value, regexType, validationResult);
    return validationResult;
  };
}

export default InputValidation;
