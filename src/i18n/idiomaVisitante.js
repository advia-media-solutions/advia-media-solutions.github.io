/**
 * Qué idioma toca a quien entra por la portada.
 *
 * Manda la elección explícita (la cookie `NEXT_LOCALE`, que escribe el
 * conmutador). Sin ella, el navegador: si entre sus idiomas el español va
 * antes que el inglés, español; si no, inglés. Quien no manda Accept-Language
 * (Googlebot y casi todos los crawlers) no se redirige: devuelve null y cada
 * uno indexa la URL que ha pedido, con `x-default` apuntando a la inglesa.
 */
export const COOKIE_IDIOMA = "NEXT_LOCALE";
export const IDIOMAS = ["es", "en"];

/** Los idiomas de Accept-Language, del más preferido al menos. */
function idiomasDelNavegador(cabecera) {
  return cabecera
    .split(",")
    .map((parte, orden) => {
      const [etiqueta, ...params] = parte.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return {
        idioma: etiqueta.split("-")[0].toLowerCase(),
        peso: q ? Number(q.trim().slice(2)) || 0 : 1,
        orden,
      };
    })
    .filter((i) => i.idioma && i.peso > 0)
    .sort((a, b) => b.peso - a.peso || a.orden - b.orden)
    .map((i) => i.idioma);
}

export function idiomaVisitante({ cookie, acceptLanguage }) {
  if (IDIOMAS.includes(cookie)) return cookie;
  if (!acceptLanguage) return null;
  const primero = idiomasDelNavegador(acceptLanguage).find((i) => IDIOMAS.includes(i));
  return primero === "es" ? "es" : "en";
}
