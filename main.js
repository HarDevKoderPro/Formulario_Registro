const form = document.getElementById("registroForm");
const mensaje = document.getElementById("mensaje");
const nombreInput = document.getElementById("nombre");
const correoInput = document.getElementById("correo");
const passwordInput = document.getElementById("password");

function mostrarMensaje(texto, tipo) {
  if (tipo === "error" && Array.isArray(texto)) {
    mensaje.className = "mensaje error";
    mensaje.innerHTML = "<ul>" + texto.map(t => `<li>${t}</li>`).join("") + "</ul>";
  } else {
    mensaje.innerHTML = "";
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
  }
}

function limpiarErrores() {
  document.querySelectorAll("input.error").forEach(el => el.classList.remove("error"));
}

function correoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  limpiarErrores();

  const nombre = nombreInput.value.trim();
  const correo = correoInput.value.trim();
  const password = passwordInput.value.trim();
  const errores = [];

  if (!nombre) {
    errores.push("El nombre es obligatorio.");
    nombreInput.classList.add("error");
  } else if (nombre.length < 3) {
    errores.push("El nombre debe tener al menos 3 caracteres.");
    nombreInput.classList.add("error");
  }

  if (!correo) {
    errores.push("El correo es obligatorio.");
    correoInput.classList.add("error");
  } else if (!correoValido(correo)) {
    errores.push("Ingresa un correo electrónico válido.");
    correoInput.classList.add("error");
  }

  if (!password) {
    errores.push("La contraseña es obligatoria.");
    passwordInput.classList.add("error");
  } else if (password.length < 6) {
    errores.push("La contraseña debe tener al menos 6 caracteres.");
    passwordInput.classList.add("error");
  }

  if (errores.length > 0) {
    mostrarMensaje(errores, "error");
    return;
  }

  mostrarMensaje("Formulario enviado correctamente.", "exito");
  form.reset();
});
