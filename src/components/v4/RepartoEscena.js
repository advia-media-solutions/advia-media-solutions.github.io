import * as THREE from "three";
import { COL, vertexShader, fragmentShader } from "./esferaMateria";

/* El cristal, con los MISMOS números que el motor de la esfera
   (EsferaFacetada · DEFAULTS): son las mismas bolas que en /technology y
   tienen que verse iguales. Con núcleo y brillo más altos salían lavadas. */
const CORE = 1.5;
const GLOW = 1.1;
const FOV = 18;

/** Coloca la cámara para que el lienzo de `w` × `h` píxeles llene la vista:
    origen arriba a la izquierda, y en escena (x, -y), como hasta ahora. */
function encuadrar(camera, w, h) {
  const dist = h / 2 / Math.tan((FOV * Math.PI) / 360);
  camera.aspect = w / h;
  camera.position.set(w / 2, -h / 2, dist);
  camera.lookAt(w / 2, -h / 2, 0);
  camera.updateProjectionMatrix();
}

/**
 * Las paradas del mapa de /technology, dibujadas y clasificadas.
 *
 * Arranca siendo el mapa tal como termina allí: las mismas bolas de cristal
 * —mismo material, mismo shader— en las mismas paradas, y el trazo gris de
 * cada recorrido enlazándolas. Los cuerpos de los agentes no se dibujan aquí:
 * los pinta el motor de la esfera en su propio lienzo (ver Reparto.jsx), que
 * es la única forma de que sean exactamente los del mapa.
 *
 * Conforme se baja, cada parada deja su recorrido y se cuela por detrás de la
 * caja del producto que la activa. No forman nada al llegar: desaparecen
 * dentro. Los trazos se apagan en cuanto las bolas los abandonan.
 *
 * No tiene reloj: el avance se lo da el scroll. Trabaja en PÍXELES del
 * contenedor: quien llama ya ha convertido el mapa a píxeles.
 */

/** Cuánto avance le toca a cada bola y cuánto se escalona de una a otra. */
const VIAJE = 0.55;
const DESFASE = 0.02;

/** Cuánto sube la bola antes de bajar: un arco, no un cable tirante. */
const ARCO = 40;

/** Muestras por trazo. */
const MUESTRAS = 140;

/** Medio grosor del trazo, en píxeles. Una THREE.Line es siempre de un píxel
    de dispositivo —un pelo en retina—, así que el trazo es una cinta. */
const GROSOR = 0.8;

const suave = (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
const entra = (t) => t * t * (3 - 2 * t);
const acotar = (v, a, b) => Math.max(a, Math.min(b, v));

/** Color de fondo real de la sección, para que cristal y trazo fundan con ella. */
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

/**
 * `bolas`: una por parada, con su radio. `recorridos`: por agente, los índices
 * de sus paradas en orden, para el trazo. `alPintar` recibe, tras cada cuadro,
 * la posición de cada bola —para los anillos del HTML— y cuánto lleva de su
 * viaje (0 en el mapa, 1 dentro de la caja), para que la caja reaccione.
 */
export default function crearReparto(canvas, { bolas, recorridos, radio, alPintar }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  /* Cámara en perspectiva, como la del motor de la esfera (fov 18): el cristal
     se lee por cómo refracta el fondo según el ángulo de vista, y con una
     ortográfica el ángulo es el mismo en toda la bola y sale plana. Se coloca a
     la distancia que hace que un píxel del lienzo sea una unidad de escena. */
  const camera = new THREE.PerspectiveCamera(FOV, 1, 1, 100000);

  const fondo = fondoDe(canvas.parentElement);
  const base = {
    uCream: { value: COL.cream },
    uAmber: { value: COL.amber },
    uHoney: { value: COL.honey },
    uCrema: { value: COL.crema },
    uIvory: { value: COL.ivory },
    uBg: { value: fondo },
    uDark: { value: 0.0 },
    uIOR: { value: 2.4 },
    uGlow: { value: GLOW },
    uFres: { value: 0.0 },
    uSpec: { value: 0.15 },
  };

  const geo = new THREE.SphereGeometry(1, 48, 32);
  const paradas = bolas.map(() => {
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        ...base,
        uCenter: { value: new THREE.Vector3() },
        uCoreSize: { value: (CORE / 1.05) * radio },
      },
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.setScalar(radio);
    mesh.position.z = 1;
    scene.add(mesh);
    return { mesh, mat };
  });

  /* Un trazo por recorrido, por DEBAJO de las bolas: una cinta de dos vértices
     por muestra, del gris del mapa. Se apaga tiñéndose hacia el fondo. */
  const trazos = recorridos.map((indices) => {
    const geoCinta = new THREE.BufferGeometry();
    geoCinta.setAttribute("position", new THREE.BufferAttribute(new Float32Array(MUESTRAS * 2 * 3), 3));
    const idx = [];
    for (let k = 0; k < MUESTRAS - 1; k += 1) {
      const a = k * 2;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    geoCinta.setIndex(idx);
    const mat = new THREE.MeshBasicMaterial({ color: COL.trazo.clone(), side: THREE.DoubleSide });
    const cinta = new THREE.Mesh(geoCinta, mat);
    cinta.frustumCulled = false;
    scene.add(cinta);
    return { geo: geoCinta, mat, indices };
  });

  let origen = [];
  let destino = [];
  let T = 0;
  let sucio = true;
  let vivo = true;
  const posiciones = paradas.map(() => ({ x: 0, y: 0 }));
  const avances = paradas.map(() => 0);

  /** Tamaño del lienzo, de dónde sale cada bola y a dónde va, en píxeles. */
  function disponer(w, h, desde, hasta) {
    renderer.setSize(Math.max(1, w), Math.max(1, h), false);
    encuadrar(camera, Math.max(1, w), Math.max(1, h));
    origen = desde;
    destino = hasta;
    sucio = true;
  }

  /** El trazo de un recorrido por sus paradas, como lo pinta el motor: sin
      colas, Catmull-Rom con tensión 0.5. */
  function trazar(t) {
    const pts = t.indices.map((i) => new THREE.Vector3(posiciones[i].x, -posiciones[i].y, 0));
    if (pts.length < 2) return;
    const curva = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
    const muestras = curva.getPoints(MUESTRAS - 1);
    const pos = t.geo.attributes.position;
    muestras.forEach((v, k) => {
      const sig = muestras[Math.min(k + 1, MUESTRAS - 1)];
      const ant = muestras[Math.max(k - 1, 0)];
      const tx = sig.x - ant.x;
      const ty = sig.y - ant.y;
      const l = Math.hypot(tx, ty) || 1;
      const nx = (-ty / l) * GROSOR;
      const ny = (tx / l) * GROSOR;
      pos.setXYZ(k * 2, v.x + nx, v.y + ny, 0);
      pos.setXYZ(k * 2 + 1, v.x - nx, v.y - ny, 0);
    });
    pos.needsUpdate = true;
  }

  function pintar() {
    if (!vivo) return;
    if (sucio) {
      paradas.forEach((p, i) => {
        const o = origen[i];
        const d = destino[i] || o;
        if (!o) return;
        const e = suave(acotar((T - i * DESFASE) / VIAJE, 0, 1));
        avances[i] = e;
        const x = o.x + (d.x - o.x) * e;
        const y = o.y + (d.y - o.y) * e - Math.sin(Math.PI * e) * ARCO;
        p.mesh.position.set(x, -y, 1);
        p.mat.uniforms.uCenter.value.set(x, -y, 1);
        posiciones[i].x = x;
        posiciones[i].y = y;
      });
      /* Los trazos se van en el primer tramo: en cuanto las bolas empiezan a
         marcharse el recorrido ya no existe. */
      const apagado = entra(acotar(T / 0.22, 0, 1));
      trazos.forEach((t) => {
        trazar(t);
        t.mat.color.copy(COL.trazo).lerp(fondo, apagado);
      });
      renderer.render(scene, camera);
      if (alPintar) alPintar(posiciones, avances);
      sucio = false;
    }
    requestAnimationFrame(pintar);
  }
  requestAnimationFrame(pintar);

  return {
    disponer,
    /** El instante: 0 el mapa entero, 1 todas dentro de su caja. */
    avance(t) {
      const v = acotar(t, 0, 1);
      if (v === T) return;
      T = v;
      sucio = true;
    },
    destruir() {
      vivo = false;
      geo.dispose();
      paradas.forEach((p) => p.mat.dispose());
      trazos.forEach((t) => {
        t.geo.dispose();
        t.mat.dispose();
      });
      renderer.dispose();
    },
  };
}
