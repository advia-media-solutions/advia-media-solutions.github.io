/**
 * Validación de una candidatura, sin efectos: recibe lo que llegó del
 * formulario y la posición de Advia OS, y devuelve los datos limpios o los
 * errores por campo. Las claves de `errores` son los `name` del formulario,
 * para que el navegador pinte cada error junto a su campo.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINKEDIN = /^https:\/\/([a-z]{2,3}\.)?linkedin\.com\/.+/i;

function texto(valor, maximo) {
  return typeof valor === "string" ? valor.trim().slice(0, maximo) : "";
}

/** Un PDF de verdad empieza por «%PDF», diga lo que diga la extensión. */
export function esPdf(contenido) {
  return Boolean(contenido) && contenido.subarray(0, 4).toString("latin1") === "%PDF";
}

function validarCv(cv, errores) {
  if (!cv || !cv.contenido?.length) errores.cv = "requerido";
  else if (cv.demasiadoGrande) errores.cv = "tamano";
  else if (!esPdf(cv.contenido)) errores.cv = "formato";
}

function validarRespuestas(campos, preguntas, errores) {
  return preguntas.map((pregunta) => {
    const valor = texto(campos[`respuesta.${pregunta.id}`], 3000);
    if (pregunta.required && !valor) errores[`respuesta.${pregunta.id}`] = "requerido";
    return { id: pregunta.id, pregunta: pregunta.label, respuesta: valor };
  });
}

export function validarCandidatura({ campos, cv, posicion, locale }) {
  const errores = {};
  const datos = {
    fullName: texto(campos.fullName, 200),
    email: texto(campos.email, 320).toLowerCase(),
    phone: texto(campos.phone, 40),
    linkedin: texto(campos.linkedin, 300),
    talentPool: campos.talentPool === "si",
  };

  if (datos.fullName.length < 2) errores.fullName = "requerido";
  if (!EMAIL.test(datos.email)) errores.email = "formato";
  if (datos.linkedin && !LINKEDIN.test(datos.linkedin)) errores.linkedin = "formato";
  validarCv(cv, errores);
  const textos = posicion[locale] || posicion.es;
  datos.respuestas = validarRespuestas(campos, textos.questions || [], errores);

  return { datos, errores };
}
