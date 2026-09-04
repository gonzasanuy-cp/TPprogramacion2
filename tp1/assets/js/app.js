const CLAVE_CONTACTOS = "miAgendaContactos";
const CLAVE_TEMA = "miAgendaTema";
const FOTO_PREDETERMINADA = "assets/img/avatar-predeterminado.svg";

document.addEventListener("DOMContentLoaded", iniciarAplicacion);

function iniciarAplicacion() {
  prepararTema();
  prepararMenu();
  actualizarResumen();
  const pagina = window.location.pathname.split("/").pop() || "index.html";
  if (pagina === "contactos.html") prepararPaginaContactos();
  if (pagina === "favoritos.html") mostrarFavoritos();
  if (pagina === "agregar.html") prepararFormulario();
}

function obtenerContactos() {
  return JSON.parse(localStorage.getItem(CLAVE_CONTACTOS)) || [];
}

function guardarContactos(contactos) {
  localStorage.setItem(CLAVE_CONTACTOS, JSON.stringify(contactos));
}

function prepararTema() {
  const temaGuardado = localStorage.getItem(CLAVE_TEMA);
  if (temaGuardado === "claro") document.body.classList.add("claro");
  document.querySelectorAll(".boton-tema").forEach((boton) => {
    boton.textContent = document.body.classList.contains("claro") ? "☾" : "☀";
    boton.addEventListener("click", () => {
      document.body.classList.toggle("claro");
      const tema = document.body.classList.contains("claro") ? "claro" : "oscuro";
      localStorage.setItem(CLAVE_TEMA, tema);
      boton.textContent = tema === "claro" ? "☾" : "☀";
    });
  });
}

function prepararMenu() {
  const boton = document.querySelector(".boton-menu");
  const menu = document.querySelector(".enlaces-menu");
  if (!boton || !menu) return;
  boton.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", abierto);
    boton.textContent = abierto ? "×" : "☰";
  });
}

function actualizarResumen() {
  const contactos = obtenerContactos();
  const total = document.querySelector("#total-contactos");
  const favoritos = document.querySelector("#total-favoritos");
  if (total) total.textContent = contactos.length;
  if (favoritos) favoritos.textContent = contactos.filter((contacto) => contacto.favorito).length;
}

function prepararPaginaContactos() {
  const buscador = document.querySelector("#buscador-contactos");
  let ordenActual = "normal";
  mostrarContactos();
  buscador.addEventListener("input", () => mostrarContactos(buscador.value, ordenActual));
  document.querySelectorAll("[data-orden]").forEach((boton) => {
    boton.addEventListener("click", () => {
      ordenActual = boton.dataset.orden;
      document.querySelectorAll("[data-orden]").forEach((item) => item.classList.remove("activo"));
      boton.classList.add("activo");
      mostrarContactos(buscador.value, ordenActual);
    });
  });
}

function mostrarContactos(textoBuscado = "", orden = "normal") {
  const lista = document.querySelector("#lista-contactos");
  if (!lista) return;
  let contactos = obtenerContactos();
  const texto = textoBuscado.toLowerCase().trim();
  contactos = contactos.filter((contacto) => (`${contacto.nombre} ${contacto.apellido} ${contacto.telefono}`).toLowerCase().includes(texto));
  if (orden === "az") contactos.sort((a, b) => nombreCompleto(a).localeCompare(nombreCompleto(b), "es"));
  if (orden === "za") contactos.sort((a, b) => nombreCompleto(b).localeCompare(nombreCompleto(a), "es"));
  lista.innerHTML = contactos.length ? contactos.map(crearTarjeta).join("") : mensajeVacio(texto ? "No encontramos contactos con esa búsqueda." : "No tenés contactos todavía.");
  const cantidad = document.querySelector("#texto-cantidad");
  if (cantidad) cantidad.textContent = `${contactos.length} contacto${contactos.length === 1 ? "" : "s"} mostrado${contactos.length === 1 ? "" : "s"}.`;
  activarBotonesTarjetas();
}

function mostrarFavoritos() {
  const lista = document.querySelector("#lista-favoritos");
  if (!lista) return;
  const favoritos = obtenerContactos().filter((contacto) => contacto.favorito);
  lista.innerHTML = favoritos.length ? favoritos.map(crearTarjeta).join("") : mensajeVacio("Todavía no marcaste ningún contacto como favorito.");
  activarBotonesTarjetas();
}

function nombreCompleto(contacto) { return `${contacto.nombre} ${contacto.apellido}`; }

function escaparHtml(texto) {
  const caja = document.createElement("div"); caja.textContent = texto || ""; return caja.innerHTML;
}

function crearTarjeta(contacto) {
  const foto = escaparHtml(contacto.foto || FOTO_PREDETERMINADA);
  return `<article class="tarjeta-contacto"><button class="estrella ${contacto.favorito ? "favorito" : ""}" data-favorito="${contacto.id}" aria-label="Cambiar favorito">${contacto.favorito ? "★" : "☆"}</button><div class="cabecera-contacto"><img src="${foto}" alt="Foto de ${escaparHtml(nombreCompleto(contacto))}"><div><h2>${escaparHtml(nombreCompleto(contacto))}</h2><p class="categoria">${escaparHtml(contacto.categoria)}</p></div></div><ul class="datos-contacto"><li>☎ ${escaparHtml(contacto.telefono)}</li><li>✉ ${escaparHtml(contacto.correo)}</li><li>⌂ ${escaparHtml(contacto.direccion)}</li></ul><div class="acciones-contacto"><button class="editar" data-editar="${contacto.id}">Editar</button><button class="eliminar" data-eliminar="${contacto.id}">Eliminar</button></div></article>`;
}

function mensajeVacio(mensaje) {
  return `<div class="estado-vacio"><strong>${mensaje}</strong><p>Podés crear uno desde la página para añadir contactos.</p><a href="agregar.html">+ Añadir contacto</a></div>`;
}

function activarBotonesTarjetas() {
  document.querySelectorAll("[data-favorito]").forEach((boton) => boton.addEventListener("click", () => cambiarFavorito(boton.dataset.favorito)));
  document.querySelectorAll("[data-editar]").forEach((boton) => boton.addEventListener("click", () => window.location.href = `agregar.html?id=${boton.dataset.editar}`));
  document.querySelectorAll("[data-eliminar]").forEach((boton) => boton.addEventListener("click", () => eliminarContacto(boton.dataset.eliminar)));
}

function cambiarFavorito(id) {
  const contactos = obtenerContactos();
  const contacto = contactos.find((item) => item.id === id);
  if (!contacto) return;
  contacto.favorito = !contacto.favorito;
  guardarContactos(contactos); actualizarResumen();
  if (document.querySelector("#lista-favoritos")) mostrarFavoritos(); else mostrarContactos(document.querySelector("#buscador-contactos")?.value);
}

function eliminarContacto(id) {
  const contactos = obtenerContactos();
  const contacto = contactos.find((item) => item.id === id);
  if (contacto && confirm(`¿Querés eliminar a ${nombreCompleto(contacto)}?`)) {
    guardarContactos(contactos.filter((item) => item.id !== id)); actualizarResumen();
    if (document.querySelector("#lista-favoritos")) mostrarFavoritos(); else mostrarContactos(document.querySelector("#buscador-contactos")?.value);
  }
}

function prepararFormulario() {
  const formulario = document.querySelector("#formulario-contacto");
  const id = new URLSearchParams(window.location.search).get("id");
  if (id) cargarContactoEnFormulario(id);
  ["nombre", "apellido", "telefono", "correo", "direccion"].forEach((campo) => {
    document.querySelector(`#${campo}`).addEventListener("input", () => validarCampo(document.querySelector(`#${campo}`)));
  });
  document.querySelector("#foto").addEventListener("change", mostrarVistaPrevia);
  formulario.addEventListener("submit", guardarFormulario);
}

function validarCampo(campo) {
  const mensaje = campo.parentElement.querySelector("small");
  let error = "";
  if (campo.validity.valueMissing) error = "Este campo es obligatorio.";
  else if (campo.id === "correo" && campo.validity.typeMismatch) error = "Ingresá un correo válido.";
  else if (campo.id === "telefono" && !/^[0-9+()\s-]{7,}$/.test(campo.value)) error = "Ingresá un teléfono válido.";
  else if (campo.value.trim().length < 2) error = "Ingresá al menos 2 caracteres.";
  campo.classList.toggle("invalido", Boolean(error)); campo.classList.toggle("valido", !error && campo.value !== "");
  if (mensaje) { mensaje.textContent = error; mensaje.classList.toggle("error", Boolean(error)); }
  return !error;
}

function guardarFormulario(evento) {
  evento.preventDefault();
  const obligatorios = ["nombre", "apellido", "telefono", "correo", "direccion"];
  const esValido = obligatorios.map((id) => validarCampo(document.querySelector(`#${id}`))).every(Boolean);
  if (!esValido) return;
  const contactos = obtenerContactos(); const idExistente = document.querySelector("#id-contacto").value;
  const contacto = { id: idExistente || String(Date.now()), nombre: document.querySelector("#nombre").value.trim(), apellido: document.querySelector("#apellido").value.trim(), telefono: document.querySelector("#telefono").value.trim(), correo: document.querySelector("#correo").value.trim(), direccion: document.querySelector("#direccion").value.trim(), nacimiento: document.querySelector("#nacimiento").value, categoria: document.querySelector("#categoria").value, preferencia: document.querySelector("input[name=preferencia]:checked").value, favorito: document.querySelector("#favorito").checked, foto: document.querySelector("#vista-previa").dataset.foto || FOTO_PREDETERMINADA };
  const indice = contactos.findIndex((item) => item.id === contacto.id);
  if (indice >= 0) contactos[indice] = contacto; else contactos.push(contacto);
  guardarContactos(contactos); window.location.href = "contactos.html";
}

function cargarContactoEnFormulario(id) {
  const contacto = obtenerContactos().find((item) => item.id === id); if (!contacto) return;
  document.querySelector("#titulo-formulario").textContent = "Editar contacto"; document.querySelector("#id-contacto").value = contacto.id;
  ["nombre", "apellido", "telefono", "correo", "direccion", "nacimiento", "categoria"].forEach((campo) => document.querySelector(`#${campo}`).value = contacto[campo] || "");
  document.querySelector(`input[name=preferencia][value="${contacto.preferencia || "Teléfono"}"]`).checked = true; document.querySelector("#favorito").checked = contacto.favorito;
  const imagen = document.querySelector("#vista-previa"); imagen.src = contacto.foto || FOTO_PREDETERMINADA; imagen.dataset.foto = contacto.foto || FOTO_PREDETERMINADA;
}

function mostrarVistaPrevia(evento) {
  const archivo = evento.target.files[0]; if (!archivo) return;
  const lector = new FileReader(); lector.addEventListener("load", () => { const imagen = document.querySelector("#vista-previa"); imagen.src = lector.result; imagen.dataset.foto = lector.result; }); lector.readAsDataURL(archivo);
}
