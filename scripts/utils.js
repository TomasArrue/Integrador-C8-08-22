const LONGITUD_CONTRASENIA = 8;

/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
  return normalizarTexto(texto) == ""
}

function validarNombre(texto) {
  if (validarTexto(texto)) {
    return "El nombre no puede estar incompleto"
  }
}
function validarApellido(texto) {
  if (validarTexto(texto)) {
    return "El apellido no puede estar incompleto"
  }
}

function normalizarTexto(texto) {
  return texto.trim().toLowerCase();
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return "El formato del email es incorrecto";
  }
}

function normalizarEmail(email) {
  return email.trim().toLowerCase();
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
  if (contrasenia.length < LONGITUD_CONTRASENIA) {
    return "Su contraseña es menor a 8 caracteres";
  }
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
  if (contrasenia_1 !== contrasenia_2) {
    return "Las contraseñas no coinciden";
  }
}

function cargarToken() {
  return localStorage.getItem("jwt");
}

function guardarToken(jwt) {
  localStorage.setItem("jwt", jwt);
}

function validarLogin({ email, password }) {
  if ([email, password].includes("")) {
    return "Todos los campos son obligatorios";
  } else if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return "El formato del email es incorrecto";
  }

  return "";
}

function permitirRegistro(array) {
  let cant = 0;
  array.forEach((element) => {
    if (element !== undefined) {
      cant++;
    }
  });
  return cant === 0 ? true : false;
}


/* ---------------------- validacion lado cliente -------------------------- */

function cargarErrores(mensajeArray, datosRegistro) {
  // carga los mensajes de error en el arreglo
  mensajeArray.push(mensajeNombre(datosRegistro.firstName))
  mensajeArray.push(mensajeApellido(datosRegistro.lastName))
  mensajeArray.push(mensajeEmail(datosRegistro.email))
  mensajeArray.push(mensajeContraseñaIgual(datosRegistro.password, datosRegistro.passwordConfirm))
  mensajeArray.push(mensajeContraseñaValida(datosRegistro.firstName))
}

function mensajeNombre(firstName){
  return validarNombre(firstName)
}
function mensajeApellido(lastName){
  return validarApellido(lastName)
}
function mensajeEmail(email){
  return validarEmail(email)
}
function mensajeContraseñaIgual(password, passwordConfirm){
  return compararContrasenias(password, passwordConfirm)
}
function mensajeContraseñaValida(password){
  return validarContrasenia(password)
}

function mostrarErrores(mensajeArray, datosRegistro) {
  //si no hay errores realiza el registro;
  //caso contrario los muestra
  if (permitirRegistro(mensajeArray)) {
    realizarRegister(datosRegistro);
  } else {
    const containerError = document.querySelector(".containerError");
    containerError.innerHTML = ``;
    mensajeArray.forEach((element) => {
      if (element !== undefined) {
        containerError.innerHTML += `<li class="rafa2">${element}</li>`;
      }
    });
  }
}