import { useCallback, useEffect, useRef, useState } from "react";

/**
 * El guion de la plataforma, contado como alguien que navega.
 *
 * Cada paso es lo que hace un usuario: un cursor va hasta la pestaña, la fila
 * o el botón (`clic`, una diana `data-diana` dentro de la pieza), pulsa, y la
 * pantalla cambia (`estado`); después se queda el tiempo de leerla (`espera`).
 * El primer paso no pulsa nada: es la pantalla en la que se entra.
 *
 * Solo corre con la pieza a la vista —no hay razón para gastar batería
 * animando algo fuera de pantalla—, sin `prefers-reduced-motion` y mientras
 * nadie la haya parado. Parar es explícito: el botón de pausa, o tocar
 * cualquier cosa de la pieza, que es decir «ahora mando yo». Al reanudar, el
 * paso en curso vuelve a empezar.
 */

/* Lo que tarda el cursor en llegar y en pulsar: van a la par con el CSS. */
const MOVER = 720;
const PULSAR = 200;

export default function usePlataformaSecuencia(pasos, raiz) {
  const [paso, setPaso] = useState(0);
  const [estado, setEstado] = useState(pasos[0].estado);
  const [parada, setParada] = useState(false);
  const [visible, setVisible] = useState(false);
  const [quieto, setQuieto] = useState(true);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, pulsa: false });
  const relojes = useRef([]);

  useEffect(() => {
    /* Sin secuencia con movimiento reducido y también en móvil: allí la
       ventana no tiene sitio para el cursor ni para las notas, y lo que se
       lee es la pantalla, navegable con las pestañas. */
    const medio = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 900px)");
    const leer = () => setQuieto(medio.matches);
    leer();
    medio.addEventListener("change", leer);
    return () => medio.removeEventListener("change", leer);
  }, []);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [raiz]);

  const enMarcha = visible && !parada && !quieto;

  useEffect(() => {
    if (!enMarcha) {
      setCursor((c) => ({ ...c, visible: false, pulsa: false }));
      return undefined;
    }
    const actual = pasos[paso];
    const luego = (fn, ms) => relojes.current.push(setTimeout(fn, ms));
    const aplicar = () => {
      setEstado(actual.estado);
      luego(() => setPaso((p) => (p + 1) % pasos.length), actual.espera);
    };
    const diana = actual.clic && raiz.current?.querySelector(`[data-diana="${actual.clic}"]`);
    if (!diana) {
      aplicar();
    } else {
      /* Adónde va el cursor: al principio de la diana, a media altura, que es
         donde uno pulsa una pestaña o una fila. Coordenadas dentro de la pieza. */
      const r = diana.getBoundingClientRect();
      const base = raiz.current.getBoundingClientRect();
      const x = r.left - base.left + Math.min(r.width / 2, 72);
      const y = r.top - base.top + r.height / 2;
      setCursor({ x, y, visible: true, pulsa: false });
      luego(() => setCursor((c) => ({ ...c, pulsa: true })), MOVER);
      luego(() => {
        setCursor((c) => ({ ...c, pulsa: false }));
        aplicar();
      }, MOVER + PULSAR);
    }
    return () => {
      relojes.current.forEach(clearTimeout);
      relojes.current = [];
    };
  }, [enMarcha, paso, pasos, raiz]);

  /** Lo que hace la persona a mano: la secuencia se para y el estado es suyo. */
  const manual = useCallback((nuevo) => {
    setParada(true);
    setEstado((e) => ({ ...e, ...nuevo }));
  }, []);
  const alternar = useCallback(() => setParada((p) => !p), []);

  return { estado, cursor, enMarcha, parada, quieto, manual, alternar };
}
