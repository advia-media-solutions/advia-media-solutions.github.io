import React, { useEffect, useMemo, useRef } from "react";
import { AGENTES, R_BOLA, enMapa } from "./RecorridoAgentesEscena";

/**
 * El reparto de las paradas (sección §02 de Productos).
 *
 * Empieza siendo el mapa con el que termina /technology: los recorridos de
 * los cinco agentes y las paradas por las que pasan. Son los MISMOS datos
 * (AGENTES), así que no es un parecido: es el mapa. Los agentes en sí no se
 * pintan: aquí lo que cuenta son las paradas, que es lo que se clasifica.
 *
 * Conforme se baja, cada parada abandona su recorrido y se cuela por detrás
 * de la caja del producto que la activa —web y YouTube en canales digitales,
 * ChatGPT en entornos conversacionales—. No forman nada al llegar: entran en
 * la caja y desaparecen. Va con el scroll, no con reloj, y si se sube vuelven
 * al mapa.
 *
 * Cada bola lleva el anillo fino del color de su medio, el del mapa. Es HTML
 * y sigue a la bola en cada cuadro, por debajo de las cajas como ella.
 *
 * El dibujo va aparte y solo en cliente: three.js no debe entrar en el bundle
 * inicial. Si no llega —o el equipo no da para WebGL— quedan las cajas, que
 * son el contenido; el mapa solo lo ilustra.
 */

/** A qué caja va cada medio. */
const GRUPO = { Web: 0, YouTube: 0, ChatGPT: 1 };

/**
 * Paradas del mapa que aquí sobran, en coordenadas del boceto: el recorrido
 * entero del tercer agente y las puntas del cuarto y el quinto. Sin ellas el
 * mapa se recoge y ocupa menos alto, y sigue leyéndose como el mapa.
 */
const QUITAR = new Set(
  [[765, 1580], [495, 1355], [195, 1520], [15, 1850], [-255, 2030], [-960, 1080], [-800, 1260]]
    .map(([x, y]) => enMapa(x, y))
    .map(([x, y]) => `${Math.round(x)},${Math.round(y)}`)
);

/** Alto del mapa dentro de la banda, en píxeles. El resto lo pone el ajuste. */
const ALTO_MAPA = 440;

/**
 * El mapa en crudo: las paradas únicas (cuatro están compartidas entre
 * agentes, y en el mapa son una sola bola), qué medio tienen, a qué caja van,
 * y por qué índices pasa cada recorrido.
 */
function mapa() {
  const claves = new Map();
  const bolas = [];
  const recorridos = AGENTES.map((a) =>
    a.paradas
      .filter((p) => !QUITAR.has(`${Math.round(p.x)},${Math.round(p.y)}`))
      .map((p) => {
        const clave = `${Math.round(p.x)},${Math.round(p.y)}`;
        if (!claves.has(clave)) {
          claves.set(clave, bolas.length);
          bolas.push({ x: p.x, y: p.y, medio: p.medio, grupo: GRUPO[p.medio] ?? 0 });
        }
        return claves.get(clave);
      })
  ).filter((r) => r.length > 1);
  /* El margen es el del anillo, que sobresale de la bola. */
  const m = R_BOLA * 1.6;
  const xs = [...bolas.map((b) => b.x - m), ...bolas.map((b) => b.x + m)];
  const ys = [...bolas.map((b) => b.y - m), ...bolas.map((b) => b.y + m)];
  const l = Math.min(...xs);
  const t = Math.min(...ys);
  return { bolas, recorridos, l, t, w: Math.max(...xs) - l, h: Math.max(...ys) - t };
}

/** LCG de semilla fija: el reparto dentro de cada caja es el mismo siempre. */
function dado(semilla) {
  let s = semilla;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

export default function Reparto({ cols, children }) {
  const raiz = useRef(null);
  const lienzo = useRef(null);
  const cajas = useRef(null);
  const anillos = useRef([]);
  const motor = useRef(null);
  const datos = useMemo(mapa, []);

  useEffect(() => {
    let vivo = true;
    const canvas = lienzo.current;
    const caja = raiz.current;
    const grid = cajas.current;
    if (!canvas || !caja || !grid) return undefined;

    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let escala = 1;

    /* La caja guarda cada bola que le entra: un encogimiento breve, como si
       la tragara, en el momento en que la bola cruza su borde. Solo al entrar
       —subiendo no hay nada que guardar— y nunca con el movimiento reducido. */
    const dentro = datos.bolas.map(() => false);
    const tragos = [];
    const guardar = (grupo) => {
      const el = grid.children[grupo];
      if (!el || quieto) return;
      /* Si entran dos casi a la vez, el segundo trago sustituye al primero:
         no se suman ni se ve un temblor. */
      if (tragos[grupo]) tragos[grupo].cancel();
      tragos[grupo] = el.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(0.985)", offset: 0.35 },
          { transform: "scale(1.004)", offset: 0.75 },
          { transform: "scale(1)" },
        ],
        { duration: 460, easing: "cubic-bezier(0.2, 0, 0, 1)" }
      );
    };
    const entradas = (avances) => {
      avances.forEach((e, i) => {
        const ya = e >= 0.9;
        if (ya && !dentro[i]) guardar(datos.bolas[i].grupo);
        dentro[i] = ya;
      });
    };

    /* El mapa cabe en la banda por ancho o por alto, lo que antes tope, y se
       centra: es el mapa a escala, no un reparto nuevo. */
    const pieza = canvas.parentElement;
    const ajuste = () => {
      const w = pieza.clientWidth;
      escala = Math.min(w / datos.w, ALTO_MAPA / datos.h);
      const ox = (w - datos.w * escala) / 2;
      const oy = (ALTO_MAPA - datos.h * escala) / 2;
      return (x, y) => ({ x: ox + (x - datos.l) * escala, y: oy + (y - datos.t) * escala });
    };

    const medir = () => {
      const a = ajuste();
      const base = pieza.getBoundingClientRect();
      const azar = dado(5);
      /* A dónde va cada bola: dentro de su caja, repartidas a lo ancho y a
         distintas alturas, siempre por debajo del borde superior para que la
         caja las tape. */
      const cajasPx = [...grid.children].map((el) => {
        const r = el.getBoundingClientRect();
        return { l: r.left - base.left, t: r.top - base.top, w: r.width };
      });
      const desde = datos.bolas.map((b) => a(b.x, b.y));
      const hasta = datos.bolas.map((b) => {
        const c = cajasPx[b.grupo] || cajasPx[0];
        return { x: c.l + c.w * (0.15 + 0.7 * azar()), y: c.t + 70 + 60 * azar() };
      });
      if (motor.current) motor.current.disponer(pieza.clientWidth, pieza.clientHeight, desde, hasta);
    };

    /* El avance sale de dónde está la banda: el mapa se ve entero primero, y
       las bolas empiezan a irse cuando la banda ha subido hasta el tercio alto
       de la ventana. */
    let pedido = 0;
    const avanzar = () => {
      pedido = 0;
      const m = motor.current;
      if (!m) return;
      if (quieto) {
        m.avance(1);
        return;
      }
      const r = caja.getBoundingClientRect();
      const alto = window.innerHeight;
      m.avance((alto * 0.12 - r.top) / (alto * 0.5));
    };
    const alScroll = () => {
      if (!pedido) pedido = requestAnimationFrame(avanzar);
    };

    const ro = new ResizeObserver(() => {
      medir();
      alScroll();
    });

    const radio = () => R_BOLA * escala;

    import("./RepartoEscena")
      .then(({ default: crearReparto }) => {
        if (!vivo) return;
        ajuste();
        motor.current = crearReparto(canvas, {
          bolas: datos.bolas,
          recorridos: datos.recorridos,
          radio: radio(),
          alPintar: (pos, avances) => {
            entradas(avances);
            /* El mismo anillo que en el mapa de /technology: allí el hueco son 9
               unidades del cuadro, que escalan con la bola. Aquí la bola ya viene
               en píxeles, así que el hueco se saca de su radio y no de un número
               fijo; si no, con la bola más grande el anillo quedaba lejos. */
            const r = radio() * (1 + 9 / R_BOLA);
            anillos.current.forEach((el, i) => {
              if (!el || !pos[i]) return;
              el.style.width = `${2 * r}px`;
              el.style.height = `${2 * r}px`;
              el.style.transform = `translate(${pos[i].x - r}px, ${pos[i].y - r}px)`;
            });
          },
        });
        caja.dataset.listo = "true";
        medir();
        avanzar();
        ro.observe(caja);
        ro.observe(grid);
        window.addEventListener("scroll", alScroll, { passive: true });
      })
      .catch(() => {
        /* Sin WebGL o sin three, quedan las cajas. */
      });

    return () => {
      vivo = false;
      ro.disconnect();
      cancelAnimationFrame(pedido);
      window.removeEventListener("scroll", alScroll);
      if (motor.current) motor.current.destruir();
      motor.current = null;
    };
  }, [datos]);

  return (
    <div className="v4-reparto" ref={raiz}>
      <div className="v4-reparto__pieza" aria-hidden="true">
        <canvas ref={lienzo} />
        {datos.bolas.map((b, i) => (
          <span
            className="v4-reparto__anillo"
            key={i}
            data-medio={b.medio}
            ref={(el) => {
              anillos.current[i] = el;
            }}
          />
        ))}
      </div>
      <div className="v4-reparto__mapa" style={{ height: ALTO_MAPA }} />
      <div className="v4-reparto__cajas" ref={cajas} data-cols={String(cols)}>
        {children}
      </div>
    </div>
  );
}
