/**
 * La línea de tiempo de «Cómo funciona»: siete escenas seguidas sobre un solo
 * reloj en segundos. Todo lo que se mueve en la pieza se calcula a partir de
 * `t` con estas funciones, así una escena se puede pintar en cualquier instante
 * (y saltar a ella) sin guardar estado propio.
 */

/* Segundos que dura cada paso. Una vuelta entera, unos 35 s. */
export const DURACIONES = [5, 4.5, 4.5, 4.5, 4.5, 5.5, 6];

export const INICIOS = DURACIONES.reduce(
  (acc, d, i) => [...acc, i === 0 ? 0 : acc[i - 1] + DURACIONES[i - 1]],
  []
);

export const TOTAL = DURACIONES.reduce((a, b) => a + b, 0);

export const FINALES = INICIOS.map((s, i) => s + DURACIONES[i]);

/* Recorta a [0, 1]. */
export const cl = (v) => Math.max(0, Math.min(1, v));

/* Salida cúbica: arranca rápido y se posa. */
export const ease = (v) => 1 - Math.pow(1 - cl(v), 3);

export function escenaEn(t) {
  const i = FINALES.findIndex((fin) => t < fin);
  return i === -1 ? DURACIONES.length - 1 : i;
}

/* Tiempo local y progreso dentro de la escena i. */
export const local = (t, i) => t - INICIOS[i];
export const progreso = (t, i) => cl(local(t, i) / DURACIONES[i]);

/* Opacidad de algo que vive entre a y b, con fundido de 0,35 s a cada lado. */
export function ventana(t, a, b) {
  if (t < a || t > b) return 0;
  return Math.min(1, (t - a) / 0.35, (b - t) / 0.35);
}

/* Estilo de algo que entra: se funde y se desliza `px` por el eje dado. */
export const entra = (o, eje, px) => ({
  opacity: o,
  transform: `translate${eje}(${(1 - o) * px}px)`,
});

/* El instante que se enseña de cada escena cuando no hay movimiento: casi al
   final, con todo ya dibujado. */
export const instanteQuieto = (i) => FINALES[i] - 0.5;
