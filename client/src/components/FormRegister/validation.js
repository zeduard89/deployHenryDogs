const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const minPasswordLength = 6;
const maxPasswordLength = 10;

/**
@param {object} userData - Los datos del usuario a validar.
@returns {object} - Un objeto que contiene errores de validación, si los hay.
*/


export const validation = (userData) => {
  let errors = {};

  if (!userData.name) {
    errors.name = 'Ingrese un nombre válido';
  } else if (userData.name.length < 5) {
    errors.name = 'Ingrese un nombre mayor a 5 caracteres';
  }

  if (!emailRegex.test(userData.email)) {
    errors.email = 'Ingrese un email válido';
  } else if (userData.email.length > 35) {
    errors.email = 'Ingrese un email menor a 35 caracteres';
  }

  if (userData.password.length < minPasswordLength || userData.password.length > maxPasswordLength) {
    errors.password = `Ingrese un password entre ${minPasswordLength} y ${maxPasswordLength} caracteres`;
  } else if (!userData.password.match(/\d/)) {
    errors.password = 'Ingrese al menos un número';
  }

  return errors;
};

export default validation;

