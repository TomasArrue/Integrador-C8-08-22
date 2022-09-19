window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = document.querySelector("form");
  const inputNombre = document.getElementById("inputNombre");
  const inputApellido = document.getElementById("inputApellido");
  const inputEmail = document.getElementById("inputEmail");
  const inputPassword = document.getElementById("inputPassword");
  const inputPasswordRepetida = document.getElementById(
    "inputPasswordRepetida"
  );

  let mensajeArray = [];

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const datosRegistro = {
      firstName: normalizarTexto(inputNombre.value),
      lastName: normalizarTexto(inputApellido.value),
      email: normalizarEmail(inputEmail.value),
      password: inputPassword.value,
      passwordConfirm: inputPasswordRepetida.value,
    };

    cargarErrores(mensajeArray, datosRegistro)
    
    mostrarErrores(mensajeArray, datosRegistro)

    mensajeArray = [];

    comprobarErrores(mensajeArray, datosRegistro)
  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(datosRegistro) {
    const URL = "https://ctd-todo-api.herokuapp.com/v1/users";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(datosRegistro),
    };

    fetch(URL, config)
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch(function (e) {
        alert("Error! intente mas tarde");
      });
  }
});
