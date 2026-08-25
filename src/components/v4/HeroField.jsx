import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Campo de navegación del hero.
 *
 * Qué es, para que no se confunda con un fondo bonito: las esferas doradas son
 * PARADAS —las fuentes que se repiten en las decisiones de una categoría— y las
 * líneas que se trazan son RECORRIDOS, cada uno el de una persona distinta.
 * Se dibujan, se sostienen y se desvanecen en bucle: caminos infinitos, paradas
 * finitas. Es el mismo mensaje del scroll 5 de /navegacion-activa, en el hero.
 *
 * Sostenibilidad de la pieza:
 * - Solo se monta en cliente y solo si hay WebGL y no hay prefers-reduced-motion.
 * - Se congela cuando el hero sale de pantalla o la pestaña deja de estar visible.
 * - DPR capado y geometría fija: no crece con el tamaño de la ventana.
 * - Es puramente decorativo (aria-hidden). El contenido del hero vive en el DOM
 *   y la retícula SVG sigue ahí para quien no vea el canvas.
 *
 * Sobre marfil (que es la superficie por defecto de Advia) el trazo va en
 * grafito y sin mezcla aditiva: el additive suma hacia el blanco y sobre fondo
 * claro se lava hasta desaparecer.
 */

const PARADAS = 10;
const RECORRIDOS = 26;
const PUNTOS_POR_RECORRIDO = 120;
const POLVO = 420;
const CICLO_MS = 7000;

/** LCG de semilla fija: el campo es siempre el mismo, no una tirada distinta. */
function crearAzar(semilla) {
  let s = semilla;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

function leerColor(nombre, respaldo) {
  if (typeof window === "undefined") return new THREE.Color(respaldo);
  const valor = getComputedStyle(document.documentElement)
    .getPropertyValue(nombre)
    .trim();
  return new THREE.Color(valor || respaldo);
}

function haySoporte() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const lienzo = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (lienzo.getContext("webgl2") || lienzo.getContext("webgl"))
    );
  } catch (e) {
    return false;
  }
}

function generarParadas(azar) {
  const paradas = [];
  for (let i = 0; i < PARADAS; i += 1) {
    paradas.push(
      new THREE.Vector3(
        6 + (azar() - 0.5) * 34,
        (azar() - 0.5) * 15,
        (azar() - 0.5) * 12
      )
    );
  }
  return paradas;
}

/** Cada recorrido pasa por 4 o 5 paradas, con desvío propio: nadie repite ruta. */
function generarRecorridos(paradas, azar) {
  const recorridos = [];
  for (let r = 0; r < RECORRIDOS; r += 1) {
    const control = [];
    let indice = Math.floor(azar() * paradas.length);
    const saltos = 4 + Math.floor(azar() * 2);
    for (let s = 0; s < saltos; s += 1) {
      indice = (indice + 1 + Math.floor(azar() * 3)) % paradas.length;
      control.push(
        paradas[indice]
          .clone()
          .add(
            new THREE.Vector3(
              (azar() - 0.5) * 1.4,
              (azar() - 0.5) * 1.4,
              (azar() - 0.5) * 1.4
            )
          )
      );
    }
    const curva = new THREE.CatmullRomCurve3(control, false, "catmullrom", 0.12);
    recorridos.push({
      puntos: curva.getPoints(PUNTOS_POR_RECORRIDO - 1),
      desfase: azar(),
    });
  }
  return recorridos;
}

function crearTexturaPunto() {
  const lado = 64;
  const lienzo = document.createElement("canvas");
  lienzo.width = lado;
  lienzo.height = lado;
  const ctx = lienzo.getContext("2d");
  const grad = ctx.createRadialGradient(lado / 2, lado / 2, 0, lado / 2, lado / 2, lado / 2);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.55)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, lado, lado);
  const textura = new THREE.CanvasTexture(lienzo);
  textura.colorSpace = THREE.SRGBColorSpace;
  return textura;
}

/** Progreso del recorrido dentro de su ciclo: traza → sostiene → se desvanece. */
function faseDelRecorrido(t) {
  if (t < 0.34) return { dibujado: t / 0.34, opacidad: 1 };
  if (t < 0.68) return { dibujado: 1, opacidad: 1 };
  if (t < 0.86) return { dibujado: 1, opacidad: 1 - (t - 0.68) / 0.18 };
  return { dibujado: 0, opacidad: 0 };
}

export default function HeroField() {
  const contenedor = useRef(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    if (!haySoporte() || !contenedor.current) return undefined;

    const nodo = contenedor.current;
    const azar = crearAzar(20260824);
    const oro = leerColor("--accent-gold", "#FAAD33");
    const trazo = leerColor("--brand-graphite", "#292929");

    const escena = new THREE.Scene();
    const camara = new THREE.PerspectiveCamera(46, 1, 0.1, 200);
    camara.position.set(0, 0, 26);

    const render = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    render.setClearColor(0x000000, 0);
    render.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    nodo.appendChild(render.domElement);

    const grupo = new THREE.Group();
    escena.add(grupo);

    // ── Paradas: las fuentes que se repiten ──────────────────────────────
    const paradas = generarParadas(azar);
    const texturaPunto = crearTexturaPunto();
    const geoParadas = new THREE.BufferGeometry().setFromPoints(paradas);
    const matParadas = new THREE.PointsMaterial({
      size: 2.1,
      map: texturaPunto,
      color: oro,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      sizeAttenuation: true,
    });
    grupo.add(new THREE.Points(geoParadas, matParadas));

    // ── Polvo ambiental: volumen sin ruido ───────────────────────────────
    const posPolvo = new Float32Array(POLVO * 3);
    for (let i = 0; i < POLVO; i += 1) {
      posPolvo[i * 3] = (azar() - 0.5) * 46;
      posPolvo[i * 3 + 1] = (azar() - 0.5) * 24;
      posPolvo[i * 3 + 2] = (azar() - 0.5) * 20;
    }
    const geoPolvo = new THREE.BufferGeometry();
    geoPolvo.setAttribute("position", new THREE.BufferAttribute(posPolvo, 3));
    const matPolvo = new THREE.PointsMaterial({
      size: 0.13,
      map: texturaPunto,
      color: trazo,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
      sizeAttenuation: true,
    });
    grupo.add(new THREE.Points(geoPolvo, matPolvo));

    // ── Recorridos: se trazan uno a uno, cada uno a su ritmo ─────────────
    const recorridos = generarRecorridos(paradas, azar).map((r) => {
      const geo = new THREE.BufferGeometry().setFromPoints(r.puntos);
      const mat = new THREE.LineBasicMaterial({
        color: trazo,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const linea = new THREE.Line(geo, mat);
      geo.setDrawRange(0, 0);
      grupo.add(linea);
      return { linea, geo, mat, desfase: r.desfase };
    });

    // ── Bucle ────────────────────────────────────────────────────────────
    const puntero = { x: 0, y: 0 };
    const objetivo = { x: 0, y: 0 };
    let visible = true;
    let animando = true;
    let cuadro = 0;
    const inicio = performance.now();

    const dimensionar = () => {
      const { clientWidth: w, clientHeight: h } = nodo;
      if (!w || !h) return;
      render.setSize(w, h, false);
      camara.aspect = w / h;
      camara.updateProjectionMatrix();
    };

    const alMover = (e) => {
      objetivo.x = (e.clientX / window.innerWidth - 0.5) * 2;
      objetivo.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const dibujar = (ahora) => {
      cuadro = requestAnimationFrame(dibujar);
      if (!visible || !animando) return;

      const t = (ahora - inicio) / 1000;

      // Parallax suave: el campo responde al puntero sin perseguirlo.
      puntero.x += (objetivo.x - puntero.x) * 0.035;
      puntero.y += (objetivo.y - puntero.y) * 0.035;
      grupo.rotation.y = t * 0.028 + puntero.x * 0.22;
      grupo.rotation.x = Math.sin(t * 0.16) * 0.05 + puntero.y * 0.12;

      recorridos.forEach((r) => {
        const ciclo = (((ahora - inicio) / CICLO_MS + r.desfase) % 1 + 1) % 1;
        const { dibujado, opacidad } = faseDelRecorrido(ciclo);
        r.geo.setDrawRange(0, Math.floor(dibujado * PUNTOS_POR_RECORRIDO));
        r.mat.opacity = opacidad * 0.15;
      });

      matParadas.opacity = 0.92 + Math.sin(t * 0.9) * 0.08;
      render.render(escena, camara);
    };

    dimensionar();
    cuadro = requestAnimationFrame(dibujar);
    setListo(true);

    // Se congela fuera de pantalla y con la pestaña oculta: cero gasto inútil.
    const observador = new IntersectionObserver(
      ([entrada]) => {
        visible = entrada.isIntersecting;
      },
      { threshold: 0 }
    );
    observador.observe(nodo);

    const alCambiarVisibilidad = () => {
      animando = document.visibilityState === "visible";
    };

    window.addEventListener("resize", dimensionar);
    window.addEventListener("pointermove", alMover, { passive: true });
    document.addEventListener("visibilitychange", alCambiarVisibilidad);

    return () => {
      cancelAnimationFrame(cuadro);
      observador.disconnect();
      window.removeEventListener("resize", dimensionar);
      window.removeEventListener("pointermove", alMover);
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
      recorridos.forEach((r) => {
        r.geo.dispose();
        r.mat.dispose();
      });
      geoParadas.dispose();
      matParadas.dispose();
      geoPolvo.dispose();
      matPolvo.dispose();
      texturaPunto.dispose();
      render.dispose();
      if (render.domElement.parentNode === nodo) nodo.removeChild(render.domElement);
    };
  }, []);

  return (
    <div
      ref={contenedor}
      className="v4-hero__campo"
      data-listo={listo ? "true" : undefined}
      aria-hidden="true"
    />
  );
}
