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
 * El ciclo de GEO como recorrido: una bola de cristal da vueltas a un anillo
 * y pasa por las tres paradas, que son bolas como las del mapa de /technology.
 *
 * Antes era un arco SVG que saltaba de tercio en tercio. Se veía como un
 * indicador de progreso, y la web no tiene indicadores: tiene bolas de
 * cristal que viajan y paradas en las que se detienen. Así que el ciclo es
 * eso: la misma bola, el mismo shader, y un anillo en vez de una curva. Cada
 * vuelta es un ciclo de medir, diseñar y crear; la bola no para nunca porque
 * el argumento de la sección es que esto no tiene final.
 *
 * La bola deja una estela dorada que se apaga hacia el fondo, y al llegar a
 * una parada la parada se hincha un momento: es el gesto de "aquí pasa algo",
 * y es lo que engancha con el texto de al lado, que se enciende a la vez.
 *
 * No tiene reloj propio: quien llama le da el instante de la vuelta (0 a 1) y
 * decide cuándo se pinta. Trabaja en PÍXELES del lienzo.
 *
 * El fondo no se lee una sola vez: la sección puede cambiar de color con el
 * componente ya montado —un cambio de tema, o la recarga en caliente al mover
 * la sección de grafito a claro— y el cristal y la estela seguirían fundiendo
 * contra el color viejo. Se vuelve a mirar cada pocos cuadros y, si ha
 * cambiado, se retiñen los tres: el vidrio, el anillo y la cola.
 */

/** Cada cuántos cuadros se vuelve a leer el color de fondo. */
const CADA_CUANTO_FONDO = 30;

/** Radio del anillo y de las bolas, en píxeles sobre un lienzo de 300. */
export const RADIO = 108;
const R_PARADA = 12;
const R_VIAJERA = 7;

/** Muestras de la cinta del anillo y de la estela. */
const MUESTRAS_ANILLO = 180;
const MUESTRAS_ESTELA = 64;

/** Medio grosor de las cintas, en píxeles. */
const GROSOR_ANILLO = 0.6;
const GROSOR_ESTELA = 1.4;

/** Cuánto anillo cubre la estela detrás de la bola, en fracción de vuelta. */
const COLA = 0.16;

/** Cuánto se hincha una parada cuando le llega la bola. */
const HINCHAZON = 0.45;

/** Color de fondo real de la sección, para que cristal y cintas fundan con ella. */
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

/** Ángulo de la fracción de vuelta `u`: arranca arriba y gira como el reloj. */
function anguloDe(u) {
  return u * Math.PI * 2 - Math.PI / 2;
}

/** La distancia más corta entre dos fracciones de vuelta. */
function distanciaCiclica(a, b) {
  const d = Math.abs(a - b) % 1;
  return Math.min(d, 1 - d);
}

/** Una cinta: dos vértices por muestra, para que el trazo tenga grosor real. */
function crearCinta(muestras, conColor) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(muestras * 2 * 3), 3));
  if (conColor) {
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(muestras * 2 * 3), 3));
  }
  const idx = [];
  for (let k = 0; k < muestras - 1; k += 1) {
    const a = k * 2;
    idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  geo.setIndex(idx);
  return geo;
}

/** Rellena la cinta `geo` con el arco de `desde` a `hasta` (fracciones de vuelta). */
function trazarArco(geo, centro, radio, desde, hasta, grosor) {
  const pos = geo.attributes.position;
  const n = pos.count / 2;
  for (let k = 0; k < n; k += 1) {
    const u = desde + ((hasta - desde) * k) / (n - 1);
    const a = anguloDe(u);
    const x = centro + radio * Math.cos(a);
    const y = centro + radio * Math.sin(a);
    /* La normal de una circunferencia es el propio radio. */
    const nx = Math.cos(a) * grosor;
    const ny = Math.sin(a) * grosor;
    pos.setXYZ(k * 2, x + nx, -(y + ny), 0);
    pos.setXYZ(k * 2 + 1, x - nx, -(y - ny), 0);
  }
  pos.needsUpdate = true;
}

/**
 * `paradas`: cuántas hay, repartidas por igual en el anillo. La escena mide
 * siempre `lado` × `lado` píxeles: es una pieza fija, no un lienzo que se
 * adapte al contenedor.
 */
export default function crearCiclo(canvas, { paradas, lado }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(lado, lado, false);

  const scene = new THREE.Scene();
  /* Cámara en perspectiva, como la del motor de la esfera (fov 18): el cristal
     se lee por cómo refracta el fondo según el ángulo de vista, y con una
     ortográfica el ángulo es el mismo en toda la bola y sale plana. Se coloca a
     la distancia que hace que un píxel del lienzo sea una unidad de escena. */
  const camera = new THREE.PerspectiveCamera(FOV, 1, 1, 100000);
  encuadrar(camera, lado, lado);

  const fondo = fondoDe(canvas.parentElement);
  const centro = lado / 2;

  /* `uBg` y `uDark` se comparten por referencia entre todas las bolas: teñir
     el fondo es cambiar estos dos objetos, y todas lo ven a la vez. */
  const base = {
    uCream: { value: COL.cream },
    uAmber: { value: COL.amber },
    uHoney: { value: COL.honey },
    uCrema: { value: COL.crema },
    uIvory: { value: COL.ivory },
    uBg: { value: fondo },
    uDark: { value: 0 },
    uIOR: { value: 2.4 },
    uGlow: { value: GLOW },
    uFres: { value: 0.0 },
    uSpec: { value: 0.15 },
  };

  const geo = new THREE.SphereGeometry(1, 48, 32);
  const bola = (radio) => {
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
    return { mesh, mat, radio };
  };

  /* El anillo: soporte, no dato. Gris del mapa, rebajado hacia el fondo para
     que no compita con la estela. */
  const anillo = crearCinta(MUESTRAS_ANILLO, false);
  const anilloMat = new THREE.MeshBasicMaterial({
    color: COL.trazo.clone(),
    side: THREE.DoubleSide,
  });
  const anilloMesh = new THREE.Mesh(anillo, anilloMat);
  anilloMesh.frustumCulled = false;
  scene.add(anilloMesh);
  trazarArco(anillo, centro, RADIO, 0, 1, GROSOR_ANILLO);

  /* La estela: oro en la cabeza, fondo en la cola. El color va por vértice
     porque la cinta es una sola malla y el degradado es a lo largo de ella. */
  const estela = crearCinta(MUESTRAS_ESTELA, true);
  const estelaMat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
  const estelaMesh = new THREE.Mesh(estela, estelaMat);
  estelaMesh.frustumCulled = false;
  estelaMesh.position.z = 0.5;
  scene.add(estelaMesh);

  /** Tiñe todo lo que funde contra el fondo: vidrio, anillo y cola. */
  function tenir(color) {
    fondo.copy(color);
    /* Sobre grafito el cristal necesita saber que está a oscuras: cambia el
       reflejo del entorno y el velo del cuerpo. */
    base.uDark.value = fondo.r * 0.299 + fondo.g * 0.587 + fondo.b * 0.114 < 0.5 ? 1 : 0;
    /* El anillo: soporte, no dato. Gris del mapa, rebajado hacia el fondo para
       que no compita con la estela. */
    anilloMat.color.copy(COL.trazo).lerp(fondo, 0.55);
    /* La estela: oro en la cabeza, fondo en la cola. Curva y no recta: la
       cola se apaga pronto y la cabeza se queda densa. */
    const col = estela.attributes.color;
    const n = col.count / 2;
    const c = new THREE.Color();
    for (let k = 0; k < n; k += 1) {
      const t = (k / (n - 1)) ** 2.2;
      c.copy(fondo).lerp(COL.amber, t);
      col.setXYZ(k * 2, c.r, c.g, c.b);
      col.setXYZ(k * 2 + 1, c.r, c.g, c.b);
    }
    col.needsUpdate = true;
  }
  tenir(fondo.clone());

  const estaciones = Array.from({ length: paradas }, () => bola(R_PARADA));
  const viajera = bola(R_VIAJERA);

  let vivo = true;
  let cuadros = 0;

  function colocar(b, x, y, escala = 1) {
    b.mesh.position.set(x, -y, 1);
    b.mesh.scale.setScalar(b.radio * escala);
    b.mat.uniforms.uCenter.value.set(x, -y, 1);
  }

  /** Pinta la vuelta en el instante `u` (0 a 1). */
  function pintar(u) {
    if (!vivo) return;
    cuadros += 1;
    if (cuadros % CADA_CUANTO_FONDO === 0) {
      const actual = fondoDe(canvas.parentElement);
      if (!actual.equals(fondo)) tenir(actual);
    }
    const a = anguloDe(u);
    colocar(viajera, centro + RADIO * Math.cos(a), centro + RADIO * Math.sin(a));
    trazarArco(estela, centro, RADIO, u - COLA, u, GROSOR_ESTELA);

    estaciones.forEach((e, i) => {
      const ui = i / paradas;
      const ai = anguloDe(ui);
      /* Campana estrecha alrededor del paso de la bola: la parada se hincha
         al recibirla y vuelve a su sitio en cuanto se va. */
      const d = distanciaCiclica(u, ui);
      const pulso = Math.exp(-((d / 0.045) ** 2));
      colocar(
        e,
        centro + RADIO * Math.cos(ai),
        centro + RADIO * Math.sin(ai),
        1 + HINCHAZON * pulso
      );
    });

    renderer.render(scene, camera);
  }

  return {
    pintar,
    destruir() {
      vivo = false;
      geo.dispose();
      anillo.dispose();
      anilloMat.dispose();
      estela.dispose();
      estelaMat.dispose();
      [...estaciones, viajera].forEach((b) => b.mat.dispose());
      renderer.dispose();
    },
  };
}
