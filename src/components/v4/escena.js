/**
 * ¿Merece la pena montar una escena WebGL en este lienzo?
 *
 * Las piezas 3D se esconden en móvil con `display: none` (v4.css §16), pero el
 * CSS no impide que el componente descargue three.js, abra un contexto WebGL y
 * deje un canvas de 0×0 pintando para nadie. Esta guarda se consulta ANTES del
 * `import()`: si el lienzo no tiene caja, no hay nada que montar.
 *
 * Además de la caja, mira dos señales del navegador: el ahorro de datos, que
 * el usuario ha pedido de forma explícita, y el ancho de pantalla, por si el
 * lienzo llega antes de que el CSS lo haya escondido.
 */
export const CORTE_ESCENA = "(max-width: 900px)";

export default function escenaMerecePena(lienzo) {
  if (typeof window === "undefined") return false;
  if (window.matchMedia(CORTE_ESCENA).matches) return false;
  if (navigator.connection?.saveData) return false;
  if (lienzo && lienzo.getClientRects().length === 0) return false;
  return true;
}
