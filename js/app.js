// VALIDAR FORMULARIO

const form = document.querySelector("form");
const nameInput = document.querySelector("#nombre");
const lastName = document.querySelector("#apellido");
const phone = document.querySelector("#telefono");
const email = document.querySelector("#email");
const password = document.querySelector("#contraseña");
const repeatPassword = document.querySelector("#repetircontraseña");

// Definir expresiones regulares para cada campo
const nameRegExp = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'-\s]{3,}$/;
const lastNameRegExp = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'-\s]{3,}$/;
const phoneRegExp = /^\d{9,}$/;
const emailRegExp = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const passwordRegExp =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*,.?]).{8,}$/;

// Comprobar campos vacíos
const checkRequired = (inputField) => {
  if (inputField.value.trim() === "") {
    showError(inputField, "Este campo es requerido");
    return false;
  } else {
    showSuccess(inputField);
    return true;
  }
};

// Comprobar si el valor de un campo cumple con una expresión regular dada
const checkField = (inputField, regex) => {
  if (regex.test(inputField.value.trim())) {
    showSuccess(inputField);
    return true;
  } else {
    const errorMessage = getErrorMessage(inputField);
    showError(inputField, errorMessage);
    return false;
  }
};

// Devolver un mensaje de error para cada campo
function getErrorMessage(inputField) {
  switch (inputField.name) {
    case "nombre":
      return "El campo 'Nombre' debe contener mínimo 3 caracteres y solamente permite letras y espacios en blanco.";
    case "apellido":
      return "El campo 'Apellido' debe contener mínimo 3 caracteres y solamente permite letras y espacios en blanco.";
    case "telefono":
      return "El campo 'Teléfono' debe ter mínimo 9 dígitos o números.";
    case "email":
      return "Este no es un formato válido de correo electrónico";
    case "contraseña":
      return "La contraseña debe contener mínimo 8 caracteres, y debe incluir al menos una letra en mayúscula, una letra en minúscula, y un caracter especial";
    case "repetircontraseña":
      return "Las contraseñas no coinciden";
    default:
      return "";
  }
}

// Comprobar si el valor del campo "Teléfono" es numérico
const checkNumeric = (inputField) => {
  if (!isNaN(inputField.value.trim())) {
    showSuccess(inputField);
    return true;
  } else {
    showError(
      inputField,
      "Este campo solamente debe contener números, no se permiten guiones o paréntesis como separadores"
    );
    return false;
  }
};

// Verificar si los valores de los campos para contraseña coinciden
const checkPasswordsMatch = () => {
  if (password.value !== repeatPassword.value) {
    showError(repeatPassword, getErrorMessage(repeatPassword));
    return false;
  } else {
    showSuccess(repeatPassword);
    return true;
  }
};

// Mostrar un mensaje de error en un campo de formulario
const showError = (inputField, message) => {
  const formField = inputField.parentElement;
  const small = formField.querySelector("small");
  small.textContent = message || getErrorMessage(inputField);
};

// Mostrar un campo de formulario como exitoso o válido
const showSuccess = (inputField) => {
  const formField = inputField.parentElement;
  const small = formField.querySelector("small");
  small.textContent = "";
};

// Validación de los campos del formulario antes de enviar los datos
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;
  isValid =
    checkRequired(nameInput) && checkField(nameInput, nameRegExp) && isValid;
  isValid =
    checkRequired(lastName) && checkField(lastName, lastNameRegExp) && isValid;
  isValid =
    checkRequired(phone) &&
    checkNumeric(phone) &&
    checkField(phone, phoneRegExp) &&
    isValid;
  isValid = checkRequired(email) && checkField(email, emailRegExp) && isValid;
  isValid =
    checkRequired(password) && checkField(password, passwordRegExp) && isValid;
  isValid = checkRequired(repeatPassword) && checkPasswordsMatch() && isValid;

  if (isValid) {
    // form.submit();
  }
});

// Validación en tiempo real
nameInput.addEventListener("input", () => {
  checkField(nameInput, nameRegExp);
});

lastName.addEventListener("input", () => {
  checkField(lastName, lastNameRegExp);
});

phone.addEventListener("input", () => {
  checkNumeric(phone) && checkField(phone, phoneRegExp);
});

email.addEventListener("input", () => {
  checkField(email, emailRegExp);
});

password.addEventListener("input", () => {
  checkField(password, passwordRegExp);
});

repeatPassword.addEventListener("input", () => {
  checkField(repeatPassword, passwordRegExp);
  checkPasswordsMatch;
});
