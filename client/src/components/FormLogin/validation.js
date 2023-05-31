export const validation = (userData) => {
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  
    let errors = {};
  
    if (!userData.name) {
      errors.name = 'Ingrese un nombre válido';
    } else if (userData.name.length < 5) {
      errors.name = 'Ingrese un nombre mayor a 5 caracteres';
    }
  
    if (!regexEmail.test(userData.email)) {
      errors.email = 'Ingrese un email válido';
    } else if (userData.email.length > 35) {
      errors.email = 'Ingrese un email menor a 35 caracteres';
    }
  
    if (userData.password.length < 6 || userData.password.length > 10) {
      errors.password = 'Ingrese un password entre 6 y 10 caracteres';
    } else if (!userData.password.match(/\d/)) {
      errors.password = 'Ingrese al menos un número';
    }
  
    return errors;
  };
  
  export default validation;

