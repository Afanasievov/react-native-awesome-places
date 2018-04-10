const emailValidator = val => /* eslint-disable-next-line */
  /[a-z0-9][a-z0-9-_\.]+@[a-z0-9][a-z0-9-]+[a-z0-9]\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?/.test(val);

const minLengthValidator = (val, minLength) => val.length >= minLength;

const equalToValidator = (val, checkValue) => val === checkValue;
const validate = (val, rules, connectedValue) => {
  let isValid = true;
  Object.keys(rules).forEach((rule) => {
    switch (rule) {
      case 'email':
        isValid = isValid && emailValidator(val);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      case 'equalTo':
        isValid = isValid && equalToValidator(val, connectedValue[rule]);
        break;
      default:
        isValid = true;
    }
  });

  return isValid;
};

export default validate;