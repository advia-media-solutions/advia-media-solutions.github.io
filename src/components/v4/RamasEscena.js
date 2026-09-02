import * as THREE from "three";
import { COL, vertexShader, fragmentShader } from "./esferaMateria";

/**
 * El esquema de canales de /products, dibujado.
 *
 * Es el mismo cristal dorado de la esfera y de la constelación —mismo material,
 * mismo shader—: cuatro ramas que salen del cuerpo de la marca, cada una hasta
 * la bola de su canal. El cuerpo NO se dibuja aquí: lo pinta el motor de la
 * esfera en su propio lienzo, que es la única forma de que sea exactamente la
 * misma bola del hero y no un parecido. El wireframe pedía que las ramas se dibujaran una a una al
 * entrar en pantalla, y eso es todo lo que hace la escena: no gira, no reacciona
 * al ratón y no retiene el scroll.
 *
 * Trabaja en PÍXELES. La cámara es ortográfica con el viewport del contenedor,
 * así que una unidad de mundo es un píxel de pantalla y las ramas pueden
 * terminar exactamente en el centro vertical de cada fila del HTML, que es quien
 * manda: el texto no se coloca sobre el dibujo, el dibujo se ata al texto.
 */

/** Hueco reservado al cuerpo (que pinta su propio motor) y radio de las puntas. */
const R_RAIZ = 58;
const R_HOJA = 9;

/** Lo que tarda una rama en dibujarse, y el desfase entre una y la siguiente. */
const DIBUJADO = 620;
const DESFASE = 140;

const MUESTRAS = 90;

/** Color de fondo real de la sección, para que el cristal funda con ella. */
function fondoDe(nodo) {
  for (let el = nodo; el; el = el.parentElement) {
    const c = getComputedStyle(el).backgroundColor;
    const m = c && c.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
    if (m && (m[4] === undefined || Number(m[4]) > 0.9)) {
      return new THREE.Color(m[1] / 255, m[2] / 255, m[3] / 255);
    }
  }
  return new THREE.Color("#FCFDFD");
}

export default function crearRamas(canvas, { hojas = 4 } = {}) {
  const contenedor = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(0, 1, 0, -1, -1000, 1000);
  camera.position.z = 500;

  const fondo = fondoDe(contenedor);
  const base = {
    uCream: { value: COL.cream },
    uAmber: { value: COL.amber },
    uHoney: { value: COL.honey },
    uCrema: { value: COL.crema },
    uIvory: { value: COL.ivory },
    uBg: { value: fondo },
    uDark: { value: 0.0 },
    uIOR: { value: 2.4 },
    uGlow: { value: 1.6 },
    uFres: { value: 0.0 },
    uSpec: { value: 0.15 },
  };

  const geoBola = new THREE.SphereGeometry(1, 48, 32);
  function crearBola(radio) {
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        ...base,
        uCenter: { value: new THREE.Vector3() },
        /* El halo se mide en mundo, así que escala con la bola: si no, una bola
           pequeña cabe entera dentro del halo y se aplana en una mancha. */
        uCoreSize: { value: (1.6 / 1.05) * radio },
      },
    });
    const mesh = new THREE.Mesh(geoBola, mat);
    mesh.scale.setScalar(radio);
    scene.add(mesh);
    return { mesh, mat, radio };
  }

  const puntas = Array.from({ length: hojas }, () => crearBola(R_HOJA));

  /* Una rama por hoja. La geometría se rehace en cada disposición porque las
     alturas las dicta el HTML y cambian al reflowear. */
  const ramas = puntas.map(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(MUESTRAS * 3), 3));
    const mat = new THREE.LineBasicMaterial({ color: COL.trazo, transparent: true, opacity: 0.9 });
    const linea = new THREE.Line(geo, mat);
    linea.frustumCulled = false;
    scene.add(linea);
    return { geo, linea };
  });

  let ancho = 1;
  let alto = 1;
  let centros = [];
  let arrancado = 0;
  let vivo = true;

  /** Coloca raíz, ramas y puntas para un alto dado y los centros de cada fila. */
  function disponer(w, h, ys) {
    ancho = Math.max(1, w);
    alto = Math.max(1, h);
    centros = ys && ys.length ? ys : puntas.map((_, i) => ((i + 0.5) / puntas.length) * alto);

    renderer.setSize(ancho, alto, false);
    camera.left = 0;
    camera.right = ancho;
    camera.top = 0;
    camera.bottom = -alto;
    camera.updateProjectionMatrix();

    /* El cuerpo lo pinta su propio motor, en su lienzo. Aquí solo se reserva
       su hueco: las ramas salen del borde del racimo. */
    const xRaiz = R_RAIZ;
    const yRaiz = -alto / 2;

    const xPunta = ancho - R_HOJA - 2;
    puntas.forEach((p, i) => {
      const y = -Math.min(alto, Math.max(0, centros[i] ?? 0));
      p.mesh.position.set(xPunta, y, 0);
      p.mat.uniforms.uCenter.value.set(xPunta, y, 0);

      /* Curva con tangentes horizontales: sale de la raíz hacia la derecha y
         llega a la punta también en horizontal. Es el gesto de una rama, no el
         de un cable tirante entre dos puntos. */
      const salida = new THREE.Vector3(xRaiz + R_RAIZ * 0.62, yRaiz, 0);
      const llegada = new THREE.Vector3(xPunta - R_HOJA, y, 0);
      const tramo = (llegada.x - salida.x) * 0.55;
      const curva = new THREE.CubicBezierCurve3(
        salida,
        new THREE.Vector3(salida.x + tramo, yRaiz, 0),
        new THREE.Vector3(llegada.x - tramo, y, 0),
        llegada
      );
      const puntos = curva.getPoints(MUESTRAS - 1);
      const pos = ramas[i].geo.attributes.position;
      puntos.forEach((v, k) => pos.setXYZ(k, v.x, v.y, 0));
      pos.needsUpdate = true;
      ramas[i].geo.computeBoundingSphere();
    });
  }

  function pintar() {
    if (!vivo) return;
    const ahora = performance.now();
    ramas.forEach((r, i) => {
      let t = 0;
      if (arrancado) {
        const desde = arrancado + i * DESFASE;
        t = Math.min(1, Math.max(0, (ahora - desde) / DIBUJADO));
      }
      /* La rama se dibuja: no aparece entera y se desvanece, avanza. */
      r.geo.setDrawRange(0, Math.max(0, Math.round(t * MUESTRAS)));
      /* La punta llega cuando llega su rama, no antes. */
      const p = puntas[i];
      const escala = t < 0.92 ? 0 : ((t - 0.92) / 0.08) * p.radio;
      p.mesh.scale.setScalar(escala);
    });
    renderer.render(scene, camera);
    requestAnimationFrame(pintar);
  }
  requestAnimationFrame(pintar);

  return {
    disponer,
    /** Arranca el trazado. Sin argumento, ahora. */
    dibujar() {
      if (!arrancado) arrancado = performance.now();
    },
    /** Todo dibujado de golpe, para prefers-reduced-motion. */
    completar() {
      arrancado = performance.now() - (DIBUJADO + DESFASE * ramas.length);
    },
    destruir() {
      vivo = false;
      geoBola.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      renderer.dispose();
    },
  };
}
