// Variables
let caracteresReemplazar = "";
let regexvalidation = "";
let warning = "";
let regexRemplace = "";

const diccionarioEncriptador = {
  a: 'ai', e: 'enter', i: 'imes', o: 'ober', u: 'ufat'
};

// Función que asigna valores iniciales a variables globales
async function parameterinit() {
  caracteresReemplazar = "aeiou";
  regexRemplace = new RegExp(`[${caracteresReemplazar}]`, 'gi');
  regexvalidation = /^[a-z ]+$/; // Acepta solo letras minúsculas y espacios
  warning = "solo letras minúsculas sin acentos y sin caracteres especiales";
}

// Función que permite encriptar o desencriptar
async function accionBoton(accion) {
  let textoEncriptado = "";
  const cadena = encontraValorElemento("message").trim(); // Eliminar espacios en blanco adicionales

  if (!regexvalidation.test(cadena)) {
    mostrarAdvertencia("Por favor, debe digitar " + warning);
    return false;
  }

  textoEncriptado = (accion === 'encriptar') ? encriptar(cadena) : desencriptar(cadena);

  if (textoEncriptado) {
    asignarTextoElemento("response", textoEncriptado);
    mostrarExito(`Mensaje ${(accion === "encriptar") ? 'encriptado' : 'desencriptado'} exitosamente`);
    siresponse();
  } else {
    noresponse();
  }
}

// Realiza acciones en etiquetas HTML cuando NO hay un mensaje encriptado o desencriptado
function noresponse() {

  document.getElementById('noResultBox').removeAttribute('hidden');
  document.getElementById('resultBox').setAttribute('hidden', 'true');
  document.getElementById('encriptar').removeAttribute('disabled');
}

// Realiza acciones en etiquetas HTML cuando hay un mensaje encriptado o desencriptado
function siresponse() {

  document.getElementById('message').value = '';
  document.getElementById('resultBox').removeAttribute('hidden');
  document.getElementById('copiar').removeAttribute('hidden');
  document.getElementById('noResultBox').setAttribute('hidden', 'true');
}

// Función que encripta el texto
function encriptar(cadena) {
  return cadena.replace(regexRemplace, (match) => diccionarioEncriptador[match]);
}

// Función que desencripta el texto
function desencriptar(cadena) {
  const reemplazosInversos = {};
  for (const vocal in diccionarioEncriptador) {
    reemplazosInversos[diccionarioEncriptador[vocal]] = vocal;
  }
  const regex = new RegExp(Object.keys(reemplazosInversos).join("|"), "gi");
  return cadena.replace(regex, (match) => reemplazosInversos[match]);
}

// Función que asigna texto a una etiqueta HTML
function asignarTextoElemento(elemento, texto) {
  document.getElementById(elemento).innerHTML = texto;
}

// Función que encuentra el valor de un elemento formulario
function encontraValorElemento(elemento) {
  return document.getElementById(elemento).value;
}

// Función para mostrar advertencias
function mostrarAdvertencia(mensaje) {
  document.getElementById("container_warning").style.color = "#ff0000";
  asignarTextoElemento("warning", mensaje);
  noresponse();
}

// Función para mostrar éxito
function mostrarExito(mensaje) {
  document.getElementById("container_warning").style.color = "#228B22";
  asignarTextoElemento("warning", mensaje);
}

// Función para copiar al portapapeles el valor de texto en etiquetas HTML
async function copiarportapapeles() {
  const elementoHTML = document.getElementById("response");
  await navigator.clipboard.writeText(elementoHTML.innerText);
  try {
    const text = await navigator.clipboard.readText();
    document.getElementById("message").value = text;
  } catch (err) {
    console.error("Error al leer del portapapeles:", err);
  }
}

// Llamar función para inicializar parámetros generales
parameterinit();
