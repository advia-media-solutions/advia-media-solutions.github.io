import * as THREE from "three";
import { COL } from "./esferaMateria";

/**
 * El funnel de /products/paid-media, dibujado como funnel y no como tres cajas
 * en fila: un embudo que se estrecha de arriba abajo, con el tramo de Advia
 * —donde se descartan marcas— en la familia dorada y los otros dos en gris de
 * soporte. Lo que cuenta el dibujo es que el hueco está en medio.
 *
 * Trabaja en PÍXELES, como el esquema de ramas: cámara ortográfica con el
 * viewport del contenedor. Así las etiquetas HTML pueden colocarse por
 * porcentaje sobre el mismo alto y caer siempre dentro de su tramo.
 */

/* De qué anchura a qué anchura va el embudo, en fracción del ancho útil. */
const BOCA = 1;
const SALIDA = 0.42;

/** Separación entre tramos, en píxeles. */
const AIRE = 6;

/** Lo que tarda un tramo en aparecer, y el desfase entre uno y el siguiente. */
const ENTRADA = 520;
const DESFASE = 130;

/** Interpola el borde del embudo a una altura dada (0 arriba, 1 abajo). */
function anchoEn(t) {
  return BOCA + (SALIDA - BOCA) * t;
}

export default function crearFunnel(canvas, { tramos }) {
  const contenedor = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(0, 1, 0, -1, -100, 100);

  const piezas = tramos.map((tramo) => {
    const geo = new THREE.BufferGeometry();
    /* Dos triángulos por tramo: es un trapecio, no hace falta más. */
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6 * 3), 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(6 * 3), 3));
    const mat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0,
      /* El trapecio se construye en coordenadas de pantalla (y hacia abajo), así
         que sus triángulos quedan en sentido horario y el culling por defecto
         los descartaría: la forma no llegaría a verse. */
      side: THREE.DoubleSide,
    });
    const malla = new THREE.Mesh(geo, mat);
    malla.frustumCulled = false;
    scene.add(malla);
    return { geo, mat, malla, destacado: !!tramo.destacado, peso: tramo.peso || 1 };
  });

  let ancho = 1;
  let alto = 1;
  let arrancado = 0;
  let vivo = true;

  /* El oro no es plano: recorre la familia crema → ámbar → miel de arriba abajo,
     como el cristal de las esferas. El resto del embudo es soporte, no dato, y
     va en el gris de trazo del sistema. */
  function tinte(destacado, t) {
    if (!destacado) return COL.trazo;
    return t < 0.5
      ? COL.cream.clone().lerp(COL.amber, t * 2)
      : COL.amber.clone().lerp(COL.honey, (t - 0.5) * 2);
  }

  function disponer(w, h) {
    ancho = Math.max(1, w);
    alto = Math.max(1, h);
    renderer.setSize(ancho, alto, false);
    camera.left = 0;
    camera.right = ancho;
    camera.top = 0;
    camera.bottom = -alto;
    camera.updateProjectionMatrix();

    const total = piezas.reduce((n, p) => n + p.peso, 0);
    const centro = ancho / 2;
    let y = 0;

    piezas.forEach((p) => {
      const alturaTramo = (p.peso / total) * alto;
      const arriba = y / alto;
      const abajo = (y + alturaTramo - AIRE) / alto;
      const semiArriba = (anchoEn(arriba) * ancho) / 2;
      const semiAbajo = (anchoEn(abajo) * ancho) / 2;
      const y0 = -y;
      const y1 = -(y + alturaTramo - AIRE);

      const v = [
        [centro - semiArriba, y0], [centro + semiArriba, y0], [centro + semiAbajo, y1],
        [centro - semiArriba, y0], [centro + semiAbajo, y1], [centro - semiAbajo, y1],
      ];
      const pos = p.geo.attributes.position;
      const col = p.geo.attributes.color;
      const alturas = [arriba, arriba, abajo, arriba, abajo, abajo];
      v.forEach(([x, yy], k) => {
        pos.setXYZ(k, x, yy, 0);
        const c = tinte(p.destacado, alturas[k]);
        col.setXYZ(k, c.r, c.g, c.b);
      });
      pos.needsUpdate = true;
      col.needsUpdate = true;
      p.geo.computeBoundingSphere();

      y += alturaTramo;
    });
  }

  function pintar() {
    if (!vivo) return;
    const ahora = performance.now();
    piezas.forEach((p, i) => {
      let t = 0;
      if (arrancado) {
        const desde = arrancado + i * DESFASE;
        t = Math.min(1, Math.max(0, (ahora - desde) / ENTRADA));
      }
      /* El destacado llega a opaco; los otros dos se quedan en soporte. */
      p.mat.opacity = t * (p.destacado ? 1 : 0.5);
      /* Entra creciendo desde su propio centro: el embudo se abre, no aparece. */
      p.malla.scale.x = 0.9 + 0.1 * t;
      p.malla.position.x = ((1 - p.malla.scale.x) * ancho) / 2;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(pintar);
  }
  requestAnimationFrame(pintar);

  return {
    disponer,
    dibujar() {
      if (!arrancado) arrancado = performance.now();
    },
    completar() {
      arrancado = performance.now() - (ENTRADA + DESFASE * piezas.length);
    },
    destruir() {
      vivo = false;
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      renderer.dispose();
    },
  };
}
