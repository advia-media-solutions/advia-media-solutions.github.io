import * as THREE from "three";
import { COL, vertexShader, fragmentShader } from "./esferaMateria";

/**
 * La constelación en 3D: las mismas bolas del recorrido —mismo cristal dorado,
 * mismo shader— y decenas de rutas que entran, pasan por ellas y siguen.
 *
 * No usa el motor de EsferaFacetada porque aquí no hay nada que morfear: no hay
 * cuerpo, ni campo escalar, ni bolas desprendiéndose. Son seis esferas quietas
 * y unas curvas. Lo único que comparten las dos piezas es el material, que vive
 * en esferaMateria y por eso no puede desincronizarse.
 *
 * El color no se convierte: igual que en el motor, la gestión de color de three
 * se apaga antes de construir ningún THREE.Color, o el dorado del DS llega al
 * shader ya alterado.
 */
THREE.ColorManagement.enabled = false;

/* Se trabaja en unidades donde el alto visible es 2 (de -1 a 1) y el ancho, el
   que dé el aspecto. Así las posiciones se leen como fracciones del cuadro. */
const SEMI_ALTO = 1;
const FOV = 18;

/**
 * Las seis paradas. Son las mismas bolas del recorrido de arriba pero NO en las
 * mismas posiciones: aquí no se cuenta el recorrido de nadie en concreto, así
 * que repetir su perfil sugeriría que este dibujo es aquel, y es al revés — es
 * el de todos los demás. Repartidas a ojo para que ninguna quede en línea con
 * sus dos vecinas y las rutas tengan que girar de verdad para encadenarlas.
 */
const PARADAS = [
  [-2.15, 0.26],
  [-1.24, -0.46],
  [-0.22, 0.50],
  [0.66, -0.22],
  [1.58, 0.34],
  [2.36, -0.44],
];

/* Catorce, no veintiséis. Con más, todas las rutas cruzan el cuadro entero y
   el dibujo deja de decir "estas paradas se repiten" para decir "aquí hay un
   lío": es un tendido de cables, no un mapa. El argumento se ve con menos. */
const RUTAS = 14;

/* Cuánto de la curva se disuelve en cada punta. Las rutas no empiezan ni
   acaban aquí —vienen de antes y siguen después—, y cortarlas a cuchillo en el
   borde llenaba el cuadro de cabos sueltos. */
const DESVANECIDO = 0.26;

/* La ruta se dibuja en el color de texto de la superficie, no en marfil fijo:
   sobre marfil, marfil sobre marfil es invisible. Se decide por luminancia del
   fondo real, así la misma escena sirve en grafito y en claro. */
function trazoPara(fondo) {
  const luz = 0.2126 * fondo.r + 0.7152 * fondo.g + 0.0722 * fondo.b;
  return luz > 0.5 ? COL.graphite : COL.ivory;
}

/** Color de fondo real de la sección, para desvanecer las rutas CONTRA él. */
function fondoDe(nodo) {
  for (let el = nodo; el; el = el.parentElement) {
    const c = getComputedStyle(el).backgroundColor;
    const m = c && c.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
    if (m && (m[4] === undefined || Number(m[4]) > 0.9)) {
      return new THREE.Color(m[1] / 255, m[2] / 255, m[3] / 255);
    }
  }
  return new THREE.Color("#292929");
}

/** LCG de semilla fija: el dibujo tiene que ser el mismo en cada carga. */
function dado(semilla) {
  let s = semilla;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

export default function crearConstelacion(canvas) {
  const contenedor = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  /* Ángulo cerrado, como en el motor: las paradas de los extremos caen muy
     fuera del eje óptico, y ahí una esfera se PROYECTA como elipse. A 18° la
     elongación baja del 11 % al 3,5 % y deja de verse. */
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 80);
  camera.position.set(0, 0, SEMI_ALTO / Math.tan((FOV * Math.PI) / 360));

  /* ── Las bolas ─────────────────────────────────────────────────────────── */
  const base = {
    uCream: { value: COL.cream },
    uAmber: { value: COL.amber },
    uHoney: { value: COL.honey },
    uCrema: { value: COL.crema },
    uIvory: { value: COL.ivory },
    uBg: { value: COL.graphite },
    /* Modo claro aunque el fondo sea grafito. Con uDark en 1 el shader mete su
       ambiente oscuro y la bola sale naranja maciza: se pierde el crema de los
       lóbulos, que es justo lo que la hace reconocible como la bola del
       recorrido de arriba. uBg en grafito basta para que el borde de cristal
       funda con la sección. */
    uDark: { value: 0.0 },
    uIOR: { value: 2.4 },
    uGlow: { value: 1.6 },
    uFres: { value: 0.0 },
    uSpec: { value: 0.15 },
  };

  const trafico = PARADAS.map(() => 0);
  const geoBola = new THREE.SphereGeometry(1, 48, 32);
  const bolas = PARADAS.map(([x, y]) => {
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        ...base,
        uCenter: { value: new THREE.Vector3(x, y, 0) },
        uCoreSize: { value: 1 },
      },
    });
    const mesh = new THREE.Mesh(geoBola, mat);
    mesh.position.set(x, y, 0);
    scene.add(mesh);
    return { mesh, mat };
  });

  /* ── Las rutas ─────────────────────────────────────────────────────────── */
  /* Cada una elige SU subconjunto de paradas, en orden. Es lo único que hace
     que dos rutas sean distintas de verdad: si todas visitaran las seis, sería
     la misma curva repetida. Entre parada y parada se desvían poco —lo justo
     para separarse—, porque con desvíos grandes la curva se arruga y deja de
     leerse como un camino. */
  const azar = dado(20260828);
  const fondo = fondoDe(contenedor);
  const trazo = trazoPara(fondo);
  base.uBg.value = fondo;
  const hilos = [];
  for (let r = 0; r < RUTAS; r += 1) {
    /* Un tramo del mapa, no el mapa entero: se arranca en una parada y se
       encadenan dos o tres más, saltándose alguna de vez en cuando. Rutas
       cortas y solapadas dicen lo mismo que rutas largas y no se enredan. */
    const visita = [];
    let i = Math.floor(azar() * (PARADAS.length - 2));
    const largo = 2 + Math.floor(azar() * 2.99);
    while (i < PARADAS.length && visita.length < largo) {
      visita.push(i);
      i += azar() < 0.25 ? 2 : 1;
    }
    if (visita.length < 2) visita.push(Math.min(PARADAS.length - 1, visita[0] + 1));
    visita.forEach((k) => { trafico[k] += 1; });

    const primera = PARADAS[visita[0]];
    const ultima = PARADAS[visita[visita.length - 1]];
    /* Entra y sale JUNTO a su primera y su última parada, no en los bordes del
       cuadro: así una ruta que empieza en la cuarta parada no arrastra una
       línea por delante de las tres anteriores. */
    const puntos = [
      new THREE.Vector3(primera[0] - 0.85, primera[1] + (azar() - 0.5) * 0.7, 0),
    ];
    let previo = puntos[0];
    visita.forEach((k) => {
      const [px, py] = PARADAS[k];
      puntos.push(new THREE.Vector3(
        (previo.x + px) / 2,
        (previo.y + py) / 2 + (azar() - 0.5) * 0.34,
        0
      ));
      const p = new THREE.Vector3(px, py, 0);
      puntos.push(p);
      previo = p;
    });
    puntos.push(new THREE.Vector3(ultima[0] + 0.85, ultima[1] + (azar() - 0.5) * 0.7, 0));

    const curva = new THREE.CatmullRomCurve3(puntos, false, "catmullrom", 0.5);
    const muestras = curva.getPoints(200);
    const geo = new THREE.BufferGeometry().setFromPoints(muestras);

    /* El desvanecido va en color de vértice, no en alfa: una línea no admite
       alfa por vértice, pero sí color, y sobre un fondo plano teñir hacia el
       fondo se ve igual que desaparecer. */
    const tinte = new THREE.Color();
    const colores = new Float32Array(muestras.length * 3);
    muestras.forEach((_, k) => {
      const u = k / (muestras.length - 1);
      const peso = Math.min(1, Math.min(u, 1 - u) / DESVANECIDO);
      tinte.copy(fondo).lerp(trazo, peso);
      colores[k * 3] = tinte.r;
      colores[k * 3 + 1] = tinte.g;
      colores[k * 3 + 2] = tinte.b;
    });
    geo.setAttribute("color", new THREE.BufferAttribute(colores, 3));

    const mat = new THREE.LineDashedMaterial({
      vertexColors: true,
      dashSize: 0.055,
      gapSize: 0.045,
      transparent: true,
      opacity: 0,
    });
    const linea = new THREE.Line(geo, mat);
    linea.computeLineDistances();
    scene.add(linea);
    hilos.push(mat);
  }

  /* El tamaño de cada bola sale del tráfico: el dibujo no dice qué paradas
     pesan más, lo demuestra. */
  const tope = Math.max(...trafico, 1);
  bolas.forEach((b, i) => {
    const radio = 0.075 + (trafico[i] / tope) * 0.055;
    b.mesh.scale.setScalar(radio);
    /* El halo del núcleo se mide en espacio de mundo, así que escala con la
       bola: si no, una bola pequeña cabe entera dentro del halo y se aplana en
       una mancha ámbar sin degradado. */
    b.mat.uniforms.uCoreSize.value = (1.6 / 1.05) * radio;
  });

  /* ── Ciclo ─────────────────────────────────────────────────────────────── */
  let vivo = true;
  let progreso = 0;

  function resize() {
    const w = contenedor.clientWidth || 1;
    const h = contenedor.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(contenedor);
  resize();

  function pintar() {
    if (!vivo) return;
    /* Las rutas se van superponiendo con el scroll, escalonadas. Las bolas no:
       son lo que ya conoces de la sección anterior y están ahí desde el
       principio. */
    hilos.forEach((mat, i) => {
      const desde = (i / hilos.length) * 0.72;
      const t = Math.min(1, Math.max(0, (progreso - desde) / 0.22));
      mat.opacity = t * 0.55;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(pintar);
  }
  requestAnimationFrame(pintar);

  return {
    /** 0 → ninguna ruta; 1 → todas. */
    avance(t) {
      progreso = Math.min(1, Math.max(0, t));
    },
    destruir() {
      vivo = false;
      ro.disconnect();
      geoBola.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      renderer.dispose();
    },
  };
}
