import * as THREE from "three";
import { COL, vertexShader, fragmentShader } from "./esferaMateria";

/* El shader viene de un prototipo sobre three r128, donde el color se escribía
   tal cual. Desde r152 three convierte los colores a espacio lineal al
   construirlos y la salida a sRGB al pintar: el mismo código sale desplazado y
   quemado — ese naranja más naranja que el propio ámbar (el verde del #FAAD33
   cae de 0.678 a 0.418 y el azul de 0.200 a 0.033).

   Va aquí arriba, a nivel de módulo, y no dentro de la función: la conversión
   ocurre al CONSTRUIR cada THREE.Color, así que apagarla después de haber
   creado la paleta no deshace nada. Ese fue el primer intento y por eso seguía
   viéndose naranja. */
/* La gestión de color se apaga en esferaMateria.js, que es donde se crean los
   colores y el primer módulo que se evalúa. Apagarla aquí llegaba tarde. */

/* Distancias de cámara del prototipo: la de reposo y a la que se aleja cuando
   el recorrido se despliega. Viven aquí arriba porque el encuadre (sección 5)
   las necesita antes de que se declare el timeline del recorrido. */
const CAM_BASE_Z = 5.6;
const CAM_FAR_Z = 9.8;

/* Solape del recorrido: la bola i+1 arranca al 55 % de la i. Vive aquí arriba
   porque de él sale la altura de cada parada, y eso se calcula antes de que se
   declare el timeline. */
const JOURNEY_OVERLAP = 0.55;

/**
 * ADVIA · Esfera facetada — elemento de marca en 3D real.
 *
 * Doce esferas fusionadas en una superficie única (surface-nets sobre un campo
 * de metaballs en vértices de icosaedro), vista como cristal con el núcleo
 * dorado en el centro. Portado del prototipo `advia-esfera-facetada.html`.
 *
 * Lo único que cambia respecto del prototipo es QUIÉN manda en la transición.
 * Allí la gobernaba un reloj (`INTRO_MS = 7000`); aquí la gobierna el scroll:
 * `motor.progreso(t)` con t en [0,1] recorre las tres claves de forma.
 *
 * Las tres claves son las del prototipo, y son las tres paradas de la sección:
 *   t=0.0  corona 0.45 · fusión 2.3   → un rol
 *   t=0.42 corona 0.52 · fusión 3.0   → unas herramientas
 *   t=1.0  corona 0.63 · fusión 6.0   → el recorrido recogido
 *
 * Regenerar la superficie entera cuesta ~1s, así que se precalculan los tres
 * campos escalares una vez y cada frame solo interpola y extrae la banda de
 * celdas activas. Eso es lo que permite que siga el dedo sin tirones.
 */
export default function crearEsfera(
  canvas,
  {
    fondo = "#FCFDFD",
    corrimiento = 0,
    modo = "pagina",
    /* Cuántas bolas se desprenden. El cuerpo tiene doce por construcción, pero
       un relato de cinco paradas solo necesita cinco: las demás se quedan
       pegadas y el cuerpo sigue existiendo al final, en vez de desintegrarse
       soltando bolas que no van a ninguna parte. */
    sueltas = 12,
    /* Dónde se coloca el cuerpo dentro del lienzo, en fracción de su caja.
       Por defecto, centrado. */
    ancla = null,
    /* Tamaño del cuerpo respecto al encuadre. Escala solo la esfera grande: las
       bolas ya desprendidas conservan el suyo, porque su tamaño lo manda el
       recorrido y no de dónde salieron. */
    escalaCuerpo = 1,
    /* Tamaño de las bolas ya colocadas y del grosor del trazo. Van juntas a
       propósito: bolas y línea son un solo dibujo, y encoger unas sin la otra
       cambia la proporción que se aprobó. */
    escalaSuelta = 1,
    /* Intensidad del núcleo. Por defecto la de la paleta (P.glow). Se puede
       bajar por escena: con el cuerpo pequeño, el mismo brillo ocupa una
       fracción mucho mayor de la esfera y la apaga en una mancha. */
    nucleo = null,
    /* Píxeles que el lienzo sobresale por cada lado de la caja útil.
       WebGL no dibuja fuera del canvas: si el canvas termina donde termina la
       sección, la esfera se corta por arriba y por abajo justo cuando se le
       desprenden bolas. La solución es un canvas MÁS GRANDE que la caja —el
       sangrado— y decirle al motor cuánto sobra, para que siga componiendo
       contra la caja útil y el dibujo no se estire ni se descoloque. */
    sangrado = 0,
  } = {}
) {
  const contenedor = canvas.parentElement;

  /* ── 0 · Parámetros vivos ───────────────────────────────────────────────── */
  const DEFAULTS = {
    R: 0.40,        // radio de cada esfera pequeña
    shell: 0.63,    // radio de la corona de centros
    fuse: 6.0,      // exponente h del campo (r²/d²)^h
    ior: 2.40,      // índice de refracción
    fres: 0.00,     // reflejo Fresnel de borde
    spec: 0.15,     // brillos especulares
    /* Tamaño del halo del núcleo, RELATIVO al tamaño de la esfera: quien lo
       usa lo multiplica por su escala (el cuerpo por `escalaCuerpo`, cada bola
       suelta por su radio). Así este único número gobierna la proporción en las
       tres piezas de la web —home, navegación activa y tecnología— sin que la
       pequeña quede con un halo desproporcionado. Subido 1.10 → 1.45 → 1.60. */
    core: 1.50,
    glow: 1.10,     // intensidad del núcleo
    speed: 0.20     // rad/s de rotación
  };
  const P = Object.assign({}, DEFAULTS);

  // Claves de la transición de entrada (el resto de valores quedan fijos).
  // La última clave es el estado final vigente (P.shell / P.fuse).
  const INTRO_KEYS = [
    { shell: 0.45, fuse: 2.3 },
    { shell: 0.52, fuse: 3.0 }
  ];
  const INTRO_SPLIT = 0.42;      // 42 % del tiempo para el primer tramo
  const INTRO_MS = 7000;

  /* ── 1 · Campo escalar: 12 metaballs en vértices de icosaedro ───────────── */
  const PHI = (1 + Math.sqrt(5)) / 2;
  const RAW = [
    [-1, PHI, 0],[1, PHI, 0],[-1,-PHI, 0],[1,-PHI, 0],
    [0,-1, PHI],[0, 1, PHI],[0,-1,-PHI],[0, 1,-PHI],
    [ PHI, 0,-1],[ PHI, 0, 1],[-PHI, 0,-1],[-PHI, 0, 1]
  ];
  let BALLS = [], R2 = 0, H_EXP = 3;

  function setFieldParams(r, shell, fuse){
    R2 = r * r;
    H_EXP = fuse;
    BALLS = RAW.map(v => {
      const l = Math.hypot(v[0], v[1], v[2]);
      return [v[0]/l*shell, v[1]/l*shell, v[2]/l*shell];
    });
  }

  // pow aproximado (Schraudolph) para el llenado masivo del grid: ~5× más
  // rápido que Math.pow con error < 2 % — invisible en la iso-superficie.
  const _pf = new Float32Array(1), _pu = new Uint32Array(_pf.buffer);
  function fpow(t, h){
    _pf[0] = t;
    _pu[0] = (h * (_pu[0] - 1064866805) + 1064866805) >>> 0;
    return _pf[0];
  }

  // f(p) = Σ (R²/d²)^h  — versión rápida para el grid
  function field(x, y, z){
    let s = 0;
    for (let i = 0; i < BALLS.length; i++){
      const b = BALLS[i];
      const dx = x-b[0], dy = y-b[1], dz = z-b[2];
      const d2 = dx*dx + dy*dy + dz*dz + 1e-9;
      s += fpow(R2 / d2, H_EXP);
      if (s > 40.0) return s;
    }
    return s;
  }
  // ∇fᵢ = -2h·fᵢ/d² · (p-c) → normales suaves (pow exacto, solo vértices)
  function gradient(x, y, z, out){
    let gx = 0, gy = 0, gz = 0;
    for (let i = 0; i < BALLS.length; i++){
      const b = BALLS[i];
      const dx = x-b[0], dy = y-b[1], dz = z-b[2];
      const d2 = dx*dx + dy*dy + dz*dz + 1e-9;
      const k = -2 * H_EXP * Math.pow(R2 / d2, H_EXP) / d2;
      gx += k*dx; gy += k*dy; gz += k*dz;
    }
    const l = Math.hypot(gx, gy, gz) || 1;
    out[0] = -gx/l; out[1] = -gy/l; out[2] = -gz/l;
  }

  /* ── 2 · Surface nets: reconstrucción completa (sliders) ────────────────── */
  const CORN = [[0,0,0],[1,0,0],[0,1,0],[1,1,0],[0,0,1],[1,0,1],[0,1,1],[1,1,1]];
  const EDGES = [[0,1],[2,3],[4,5],[6,7],[0,2],[1,3],[4,6],[5,7],[0,4],[1,5],[2,6],[3,7]];

  function buildBlobGeometry(N){
    setFieldParams(P.R, P.shell, P.fuse);
    const EXT = P.shell + P.R + 0.18;
    const MIN = -EXT;
    const H = (2 * EXT) / (N - 1);
    const ISO = 1.0;

    const grid = new Float32Array(N*N*N);
    let p = 0;
    for (let k = 0; k < N; k++){
      const z = MIN + k*H;
      for (let j = 0; j < N; j++){
        const y = MIN + j*H;
        for (let i = 0; i < N; i++){
          grid[p++] = field(MIN + i*H, y, z) - ISO;
        }
      }
    }
    const idx = (i,j,k) => i + N*(j + N*k);

    const cellVert = new Int32Array((N-1)*(N-1)*(N-1)).fill(-1);
    const cidx = (i,j,k) => i + (N-1)*(j + (N-1)*k);
    const positions = [];

    for (let k = 0; k < N-1; k++)
    for (let j = 0; j < N-1; j++)
    for (let i = 0; i < N-1; i++){
      const v = new Float32Array(8);
      let mask = 0;
      for (let c = 0; c < 8; c++){
        v[c] = grid[idx(i+CORN[c][0], j+CORN[c][1], k+CORN[c][2])];
        if (v[c] > 0) mask |= (1 << c);
      }
      if (mask === 0 || mask === 255) continue;

      let sx = 0, sy = 0, sz = 0, n = 0;
      for (let e = 0; e < 12; e++){
        const a = EDGES[e][0], b = EDGES[e][1];
        if ((v[a] > 0) === (v[b] > 0)) continue;
        const t = v[a] / (v[a] - v[b]);
        sx += CORN[a][0] + t*(CORN[b][0]-CORN[a][0]);
        sy += CORN[a][1] + t*(CORN[b][1]-CORN[a][1]);
        sz += CORN[a][2] + t*(CORN[b][2]-CORN[a][2]);
        n++;
      }
      cellVert[cidx(i,j,k)] = positions.length / 3;
      positions.push(MIN + (i + sx/n)*H, MIN + (j + sy/n)*H, MIN + (k + sz/n)*H);
    }

    const indices = [];
    function quad(a, b, c, d, flip){
      if (a < 0 || b < 0 || c < 0 || d < 0) return;
      if (flip) indices.push(a,b,c, a,c,d);
      else      indices.push(a,d,c, a,c,b);
    }
    for (let k = 0; k < N-1; k++)
    for (let j = 0; j < N-1; j++)
    for (let i = 0; i < N-1; i++){
      const g0 = grid[idx(i,j,k)];
      if (j > 0 && k > 0){
        if ((g0 > 0) !== (grid[idx(i+1,j,k)] > 0))
          quad(cellVert[cidx(i,j,k)], cellVert[cidx(i,j-1,k)],
               cellVert[cidx(i,j-1,k-1)], cellVert[cidx(i,j,k-1)], g0 > 0);
      }
      if (i > 0 && k > 0){
        if ((g0 > 0) !== (grid[idx(i,j+1,k)] > 0))
          quad(cellVert[cidx(i,j,k)], cellVert[cidx(i,j,k-1)],
               cellVert[cidx(i-1,j,k-1)], cellVert[cidx(i-1,j,k)], g0 > 0);
      }
      if (i > 0 && j > 0){
        if ((g0 > 0) !== (grid[idx(i,j,k+1)] > 0))
          quad(cellVert[cidx(i,j,k)], cellVert[cidx(i-1,j,k)],
               cellVert[cidx(i-1,j-1,k)], cellVert[cidx(i,j-1,k)], g0 > 0);
      }
    }

    const normals = new Float32Array(positions.length);
    const g = [0,0,0];
    for (let t = 0; t < positions.length; t += 3){
      gradient(positions[t], positions[t+1], positions[t+2], g);
      normals[t] = g[0]; normals[t+1] = g[1]; normals[t+2] = g[2];
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('normal',   new THREE.BufferAttribute(normals, 3));
    geo.setIndex(indices);
    return geo;
  }

  /* ── 3 · Motor de morphing por interpolación de campos ──────────────────── */
  const morph = {
    ready: false, cacheKey: '',
    N: 96, MIN: 0, H: 0,
    grids: null, keys: null, keyR: 0,
    active: null,
    cellVert: null, cellMask: null, stampArr: null, gen: 0,
    cornOff: null,          // offsets planos de las 8 esquinas en el grid
    pos: null, nor: null, indexArr: null,
    geo: null, vertCount: 0, idxCount: 0
  };

  function makeKeyGrid(shell, fuse, N, MIN, H){
    setFieldParams(morph.keyR, shell, fuse);
    const grid = new Float32Array(N*N*N);
    let p = 0;
    for (let k = 0; k < N; k++){
      const z = MIN + k*H;
      for (let j = 0; j < N; j++){
        const y = MIN + j*H;
        for (let i = 0; i < N; i++){
          grid[p++] = field(MIN + i*H, y, z) - 1.0;
        }
      }
    }
    return grid;
  }

  function prepMorph(){
    const N = morph.N;
    const keys = [ INTRO_KEYS[0], INTRO_KEYS[1], { shell: P.shell, fuse: P.fuse } ];
    morph.keyR = P.R;

    const maxShell = Math.max(keys[0].shell, keys[1].shell, keys[2].shell);
    const EXT = maxShell + P.R + 0.18;
    morph.MIN = -EXT;
    morph.H = (2 * EXT) / (N - 1);

    morph.grids = keys.map(k => makeKeyGrid(k.shell, k.fuse, N, morph.MIN, morph.H));
    morph.keys = keys;

    // min/max por punto entre las 3 claves (el valor interpolado siempre cae ahí)
    const [g0, g1, g2] = morph.grids;
    const NP = N*N*N;
    const gLo = new Float32Array(NP), gHi = new Float32Array(NP);
    for (let p = 0; p < NP; p++){
      const a = g0[p], b = g1[p], c = g2[p];
      let lo = a < b ? a : b; if (c < lo) lo = c;
      let hi = a > b ? a : b; if (c > hi) hi = c;
      gLo[p] = lo; gHi[p] = hi;
    }

    const O = morph.cornOff = new Int32Array([0, 1, N, N+1, N*N, N*N+1, N*N+N, N*N+N+1]);

    // Celdas potencialmente activas en algún punto del morph (conservador)
    const active = [];
    for (let k = 0; k < N-1; k++)
    for (let j = 0; j < N-1; j++){
      const row = N*(j + N*k);
      for (let i = 0; i < N-1; i++){
        const p = i + row;
        let lo = gLo[p], hi = gHi[p], t;
        t = gLo[p+O[1]]; if (t < lo) lo = t;  t = gHi[p+O[1]]; if (t > hi) hi = t;
        t = gLo[p+O[2]]; if (t < lo) lo = t;  t = gHi[p+O[2]]; if (t > hi) hi = t;
        t = gLo[p+O[3]]; if (t < lo) lo = t;  t = gHi[p+O[3]]; if (t > hi) hi = t;
        t = gLo[p+O[4]]; if (t < lo) lo = t;  t = gHi[p+O[4]]; if (t > hi) hi = t;
        t = gLo[p+O[5]]; if (t < lo) lo = t;  t = gHi[p+O[5]]; if (t > hi) hi = t;
        t = gLo[p+O[6]]; if (t < lo) lo = t;  t = gHi[p+O[6]]; if (t > hi) hi = t;
        t = gLo[p+O[7]]; if (t < lo) lo = t;  t = gHi[p+O[7]]; if (t > hi) hi = t;
        if (lo < 0 && hi > 0) active.push(i + (N-1)*(j + (N-1)*k));
      }
    }
    morph.active = Int32Array.from(active);

    const nA = morph.active.length;
    const NC3 = (N-1)*(N-1)*(N-1);
    morph.cellVert = new Int32Array(NC3);
    morph.cellMask = new Uint8Array(NC3);
    morph.stampArr = new Int32Array(NC3);
    morph.gen = 0;
    morph.pos = new Float32Array(nA * 3);
    morph.nor = new Float32Array(nA * 3);
    morph.indexArr = new Uint32Array(nA * 18);

    const geo = new THREE.BufferGeometry();
    const pa = new THREE.BufferAttribute(morph.pos, 3);
    const na = new THREE.BufferAttribute(morph.nor, 3);
    const ia = new THREE.BufferAttribute(morph.indexArr, 1);
    pa.setUsage(THREE.DynamicDrawUsage);
    na.setUsage(THREE.DynamicDrawUsage);
    ia.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute('position', pa);
    geo.setAttribute('normal', na);
    geo.setIndex(ia);
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0,0,0), EXT * 1.6);
    morph.geo = geo;
    morph.ready = true;

    // pre-calentar el JIT con un par de extracciones desechables
    extractMorph(0.01); extractMorph(0.99);
  }

  // t global [0,1] → (grid A, grid B, factor) según el tramo
  function introWeights(t){
    if (t <= INTRO_SPLIT){
      const s = t / INTRO_SPLIT;
      return [0, 1, s*s*(3-2*s)];
    }
    const s = (t - INTRO_SPLIT) / (1 - INTRO_SPLIT);
    return [1, 2, s*s*(3-2*s)];
  }

  // Muestreo trilineal del campo interpolado en coords de grid (para normales)
  function sampleLerp(gA, gB, f, gx, gy, gz, N){
    const i = gx|0, j = gy|0, k = gz|0;
    const fx = gx-i, fy = gy-j, fz = gz-k;
    const p = i + N*(j + N*k), NN = N*N;
    const v000 = gA[p]        + f*(gB[p]        - gA[p]);
    const v100 = gA[p+1]      + f*(gB[p+1]      - gA[p+1]);
    const v010 = gA[p+N]      + f*(gB[p+N]      - gA[p+N]);
    const v110 = gA[p+N+1]    + f*(gB[p+N+1]    - gA[p+N+1]);
    const v001 = gA[p+NN]     + f*(gB[p+NN]     - gA[p+NN]);
    const v101 = gA[p+NN+1]   + f*(gB[p+NN+1]   - gA[p+NN+1]);
    const v011 = gA[p+NN+N]   + f*(gB[p+NN+N]   - gA[p+NN+N]);
    const v111 = gA[p+NN+N+1] + f*(gB[p+NN+N+1] - gA[p+NN+N+1]);
    const a = v000 + fx*(v100-v000), b = v010 + fx*(v110-v010);
    const c = v001 + fx*(v101-v001), d = v011 + fx*(v111-v011);
    const e = a + fy*(b-a), g = c + fy*(d-c);
    return e + fz*(g-e);
  }

  function extractMorph(t){
    const N = morph.N, NC = N - 1, NN = N*N;
    const W = introWeights(t);
    const gA = morph.grids[W[0]], gB = morph.grids[W[1]], f = W[2];
    const MIN = morph.MIN, H = morph.H;
    const active = morph.active, nAct = active.length;
    const cellVert = morph.cellVert, cellMask = morph.cellMask, stampArr = morph.stampArr;
    const gen = ++morph.gen;
    const pos = morph.pos;
    const O = morph.cornOff;
    let nv = 0;

    /* Pasada 1: vértice + máscara por celda activa (desenrollado) */
    for (let a = 0; a < nAct; a++){
      const cid = active[a];
      const i = cid % NC, jk = (cid / NC)|0;
      const j = jk % NC, k = (jk / NC)|0;
      const p = i + N*(j + N*k);

      const c0 = gA[p]        + f*(gB[p]        - gA[p]);
      const c1 = gA[p+O[1]]   + f*(gB[p+O[1]]   - gA[p+O[1]]);
      const c2 = gA[p+O[2]]   + f*(gB[p+O[2]]   - gA[p+O[2]]);
      const c3 = gA[p+O[3]]   + f*(gB[p+O[3]]   - gA[p+O[3]]);
      const c4 = gA[p+O[4]]   + f*(gB[p+O[4]]   - gA[p+O[4]]);
      const c5 = gA[p+O[5]]   + f*(gB[p+O[5]]   - gA[p+O[5]]);
      const c6 = gA[p+O[6]]   + f*(gB[p+O[6]]   - gA[p+O[6]]);
      const c7 = gA[p+O[7]]   + f*(gB[p+O[7]]   - gA[p+O[7]]);

      let mask = 0;
      if (c0 > 0) mask |= 1;   if (c1 > 0) mask |= 2;
      if (c2 > 0) mask |= 4;   if (c3 > 0) mask |= 8;
      if (c4 > 0) mask |= 16;  if (c5 > 0) mask |= 32;
      if (c6 > 0) mask |= 64;  if (c7 > 0) mask |= 128;
      if (mask === 0 || mask === 255) continue;

      let sx = 0, sy = 0, sz = 0, n = 0, tt;
      /* aristas X: 0-1, 2-3, 4-5, 6-7 */
      if ((c0>0)!==(c1>0)){ tt=c0/(c0-c1); sx+=tt;   sy+=0;    sz+=0;    n++; }
      if ((c2>0)!==(c3>0)){ tt=c2/(c2-c3); sx+=tt;   sy+=1;    sz+=0;    n++; }
      if ((c4>0)!==(c5>0)){ tt=c4/(c4-c5); sx+=tt;   sy+=0;    sz+=1;    n++; }
      if ((c6>0)!==(c7>0)){ tt=c6/(c6-c7); sx+=tt;   sy+=1;    sz+=1;    n++; }
      /* aristas Y: 0-2, 1-3, 4-6, 5-7 */
      if ((c0>0)!==(c2>0)){ tt=c0/(c0-c2); sx+=0;    sy+=tt;   sz+=0;    n++; }
      if ((c1>0)!==(c3>0)){ tt=c1/(c1-c3); sx+=1;    sy+=tt;   sz+=0;    n++; }
      if ((c4>0)!==(c6>0)){ tt=c4/(c4-c6); sx+=0;    sy+=tt;   sz+=1;    n++; }
      if ((c5>0)!==(c7>0)){ tt=c5/(c5-c7); sx+=1;    sy+=tt;   sz+=1;    n++; }
      /* aristas Z: 0-4, 1-5, 2-6, 3-7 */
      if ((c0>0)!==(c4>0)){ tt=c0/(c0-c4); sx+=0;    sy+=0;    sz+=tt;   n++; }
      if ((c1>0)!==(c5>0)){ tt=c1/(c1-c5); sx+=1;    sy+=0;    sz+=tt;   n++; }
      if ((c2>0)!==(c6>0)){ tt=c2/(c2-c6); sx+=0;    sy+=1;    sz+=tt;   n++; }
      if ((c3>0)!==(c7>0)){ tt=c3/(c3-c7); sx+=1;    sy+=1;    sz+=tt;   n++; }

      pos[nv*3]   = MIN + (i + sx/n)*H;
      pos[nv*3+1] = MIN + (j + sy/n)*H;
      pos[nv*3+2] = MIN + (k + sz/n)*H;
      cellVert[cid] = nv;
      cellMask[cid] = mask;
      stampArr[cid] = gen;
      nv++;
    }

    /* Pasada 2: quads — cada arista con cruce la emite su celda origen */
    const iarr = morph.indexArr;
    const dJ = NC, dK = NC*NC;
    let ni = 0;
    for (let a = 0; a < nAct; a++){
      const cid = active[a];
      if (stampArr[cid] !== gen) continue;
      const mask = cellMask[cid];
      const i = cid % NC, jk = (cid / NC)|0;
      const j = jk % NC, k = (jk / NC)|0;
      const b0 = mask & 1;

      /* arista +X (esq 0-1): celdas (i,j,k)(i,j-1,k)(i,j-1,k-1)(i,j,k-1) */
      if (j > 0 && k > 0 && b0 !== ((mask >> 1) & 1)){
        const q0 = cid, q1 = cid - dJ, q2 = cid - dJ - dK, q3 = cid - dK;
        if (stampArr[q1] === gen && stampArr[q2] === gen && stampArr[q3] === gen){
          const va = cellVert[q0], vb = cellVert[q1], vc = cellVert[q2], vd = cellVert[q3];
          if (b0){ iarr[ni++]=va; iarr[ni++]=vb; iarr[ni++]=vc; iarr[ni++]=va; iarr[ni++]=vc; iarr[ni++]=vd; }
          else   { iarr[ni++]=va; iarr[ni++]=vd; iarr[ni++]=vc; iarr[ni++]=va; iarr[ni++]=vc; iarr[ni++]=vb; }
        }
      }
      /* arista +Y (esq 0-2): celdas (i,j,k)(i,j,k-1)(i-1,j,k-1)(i-1,j,k) */
      if (i > 0 && k > 0 && b0 !== ((mask >> 2) & 1)){
        const q0 = cid, q1 = cid - dK, q2 = cid - 1 - dK, q3 = cid - 1;
        if (stampArr[q1] === gen && stampArr[q2] === gen && stampArr[q3] === gen){
          const va = cellVert[q0], vb = cellVert[q1], vc = cellVert[q2], vd = cellVert[q3];
          if (b0){ iarr[ni++]=va; iarr[ni++]=vb; iarr[ni++]=vc; iarr[ni++]=va; iarr[ni++]=vc; iarr[ni++]=vd; }
          else   { iarr[ni++]=va; iarr[ni++]=vd; iarr[ni++]=vc; iarr[ni++]=va; iarr[ni++]=vc; iarr[ni++]=vb; }
        }
      }
      /* arista +Z (esq 0-4): celdas (i,j,k)(i-1,j,k)(i-1,j-1,k)(i,j-1,k) */
      if (i > 0 && j > 0 && b0 !== ((mask >> 4) & 1)){
        const q0 = cid, q1 = cid - 1, q2 = cid - 1 - dJ, q3 = cid - dJ;
        if (stampArr[q1] === gen && stampArr[q2] === gen && stampArr[q3] === gen){
          const va = cellVert[q0], vb = cellVert[q1], vc = cellVert[q2], vd = cellVert[q3];
          if (b0){ iarr[ni++]=va; iarr[ni++]=vb; iarr[ni++]=vc; iarr[ni++]=va; iarr[ni++]=vc; iarr[ni++]=vd; }
          else   { iarr[ni++]=va; iarr[ni++]=vd; iarr[ni++]=vc; iarr[ni++]=va; iarr[ni++]=vc; iarr[ni++]=vb; }
        }
      }
    }

    /* Pasada 3: normales por diferencias centrales del campo interpolado */
    const nor = morph.nor;
    const inv = 1 / H, lim = N - 1.001;
    for (let v = 0; v < nv; v++){
      let gx = (pos[v*3]   - MIN) * inv;
      let gy = (pos[v*3+1] - MIN) * inv;
      let gz = (pos[v*3+2] - MIN) * inv;
      if (gx < 1) gx = 1; else if (gx > lim-1) gx = lim-1;
      if (gy < 1) gy = 1; else if (gy > lim-1) gy = lim-1;
      if (gz < 1) gz = 1; else if (gz > lim-1) gz = lim-1;
      const nx = sampleLerp(gA,gB,f, gx+1,gy,gz,N) - sampleLerp(gA,gB,f, gx-1,gy,gz,N);
      const ny = sampleLerp(gA,gB,f, gx,gy+1,gz,N) - sampleLerp(gA,gB,f, gx,gy-1,gz,N);
      const nz = sampleLerp(gA,gB,f, gx,gy,gz+1,N) - sampleLerp(gA,gB,f, gx,gy,gz-1,N);
      const l = Math.hypot(nx, ny, nz) || 1;
      nor[v*3] = -nx/l; nor[v*3+1] = -ny/l; nor[v*3+2] = -nz/l;
    }

    morph.vertCount = nv;
    morph.idxCount = ni;
  }

  function commitMorphFrame(){
    const geo = morph.geo;
    geo.attributes.position.needsUpdate = true;
    geo.attributes.normal.needsUpdate = true;
    geo.index.needsUpdate = true;
    geo.setDrawRange(0, morph.idxCount);
  }

  // Al terminar (t=1 → campo == clave final exacta): normales analíticas finas
  function finalizeMorphNormals(){
    setFieldParams(P.R, P.shell, P.fuse);
    const g = [0,0,0], pos = morph.pos, nor = morph.nor;
    for (let v = 0; v < morph.vertCount; v++){
      gradient(pos[v*3], pos[v*3+1], pos[v*3+2], g);
      nor[v*3] = g[0]; nor[v*3+1] = g[1]; nor[v*3+2] = g[2];
    }
    morph.geo.attributes.normal.needsUpdate = true;
  }

  /* ── 5 · Escena ─────────────────────────────────────────────────────────── */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  /* Ángulo cerrado a propósito. Las bolas colocadas caen al 86 % del semiancho,
     muy fuera del eje óptico, y ahí una esfera se PROYECTA como elipse: con los
     32° del prototipo son 11 % de elongación, que se ve. A 18° baja al 3,5 %.
     La geometría siempre fue una esfera perfecta; lo que deformaba era la
     perspectiva. Cerrar el ángulo aleja la cámara, pero el encuadre se mantiene
     solo porque `resize` deriva la distancia del propio fov. */
  const camera = new THREE.PerspectiveCamera(18, 1, 0.1, 80);
  camera.position.set(0, 0, 5.6);

  const uniforms = {
    uBg:       { value: new THREE.Color(fondo) },
    uCream:    { value: COL.cream },
    uAmber:    { value: COL.amber },
    uHoney:    { value: COL.honey },
    uCrema:    { value: COL.crema },
    uIvory:    { value: COL.ivory },
    uDark:     { value: 0.0 },
    uIOR:      { value: P.ior },
    /* El halo del núcleo se mide en espacio de mundo, y `escalaCuerpo` encoge
       el cuerpo en ese mismo espacio: sin escalarlo también, un cuerpo pequeño
       queda ENTERO dentro del halo, `core` sale casi constante en toda la
       superficie y la esfera se aplana en una mancha ámbar uniforme, sin el
       degradado de crema en los lóbulos de fuera. Las bolas sueltas ya hacían
       esto (P.core * jPlacedR / 1.05); al cuerpo se le había olvidado. */
    uCoreSize: { value: P.core * escalaCuerpo },
    uGlow:     { value: nucleo == null ? P.glow : nucleo },
    uFres:     { value: P.fres },
    uSpec:     { value: P.spec },
    uCenter:   { value: new THREE.Vector3(0, 0, 0) }
  };

  const RES_HI = 96;
  const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
  const blob = new THREE.Mesh(new THREE.BufferGeometry(), material);
  scene.add(blob);

  /* Sombra suave de contacto */
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = shadowCanvas.height = 256;
  const sctx = shadowCanvas.getContext('2d');
  const grad = sctx.createRadialGradient(128,128,10,128,128,120);
  grad.addColorStop(0, 'rgba(41,41,41,0.16)');
  grad.addColorStop(1, 'rgba(41,41,41,0)');
  sctx.fillStyle = grad; sctx.fillRect(0,0,256,256);
  const shadowTex = new THREE.CanvasTexture(shadowCanvas);
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 3.4),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI/2;
  shadow.position.y = -1.65;
  scene.add(shadow);

  /* ── 8 · Rotación: de abajo a arriba sobre eje inclinado 45º ────────────── */
  const AXIS = new THREE.Vector3(1, 1, 0).normalize();
  const q = new THREE.Quaternion();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let giroLibre = !reduceMotion;

  // Radio que hay que encuadrar: corona + radio de bola + el engorde de la
  // fusión, con holgura. El prototipo iba a z fijo porque ocupaba la ventana
  // entera (apaisada); aquí el hueco es vertical y a z fijo solo cabría el
  // núcleo — que es justo la parte más saturada, de ahí que se viera como una
  // mancha naranja en vez de doce esferas.

  /* Declarado aquí arriba y no junto al resto del recorrido: `resize()` lo
     consulta, y `resize` corre en el arranque — con la declaración más abajo
     salta un ReferenceError por zona muerta temporal. */
  let jSlots = null;
  /* Declarado aquí, y no junto a prepTrazo: el bucle de render arranca mucho
     antes y lo consulta en el primer frame. */
  let trazoMesh = null;

  /* Las paradas: SOLO desplazamiento horizontal (en píxeles desde el centro) y
     profundidad. La altura NO se elige: la impone el motor.

     En píxeles y no en fracción del ancho a propósito. El contenido va centrado
     a 1120px, así que su borde está siempre a ±560 del centro: un offset de 640
     cae 80px fuera del texto tanto en una pantalla de 1400 como en una de 2500.
     Con fracciones del viewport, en pantallas anchas se pegaban al canto. */
  const MARGEN = 560;          // medio ancho del bloque de contenido
  const PARADAS_PAGINA = [
    [-(MARGEN + 90),  -0.6],
    [ (MARGEN + 70),   0.3],   // ← junto a la card de "El momento"
    [-(MARGEN + 160),  0.7],
    [ (MARGEN + 140),  0.5],
    [-(MARGEN + 130), -0.3],   // ← a la izquierda de la lista de Vera
    [ (MARGEN + 185),  0.2],   // ← cierre de la sección grafito
    [-(MARGEN + 100),  0.6],   // ← junto al titular de "Las respuestas"
    [ (MARGEN + 120), -0.5],
    [-(MARGEN + 175),  0.4],
    [ (MARGEN + 55),   0.5],   // ← a la derecha de la card de GEO
    [-(MARGEN + 130), -0.2],
    [ (MARGEN + 160), -0.4],
  ];

  /* Altura de cada parada, en fracción del recorrido útil.
     NO es un valor de diseño: es cuándo TERMINA la etapa de esa bola en el
     motor del recorrido. Una bola aterriza en su parada al acabar su etapa, así
     que si la parada está a otra altura, aterriza fuera de pantalla y la ves
     aparecer secciones más abajo — que es exactamente lo que pasaba. Atándolas,
     cada bola se posa justo cuando pasas por delante de su sitio. */
  function alturaDeParada(s) {
    return (s * JOURNEY_OVERLAP + 1) / (1 + 11 * JOURNEY_OVERLAP);
  }

  /* Modo "recorrido": las paradas no se reparten por la página, sino que dibujan
     una curva dentro del propio cuadro. Son las cuatro que se ven; el resto de
     bolas se manda fuera de plano, porque el cuerpo tiene doce por construcción
     pero el relato solo cuenta cuatro. Fracción del ancho y del alto del lienzo. */
  /* El perfil del recorrido: arranca ALTO, cae, hace pico en el centro y baja
     hasta el final. Así la primera parada aparece arriba y se lee entera en
     cuanto entra, en vez de nacer al fondo del cuadro con su ficha colgando
     fuera; y el recorrido acaba abajo, dejando la vista donde sigue la página.

     Repartidas con separación en x y salto de altura entre vecinas: juntas o a
     alturas parecidas, sus fichas se pisan.

     Todo el perfil va 0.15 por debajo del trazado original: el pico central
     caía justo en el borde inferior de la entradilla y la bola se le montaba
     encima. Abajo sobraba cuadro, así que el recorrido se baja entero en vez
     de aplanarse — el perfil se conserva y la entradilla queda despejada. */
  const PARADAS_CURVA = [
    [0.16, 0.48],
    [0.34, 0.64],
    [0.50, 0.38],
    [0.67, 0.61],
    [0.83, 0.81],
  ];


  /* Recorrido útil de la página en píxeles: del principio al pie. Lo fija el
     componente, que es quien sabe dónde empieza el footer. */
  let alturaUtil = 0;




  /* La caja contra la que se compone, en unidades de escena: el canvas menos
     el sangrado por cada lado. Como el sangrado es simétrico, el centro no se
     mueve y basta con encoger ancho y alto. */
  function cajaUtil() {
    const upp = unidadesPorPixel();
    return {
      ancho: Math.max(1, (canvas.clientWidth || 1) - sangrado * 2) * upp,
      alto: Math.max(1, (canvas.clientHeight || 1) - sangrado * 2) * upp,
    };
  }

  /* Cuántas unidades de escena mide un píxel de pantalla en el plano z=0. */
  function unidadesPorPixel() {
    const semiAlto = Math.tan((camera.fov * Math.PI) / 360) * (zBase * camFactor);
    return (semiAlto * 2) / (canvas.clientHeight || 1);
  }

  /* Fracción de ancho + pantallas de scroll → punto fijo en la escena.
     El mundo no se mueve: es la cámara la que baja con el scroll, así que una
     parada colocada aquí aparece en pantalla justo cuando toca. */
  /**
   * Recoloca las paradas al cambiar el encuadre, SEGÚN EL MODO.
   *
   * Antes esto usaba siempre las de página, también en modo recorrido. Y ahí
   * `alturaUtil` vale 0 (nadie llama a `ambito`), así que las doce se iban a
   * y=0, apiladas sobre el cuerpo: los campos de metaballs se solapaban y la
   * extracción por frame pasaba de unos pocos ms a cientos. Eso es lo que
   * atascaba la pestaña — no el número de bolas ni el tamaño del lienzo.
   */
  function recolocarParadas() {
    if (!jSlots) return;
    const nuevos = modo === "recorrido"
      ? slotsDeCurva()
      : PARADAS_PAGINA.map(([dx, nz], k) => puntoDePagina(dx, alturaDeParada(k), nz));
    nuevos.forEach((v, k) => { if (jSlots[k]) jSlots[k].copy(v); });
    if (modo === "recorrido") prepTrazo();
  }

  function puntoDePagina(offsetPx, fraccion, nz) {
    const upp = unidadesPorPixel();
    const semiAlto = ((canvas.clientHeight || 1) / 2) * upp;
    const semiAncho = semiAlto * camera.aspect;
    const base = -CORRIMIENTO * semiAncho * corrimiento;
    // La parada cae centrada en pantalla cuando el scroll llega a su fracción.
    return new THREE.Vector3(
      base + offsetPx * upp,
      -fraccion * alturaUtil * upp,
      nz
    );
  }

  /* Radio a encuadrar. Subirlo aleja la cámara y la pieza se ve más pequeña:
     1.94 = 1.55 × 1.25, o sea un 20 % menos de tamaño en pantalla. El hueco que
     libera es el que deja al titular caer en dos líneas en vez de tres. */
  const RADIO = 1.94;
  /* Distancia base para encuadrar la pieza, y cuánto se aleja la cámara cuando
     las bolas se despliegan (el prototipo iba de z 5.6 a 9.8, un factor 1.75).
     Se aplica como factor y no como valor absoluto para no pisar el encuadre,
     que depende del hueco donde viva el canvas. */
  const CAM_FACTOR_MAX = CAM_FAR_Z / CAM_BASE_Z;
  /* Cuánto se encoge la S del recorrido para caber sin mover la cámara. */
  const ESCALA_RECORRIDO = 0.46;
  let zBase = CAM_BASE_Z;
  let camFactor = 1;
  let avanceJ = 0;
  /* Cuánto se corre la escena hacia la derecha, en fracción del semiancho
     visible. El cuerpo tiene que caer en el hueco libre del hero, no debajo del
     titular. Se va a cero conforme las bolas se despliegan: entonces el
     recorrido ocupa todo el ancho y quiere estar centrado. */
  const CORRIMIENTO = 0.46;
  /* Sin deriva. La tuvo mientras el cuerpo se quedaba en el hero, pero ahora
     la cámara baja con el scroll y el cuerpo se va solo. Y tenía un efecto
     colateral feo: al mover la cámara desplazaba también las paradas, que están
     dadas en fracciones de pantalla, y acababan comiéndose el titular. */
  const DERIVA_X = 0;
  const DERIVA_Y = 0;
  let desplazamientoY = 0;   // px de scroll ya recorridos
  /* Coloca el cuerpo (y lo que va con él) en el ancla pedida. El núcleo de
     color del shader se mueve con él: si no, la esfera se ve apagada por un
     lado porque su luz interior se quedó en el origen. */
  function colocarCuerpo(){
    blob.scale.setScalar(escalaCuerpo);
    shadow.scale.setScalar(escalaCuerpo);
    if (!ancla) return;
    const { ancho, alto } = cajaUtil();
    const x = (ancla[0] - 0.5) * ancho;
    const y = -(ancla[1] - 0.5) * alto;
    blob.position.set(x, y, 0);
    shadow.position.set(x, y - 1.65 * escalaCuerpo, 0);
    uniforms.uCenter.value.set(x, y, 0);
  }

  function colocarCamara(){
    camera.position.z = zBase * camFactor;
    const semiAlto = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const semiAncho = semiAlto * camera.aspect;
    const base = -CORRIMIENTO * semiAncho * corrimiento;
    camera.position.x = base - DERIVA_X * semiAncho * corrimiento * avanceJ;
    /* La cámara baja lo mismo que el scroll: el mundo se queda quieto y las
       paradas van apareciendo a su altura, como si estuvieran clavadas en la
       página. La deriva del desmontaje se suma encima. */
    camera.position.y =
      -desplazamientoY * unidadesPorPixel() + DERIVA_Y * semiAlto * corrimiento * avanceJ;
    camera.lookAt(camera.position.x, camera.position.y, 0);
  }
  function resize(){
    const w = contenedor.clientWidth || 1, h = contenedor.clientHeight || 1;
    renderer.setSize(w, h, false);
    const aspect = w / h;
    camera.aspect = aspect;
    const semiFov = (camera.fov * Math.PI) / 360;
    const porAlto = RADIO / Math.tan(semiFov);
    const porAncho = RADIO / (Math.tan(semiFov) * aspect);
    zBase = Math.max(porAlto, porAncho);
    colocarCamara();
    colocarCuerpo();
    camera.updateProjectionMatrix();
    recolocarParadas();
  }
  const observador = new ResizeObserver(resize);
  observador.observe(contenedor);
  resize();

  const clock = new THREE.Clock();
  let angle = 0.6;
  let vivo = true;
  let bucle = 0;
  function animate(){
    if (!vivo) return;
    bucle = requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    aplicarPendiente();
    if (giroLibre) angle -= P.speed * dt;
    q.setFromAxisAngle(AXIS, angle);
    blob.quaternion.copy(q);
    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);
  bucle = requestAnimationFrame(animate);

  /* ── 3b · Motor del recorrido: desprendimiento de bolas + spline ────────── */
  /*
     Del estado fusionado, las 12 bolas se desprenden UNA A UNA y se colocan
     sobre un spline (un recorrido). El desprendimiento deforma el campo (el
     cuello se estira y se rompe, estilo metaball), lo que exige extracción en
     vivo. Estrategia:
       · grid = campo del CUERPO RESTANTE. Al desprenderse la bola i se le
         resta su contribución con una actualización LOCAL (caja ~cutoff).
       · Mientras la bola transita por su corredor radial, su contribución se
         suma ANALÍTICAMENTE durante la extracción, solo en celdas cercanas.
       · Un conjunto de celdas activas por etapa (precalculado) acota el coste.
     Las contribuciones se truncan a un cutoff y se suman/restan con la MISMA
     función → la resta cancela exacta y el grid se restaura al reagrupar.
  */
  const journey = {
    ready: false, cacheKey: '',
    N: 112, MIN: 0, H: 0, EXT: 0,
    R2j: 0, Hj: 6, shellJ: 0,
    maxDist: 0, cutR: 0, cut2: 0, dynR: 0, dyn2: 0,
    dirs: null, order: null,
    grid: null, fullGrid: null,
    activeSets: null,
    cellVert: null, cellMask: null, stampArr: null, gen: 0,
    pos: null, nor: null, indexArr: null, geo: null,
    vertCount: 0, idxCount: 0,
    /* caché de la parte estática del cuerpo durante cada etapa */
    gridV: 0, dynFlags: null,
    cachePos: null, cacheNor: null, cacheMask: null, srcA: null, dynV: null,
    cacheStage: -1, cacheGridV: -1
  };

  function jContrib(x, y, z, bx, by, bz){
    const dx = x-bx, dy = y-by, dz = z-bz;
    const d2 = dx*dx + dy*dy + dz*dz + 1e-9;
    if (d2 > journey.cut2) return 0;
    return fpow(journey.R2j / d2, journey.Hj);
  }

  // resta (sign=-1) o devuelve (sign=+1) la contribución de una bola en una
  // caja local del grid — misma función truncada → cancelación exacta
  function jGridBall(bx, by, bz, sign){
    journey.gridV++;
    const N = journey.N, MIN = journey.MIN, H = journey.H, grid = journey.grid;
    const r = journey.cutR;
    const i0 = Math.max(0, Math.floor((bx - r - MIN) / H));
    const i1 = Math.min(N-1, Math.ceil((bx + r - MIN) / H));
    const j0 = Math.max(0, Math.floor((by - r - MIN) / H));
    const j1 = Math.min(N-1, Math.ceil((by + r - MIN) / H));
    const k0 = Math.max(0, Math.floor((bz - r - MIN) / H));
    const k1 = Math.min(N-1, Math.ceil((bz + r - MIN) / H));
    for (let k = k0; k <= k1; k++){
      const z = MIN + k*H;
      for (let j = j0; j <= j1; j++){
        const y = MIN + j*H;
        let p = i0 + N*(j + N*k);
        for (let i = i0; i <= i1; i++, p++){
          const c = jContrib(MIN + i*H, y, z, bx, by, bz);
          if (c !== 0) grid[p] += sign * c;
        }
      }
    }
  }

  function prepJourneyCore(){
    const N = journey.N;
    journey.R2j = P.R * P.R;
    journey.Hj = P.fuse;
    journey.shellJ = P.shell;
    // cutoff donde la contribución cae por debajo de 5e-4 (acotado)
    journey.cutR = Math.min(P.R * Math.pow(2000, 1 / (2 * P.fuse)), 1.35);
    journey.cut2 = journey.cutR * journey.cutR;
    // radio dinámico: más allá, la contribución mueve los vértices < 3e-4 uds
    // (el cutoff completo se reserva para las operaciones de grid, que deben
    // cancelar exactas; la extracción y la caché usan este radio menor)
    journey.dynR = Math.min(journey.cutR, P.R * 1.5);
    journey.dyn2 = journey.dynR * journey.dynR;
    journey.maxDist = P.shell + 1.7 * P.R;

    const EXT = journey.maxDist + P.R + 0.12;
    journey.EXT = EXT;
    journey.MIN = -EXT;
    journey.H = (2 * EXT) / (N - 1);

    journey.dirs = RAW.map(v => {
      const l = Math.hypot(v[0], v[1], v[2]);
      return [v[0]/l, v[1]/l, v[2]/l];
    });
    // orden de salida: de arriba a abajo
    journey.order = journey.dirs.map((d, i) => i)
                      .sort((a, b) => journey.dirs[b][1] - journey.dirs[a][1]);

    // campo completo = Σ contribuciones truncadas (misma función que la resta)
    const NP = N*N*N;
    const full = new Float32Array(NP);
    const MIN = journey.MIN, H = journey.H;
    const sh = journey.shellJ, dirs = journey.dirs;
    let p = 0;
    for (let k = 0; k < N; k++){
      const z = MIN + k*H;
      for (let j = 0; j < N; j++){
        const y = MIN + j*H;
        for (let i = 0; i < N; i++){
          const x = MIN + i*H;
          let s = -1.0;                      // − iso
          for (let b = 0; b < 12; b++){
            const d = dirs[b];
            s += jContrib(x, y, z, d[0]*sh, d[1]*sh, d[2]*sh);
          }
          full[p++] = s;
        }
      }
    }
    journey.fullGrid = full;
    journey.grid = Float32Array.from(full);

    /* conjuntos activos por etapa: banda del cuerpo-restante ∪ tubo del
       corredor de la bola que se desprende en esa etapa */
    const scratch = journey.grid;            // se va restando en orden
    const NC = N - 1, NN = N*N;
    const O = new Int32Array([0, 1, N, N+1, NN, NN+1, NN+N, NN+N+1]);
    const tubeRad = P.R * 1.25 + 3 * H, tubeRad2 = tubeRad * tubeRad;
    journey.activeSets = [];
    journey.dynFlags = [];
    let maxA = 0;

    for (let s = 0; s < 12; s++){
      const b = journey.order[s], d = journey.dirs[b];
      const ax = d[0], ay = d[1], az = d[2];
      const bx = ax*sh, by = ay*sh, bz = az*sh;
      jGridBall(bx, by, bz, -1);             // scratch = cuerpo tras la etapa s

      // caja del tubo del corredor
      const ex = ax*journey.maxDist, ey = ay*journey.maxDist, ez = az*journey.maxDist;
      const tx0 = Math.min(bx, ex) - tubeRad, tx1 = Math.max(bx, ex) + tubeRad;
      const ty0 = Math.min(by, ey) - tubeRad, ty1 = Math.max(by, ey) + tubeRad;
      const tz0 = Math.min(bz, ez) - tubeRad, tz1 = Math.max(bz, ez) + tubeRad;
      const segX = ex-bx, segY = ey-by, segZ = ez-bz;
      const segL2 = segX*segX + segY*segY + segZ*segZ;

      // radio de influencia de la bola: fuera de él la celda es estática
      const inflRad = journey.dynR + 2.5 * H, infl2 = inflRad * inflRad;
      const pad = inflRad + 0.05;
      const act = [], flags = [];
      for (let k = 0; k < NC; k++){
        const z = MIN + k*H;
        for (let j = 0; j < NC; j++){
          const y = MIN + j*H;
          const row = N*(j + N*k);
          for (let i = 0; i < NC; i++){
            const p0 = i + row;
            const s0 = scratch[p0] > 0;
            let mix = (scratch[p0+O[1]] > 0) !== s0 || (scratch[p0+O[2]] > 0) !== s0 ||
                      (scratch[p0+O[3]] > 0) !== s0 || (scratch[p0+O[4]] > 0) !== s0 ||
                      (scratch[p0+O[5]] > 0) !== s0 || (scratch[p0+O[6]] > 0) !== s0 ||
                      (scratch[p0+O[7]] > 0) !== s0;
            const x = MIN + i*H;
            // distancia² al segmento del corredor (solo si estamos en su caja)
            let segD2 = Infinity;
            if (x >= tx0 - pad && x <= tx1 + pad && y >= ty0 - pad && y <= ty1 + pad &&
                z >= tz0 - pad && z <= tz1 + pad){
              let t = ((x-bx)*segX + (y-by)*segY + (z-bz)*segZ) / segL2;
              if (t < 0) t = 0; else if (t > 1) t = 1;
              const qx = bx + t*segX - x, qy = by + t*segY - y, qz = bz + t*segZ - z;
              segD2 = qx*qx + qy*qy + qz*qz;
              if (segD2 <= tubeRad2) mix = true;
            } else if (!mix) continue;
            if (mix){
              act.push(i + NC*(j + NC*k));
              flags.push(segD2 <= infl2 ? 1 : 0);
            }
          }
        }
      }
      const arr = Int32Array.from(act);
      journey.activeSets.push(arr);
      journey.dynFlags.push(Uint8Array.from(flags));
      if (arr.length > maxA) maxA = arr.length;
    }

    // restaurar el grid vivo al campo completo
    journey.grid = Float32Array.from(full);

    const NC3 = NC*NC*NC;
    journey.cellVert = new Int32Array(NC3);
    journey.cellMask = new Uint8Array(NC3);
    journey.stampArr = new Int32Array(NC3);
    journey.gen = 0;
    journey.pos = new Float32Array(maxA * 3);
    journey.nor = new Float32Array(maxA * 3);
    journey.indexArr = new Uint32Array(maxA * 18);
    journey.cachePos = new Float32Array(maxA * 3);
    journey.cacheNor = new Float32Array(maxA * 3);
    journey.cacheMask = new Uint8Array(maxA);
    journey.srcA = new Int32Array(maxA);
    journey.dynV = new Int32Array(maxA);
    journey.cacheStage = -1; journey.cacheGridV = -1;

    const geo = new THREE.BufferGeometry();
    const pa = new THREE.BufferAttribute(journey.pos, 3);
    const na = new THREE.BufferAttribute(journey.nor, 3);
    const ia = new THREE.BufferAttribute(journey.indexArr, 1);
    pa.setUsage(THREE.DynamicDrawUsage);
    na.setUsage(THREE.DynamicDrawUsage);
    ia.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute('position', pa);
    geo.setAttribute('normal', na);
    geo.setIndex(ia);
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0,0,0), EXT * 1.6);
    journey.geo = geo;
    journey.ready = true;

    // precalentar el JIT
    journeyExtract(0, true, journey.dirs[journey.order[0]][0]*sh,
                            journey.dirs[journey.order[0]][1]*sh,
                            journey.dirs[journey.order[0]][2]*sh);
    journeyExtract(0, false, 0, 0, 0);
  }

  function journeyExtract(stage, bOn, bx, by, bz){
    const N = journey.N, NC = N - 1, NN = N*N;
    const grid = journey.grid;
    const MIN = journey.MIN, H = journey.H;
    const active = journey.activeSets[stage], nAct = active.length;
    const flags = journey.dynFlags[stage];
    const cellVert = journey.cellVert, cellMask = journey.cellMask, stampArr = journey.stampArr;
    const gen = ++journey.gen;
    const pos = journey.pos, nor = journey.nor;
    const cachePos = journey.cachePos, cacheNor = journey.cacheNor, cacheMask = journey.cacheMask;
    const srcA = journey.srcA, dynV = journey.dynV;
    const cut2 = journey.dyn2, R2j = journey.R2j, Hj = journey.Hj;
    const nearR = journey.dynR + 2.2 * H, near2 = nearR * nearR;
    // caché válida: misma etapa y mismo estado del grid → las celdas estáticas
    // (fuera de la influencia del corredor) se copian en vez de recalcularse
    const useCache = journey.cacheStage === stage && journey.cacheGridV === journey.gridV;
    let nv = 0, nDyn = 0;

    function cAt(x, y, z){
      const dx = x-bx, dy = y-by, dz = z-bz;
      const d2 = dx*dx + dy*dy + dz*dz + 1e-9;
      if (d2 > cut2) return 0;
      return fpow(R2j / d2, Hj);
    }
    const lim = N - 1.001;
    function sAt(x, y, z){
      let gx = (x - MIN) / H, gy = (y - MIN) / H, gz = (z - MIN) / H;
      if (gx < 0) gx = 0; else if (gx > lim) gx = lim;
      if (gy < 0) gy = 0; else if (gy > lim) gy = lim;
      if (gz < 0) gz = 0; else if (gz > lim) gz = lim;
      const i = gx|0, j = gy|0, k = gz|0;
      const fx = gx-i, fy = gy-j, fz = gz-k;
      const p = i + N*(j + N*k);
      const a = grid[p]      + fx*(grid[p+1]      - grid[p]);
      const b = grid[p+N]    + fx*(grid[p+N+1]    - grid[p+N]);
      const c = grid[p+NN]   + fx*(grid[p+NN+1]   - grid[p+NN]);
      const d = grid[p+NN+N] + fx*(grid[p+NN+N+1] - grid[p+NN+N]);
      const e = a + fy*(b-a), f2 = c + fy*(d-c);
      let v = e + fz*(f2-e);
      if (bOn) v += cAt(x, y, z);
      return v;
    }

    /* Pasada 1: vértice + máscara por celda activa */
    for (let a = 0; a < nAct; a++){
      const cid = active[a];

      if (useCache && flags[a] === 0){
        const m = cacheMask[a];
        if (m === 0) continue;                 // celda estática sin vértice
        pos[nv*3]   = cachePos[a*3];
        pos[nv*3+1] = cachePos[a*3+1];
        pos[nv*3+2] = cachePos[a*3+2];
        nor[nv*3]   = cacheNor[a*3];
        nor[nv*3+1] = cacheNor[a*3+1];
        nor[nv*3+2] = cacheNor[a*3+2];
        cellVert[cid] = nv;
        cellMask[cid] = m;
        stampArr[cid] = gen;
        nv++;
        continue;
      }

      const i = cid % NC, jk = (cid / NC)|0;
      const j = jk % NC, k = (jk / NC)|0;
      const p = i + N*(j + N*k);

      let c0 = grid[p],      c1 = grid[p+1],      c2 = grid[p+N],      c3 = grid[p+N+1];
      let c4 = grid[p+NN],   c5 = grid[p+NN+1],   c6 = grid[p+NN+N],   c7 = grid[p+NN+N+1];

      if (bOn){
        const x0 = MIN + i*H, y0 = MIN + j*H, z0 = MIN + k*H;
        const ddx = x0-bx, ddy = y0-by, ddz = z0-bz;
        if (ddx*ddx + ddy*ddy + ddz*ddz < near2){
          const x1 = x0+H, y1 = y0+H, z1 = z0+H;
          c0 += cAt(x0,y0,z0); c1 += cAt(x1,y0,z0);
          c2 += cAt(x0,y1,z0); c3 += cAt(x1,y1,z0);
          c4 += cAt(x0,y0,z1); c5 += cAt(x1,y0,z1);
          c6 += cAt(x0,y1,z1); c7 += cAt(x1,y1,z1);
        }
      }

      let mask = 0;
      if (c0 > 0) mask |= 1;   if (c1 > 0) mask |= 2;
      if (c2 > 0) mask |= 4;   if (c3 > 0) mask |= 8;
      if (c4 > 0) mask |= 16;  if (c5 > 0) mask |= 32;
      if (c6 > 0) mask |= 64;  if (c7 > 0) mask |= 128;
      if (mask === 0 || mask === 255){
        if (!useCache && flags[a] === 0) cacheMask[a] = 0;
        continue;
      }

      let sx = 0, sy = 0, sz = 0, n = 0, tt;
      if ((c0>0)!==(c1>0)){ tt=c0/(c0-c1); sx+=tt; n++; }
      if ((c2>0)!==(c3>0)){ tt=c2/(c2-c3); sx+=tt; sy+=1; n++; }
      if ((c4>0)!==(c5>0)){ tt=c4/(c4-c5); sx+=tt; sz+=1; n++; }
      if ((c6>0)!==(c7>0)){ tt=c6/(c6-c7); sx+=tt; sy+=1; sz+=1; n++; }
      if ((c0>0)!==(c2>0)){ tt=c0/(c0-c2); sy+=tt; n++; }
      if ((c1>0)!==(c3>0)){ tt=c1/(c1-c3); sx+=1; sy+=tt; n++; }
      if ((c4>0)!==(c6>0)){ tt=c4/(c4-c6); sy+=tt; sz+=1; n++; }
      if ((c5>0)!==(c7>0)){ tt=c5/(c5-c7); sx+=1; sy+=tt; sz+=1; n++; }
      if ((c0>0)!==(c4>0)){ tt=c0/(c0-c4); sz+=tt; n++; }
      if ((c1>0)!==(c5>0)){ tt=c1/(c1-c5); sx+=1; sz+=tt; n++; }
      if ((c2>0)!==(c6>0)){ tt=c2/(c2-c6); sy+=1; sz+=tt; n++; }
      if ((c3>0)!==(c7>0)){ tt=c3/(c3-c7); sx+=1; sy+=1; sz+=tt; n++; }

      const px = MIN + (i + sx/n)*H, py = MIN + (j + sy/n)*H, pz = MIN + (k + sz/n)*H;
      pos[nv*3] = px; pos[nv*3+1] = py; pos[nv*3+2] = pz;
      cellVert[cid] = nv;
      cellMask[cid] = mask;
      stampArr[cid] = gen;
      if (!useCache){
        srcA[nv] = a;
        if (flags[a] === 0){
          cacheMask[a] = mask;
          cachePos[a*3] = px; cachePos[a*3+1] = py; cachePos[a*3+2] = pz;
        }
      } else {
        dynV[nDyn++] = nv;                     // normal pendiente solo si dinámica
      }
      nv++;
    }

    /* Pasada 2: quads — cada arista con cruce la emite su celda origen */
    const iarr = journey.indexArr;
    const dJ = NC, dK = NC*NC;
    let ni = 0;
    for (let a = 0; a < nAct; a++){
      const cid = active[a];
      if (stampArr[cid] !== gen) continue;
      const mask = cellMask[cid];
      const i = cid % NC, jk = (cid / NC)|0;
      const j = jk % NC, k = (jk / NC)|0;
      const b0 = mask & 1;

      if (j > 0 && k > 0 && b0 !== ((mask >> 1) & 1)){
        const q1 = cid - dJ, q2 = cid - dJ - dK, q3 = cid - dK;
        if (stampArr[q1] === gen && stampArr[q2] === gen && stampArr[q3] === gen){
          const va = cellVert[cid], vb = cellVert[q1], vc = cellVert[q2], vd = cellVert[q3];
          if (b0){ iarr[ni++]=va; iarr[ni++]=vb; iarr[ni++]=vc; iarr[ni++]=va; iarr[ni++]=vc; iarr[ni++]=vd; }
          else   { iarr[ni++]=va; iarr[ni++]=vd; iarr[ni++]=vc; iarr[ni++]=va; iarr[ni++]=vc; iarr[ni++]=vb; }
        }
      }
      if (i > 0 && k > 0 && b0 !== ((mask >> 2) & 1)){
        const q1 = cid - dK, q2 = cid - 1 - dK, q3 = cid - 1;
        if (stampArr[q1] === gen && stampArr[q2] === gen && stampArr[q3] === gen){
          const va = cellVert[cid], vb = cellVert[q1], vc = cellVert[q2], vd = cellVert[q3];
          if (b0){ iarr[ni++]=va; iarr[ni++]=vb; iarr[ni++]=vc; iarr[ni++]=va; iarr[ni++]=vc; iarr[ni++]=vd; }
          else   { iarr[ni++]=va; iarr[ni++]=vd; iarr[ni++]=vc; iarr[ni++]=va; iarr[ni++]=vc; iarr[ni++]=vb; }
        }
      }
      if (i > 0 && j > 0 && b0 !== ((mask >> 4) & 1)){
        const q1 = cid - 1, q2 = cid - 1 - dJ, q3 = cid - dJ;
        if (stampArr[q1] === gen && stampArr[q2] === gen && stampArr[q3] === gen){
          const va = cellVert[cid], vb = cellVert[q1], vc = cellVert[q2], vd = cellVert[q3];
          if (b0){ iarr[ni++]=va; iarr[ni++]=vb; iarr[ni++]=vc; iarr[ni++]=va; iarr[ni++]=vc; iarr[ni++]=vd; }
          else   { iarr[ni++]=va; iarr[ni++]=vd; iarr[ni++]=vc; iarr[ni++]=va; iarr[ni++]=vc; iarr[ni++]=vb; }
        }
      }
    }

    /* Pasada 3: normales por diferencias centrales del campo */
    const h = H;
    if (useCache){
      for (let d = 0; d < nDyn; d++){
        const v = dynV[d];
        const x = pos[v*3], y = pos[v*3+1], z = pos[v*3+2];
        const nx = sAt(x+h,y,z) - sAt(x-h,y,z);
        const ny = sAt(x,y+h,z) - sAt(x,y-h,z);
        const nz = sAt(x,y,z+h) - sAt(x,y,z-h);
        const l = Math.hypot(nx, ny, nz) || 1;
        nor[v*3] = -nx/l; nor[v*3+1] = -ny/l; nor[v*3+2] = -nz/l;
      }
    } else {
      for (let v = 0; v < nv; v++){
        const x = pos[v*3], y = pos[v*3+1], z = pos[v*3+2];
        const nx = sAt(x+h,y,z) - sAt(x-h,y,z);
        const ny = sAt(x,y+h,z) - sAt(x,y-h,z);
        const nz = sAt(x,y,z+h) - sAt(x,y,z-h);
        const l = Math.hypot(nx, ny, nz) || 1;
        nor[v*3] = -nx/l; nor[v*3+1] = -ny/l; nor[v*3+2] = -nz/l;
        const a = srcA[v];
        if (flags[a] === 0){
          cacheNor[a*3] = nor[v*3]; cacheNor[a*3+1] = nor[v*3+1]; cacheNor[a*3+2] = nor[v*3+2];
        }
      }
      journey.cacheStage = stage;
      journey.cacheGridV = journey.gridV;
    }

    journey.vertCount = nv;
    journey.idxCount = ni;
  }

  function commitJourneyFrame(){
    const geo = journey.geo;
    geo.attributes.position.needsUpdate = true;
    geo.attributes.normal.needsUpdate = true;
    geo.index.needsUpdate = true;
    geo.setDrawRange(0, journey.idxCount);
  }

  /* ── 4 · Shader de cristal con núcleo dorado central ────────────────────── */

  /* ── 7b · Recorrido: timeline, spline, tubo y bolas sueltas ─────────────── */
  const JOURNEY_STAGE_MS = 1900;
  /* Fracción de la etapa que la bola pasa en fase de CAMPO: todavía como lóbulo
     de la malla del cuerpo, aunque el campo ya la haya separado en una isla
     propia. Esa isla la sigue iluminando el núcleo del CUERPO, del que se ha
     ido lejos, así que no le llega luz y se ve como un cristal translúcido.

     A cero: la bola pasa de pegada a volando sin pasar por ahí. No se pierde el
     gesto de salir del cuerpo —la transición sigue recorriendo la cadena de
     estados, así que el cuerpo pierde su lóbulo igual (jGridBall -1)— y la
     malla propia aparece justo en el borde del cuerpo, que es donde estaba el
     lóbulo. Lo único que desaparece es el tramo en el que no se veía. */
  const DETACH_END = 0;
  /* El recorrido dura lo que tarden en caer las bolas del cupo, no las doce:
     si no, el scroll sigue avanzando un buen rato sin que pase nada. */
  const JOURNEY_TOTAL = JOURNEY_STAGE_MS * (1 + (sueltas - 1) * JOURNEY_OVERLAP);

  let journeyMode = 'off';           // off | prep | forming | formed | reversing
  let jTime = 0;
  let jSceneReady = false, jSceneKey = '';
  let camZTarget = CAM_BASE_Z;

  const jBalls = [];                 // {mesh, mat, state, slot, spawn, dir}
  /* Radio de las bolas ya colocadas. Se perdió al reordenar las declaraciones
     para sacar las paradas antes de resize(). */
  let jPlacedR = 0.19;
  function smoothstep01(s){ return s*s*(3-2*s); }

  /* Las cuatro paradas visibles en coordenadas de escena, y las ocho restantes
     lejos del plano de cámara para que no estorben. */
  function slotsDeCurva() {
    const { ancho, alto } = cajaUtil();
    const visibles = PARADAS_CURVA.map(([nx, ny]) =>
      new THREE.Vector3((nx - 0.5) * ancho, -(ny - 0.5) * alto, 0)
    );
    const fuera = [];
    for (let i = visibles.length; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      fuera.push(new THREE.Vector3(Math.cos(a) * ancho * 1.6, Math.sin(a) * alto * 1.6, -6));
    }
    return visibles.concat(fuera);
  }

  /* El trazo, como geometría y no como SVG: así vive en el mismo espacio que
     las bolas y no hay que sincronizar dos sistemas de coordenadas. Se revela
     con el recorrido, dibujándose de la primera parada a la última. */
  function prepTrazo() {
    if (trazoMesh) {
      scene.remove(trazoMesh);
      trazoMesh.geometry.dispose();
      trazoMesh.material.dispose();
      trazoMesh = null;
    }
    if (modo !== "recorrido" || !jSlots) return;
    const { ancho, alto } = cajaUtil();
    /* Entra y sale del cuadro: el recorrido venía de antes y sigue después.
       Justo en el borde (0.5), no más allá: antes sobraba trazo y lo recortaba
       el canvas, pero con el sangrado el canvas ya no recorta nada y ese sobra
       se veía flotando fuera de la columna de texto. */
    const puntos = [
      new THREE.Vector3(-ancho * 0.5, -(0.41 - 0.5) * alto, 0),
      ...jSlots.slice(0, PARADAS_CURVA.length).map((v) => v.clone()),
      new THREE.Vector3(ancho * 0.5, -(0.93 - 0.5) * alto, 0),
    ];
    const curva = new THREE.CatmullRomCurve3(puntos, false, "catmullrom", 0.5);
    const geo = new THREE.TubeGeometry(curva, 220, 0.018 * escalaSuelta, 8, false);
    trazoMesh = new THREE.Mesh(
      geo,
      /* Gris, no crema: con la línea en dorado claro, trazo y paradas eran el
         mismo color y el recorrido se leía como una sola mancha. En gris la
         línea es el soporte y las bolas el dato, que es la jerarquía real.
         --border-gray del DS. */
      new THREE.MeshBasicMaterial({ color: COL.trazo, transparent: true, opacity: 0.9 })
    );
    trazoMesh.geometry.setDrawRange(0, 0);
    scene.add(trazoMesh);
  }

  function prepJourneyScene(){
    // limpiar restos de una preparación anterior
    jBalls.forEach(b => { scene.remove(b.mesh); b.mesh.geometry.dispose(); b.mat.dispose(); });
    jBalls.length = 0;

    /* La curva del recorrido NO se pinta: de ella solo salen las doce posiciones
       de destino. Es la diferencia con el prototipo, que además dibujaba el tubo
       dorado sobre ella. */
    // Las doce paradas, en fracción de pantalla (0,0 arriba-izquierda). No van
    // en fila: se reparten por los huecos que deja el texto y la propia esfera,
    // que es como se lee un recorrido de decisión — paradas sueltas, no una
    // procesión. La tercera cifra es profundidad, para que no queden todas
    // planas en el mismo plano.
    jSlots = modo === "recorrido"
      ? slotsDeCurva()
      : PARADAS_PAGINA.map(([dx, nz], k) => puntoDePagina(dx, alturaDeParada(k), nz));
    prepTrazo();

    jPlacedR = Math.min(0.19, P.R * 0.50) * escalaSuelta;   // antes 0.24 / 0.62

    // una esfera por bola, con su propio núcleo de color (uCenter propio)
    const ballGeo = new THREE.SphereGeometry(1, 48, 32);
    for (let s = 0; s < 12; s++){
      const mat = new THREE.ShaderMaterial({
        vertexShader, fragmentShader,
        uniforms: {
          uBg: uniforms.uBg, uCream: uniforms.uCream, uAmber: uniforms.uAmber,
          uHoney: uniforms.uHoney, uCrema: uniforms.uCrema, uIvory: uniforms.uIvory,
          uDark: uniforms.uDark, uIOR: uniforms.uIOR, uGlow: uniforms.uGlow,
          uFres: uniforms.uFres, uSpec: uniforms.uSpec,
          uCoreSize: { value: P.core * (P.R / 1.05) },
          uCenter:   { value: new THREE.Vector3() }
        }
      });
      const mesh = new THREE.Mesh(ballGeo, mat);
      mesh.visible = false;
      scene.add(mesh);
      jBalls.push({ mesh, mat, state: 'attached', slot: jSlots[s], spawn: new THREE.Vector3(), dir: null });
    }
    jSceneReady = true;
  }

  const _v3a = new THREE.Vector3(), _v3b = new THREE.Vector3(), _v3c = new THREE.Vector3();

  /* Con el cuerpo anclado fuera del origen, todo lo que sale de él tiene que
     salir desde ahí: si no, las bolas brotan del centro del lienzo. */
  function desdeElCuerpo(v){
    return ancla ? v.add(blob.position) : v;
  }

  function corridorTopWorld(s, out){
    const d = journey.dirs[journey.order[s]];
    out.set(d[0], d[1], d[2])
       .multiplyScalar(journey.maxDist * escalaCuerpo)
       .applyQuaternion(blob.quaternion);
    return desdeElCuerpo(out);
  }

  function ballTransition(b, s, from, to){
    const d = journey.dirs[journey.order[s]], sh = journey.shellJ;
    if (from === 'attached' && to === 'field'){
      jGridBall(d[0]*sh, d[1]*sh, d[2]*sh, -1);      // sale del cuerpo restante
    } else if (from === 'field' && to === 'attached'){
      jGridBall(d[0]*sh, d[1]*sh, d[2]*sh, +1);      // vuelve al cuerpo
    } else if (from === 'field' && to === 'flying'){
      corridorTopWorld(s, b.spawn);                   // punto de despegue actual
      b.mesh.visible = true;
    } else if (from === 'flying' && to === 'field'){
      b.mesh.visible = false;
    } else if (from === 'flying' && to === 'placed'){
      b.mesh.position.copy(b.slot);
      b.mesh.scale.setScalar(jPlacedR);
    } else if (from === 'placed' && to === 'flying'){
      /* nada: la posición se recalcula en vuelo */
    }
    b.state = to;
  }

  const STATE_CHAIN = ['attached', 'field', 'flying', 'placed'];
  function setBallState(b, s, desired){
    while (b.state !== desired){
      const cur = STATE_CHAIN.indexOf(b.state);
      const tgt = STATE_CHAIN.indexOf(desired);
      const next = STATE_CHAIN[cur + (tgt > cur ? 1 : -1)];
      ballTransition(b, s, b.state, next);
    }
  }

  /* El prototipo avanzaba jTime con el reloj y dos botones (formar / reagrupar).
     Aquí el único mando es el scroll: `recorrido(t)` fija jTime y esta función
     solo reparte ese instante entre las doce bolas. Sin modos ni marcha atrás:
     subir el scroll ya es la marcha atrás. */
  function stepJourney(){
    if (!jSceneReady) return;

    let fieldStage = -1, fbx = 0, fby = 0, fbz = 0;
    let gridChanged = false, changedStage = 0;

    for (let s = 0; s < 12; s++){
      const b = jBalls[s];
      // Las que están fuera del cupo no se desprenden nunca.
      const t = s >= sueltas
        ? 0
        : Math.min(Math.max((jTime - s * JOURNEY_STAGE_MS * JOURNEY_OVERLAP) / JOURNEY_STAGE_MS, 0), 1);
      const desired = t <= 0 ? 'attached' : t < DETACH_END ? 'field' : t < 1 ? 'flying' : 'placed';
      if (b.state !== desired){
        const wasField = b.state === 'field' || desired === 'field' ||
                         (b.state === 'attached') !== (desired === 'attached');
        setBallState(b, s, desired);
        if (wasField){ gridChanged = true; changedStage = s; }
      }

      if (b.state === 'field'){
        const e = smoothstep01(t / DETACH_END);
        const d = journey.dirs[journey.order[s]];
        const dist = journey.shellJ + (journey.maxDist - journey.shellJ) * e;
        fieldStage = s; fbx = d[0]*dist; fby = d[1]*dist; fbz = d[2]*dist;
      } else if (b.state === 'flying'){
        const tf = smoothstep01((t - DETACH_END) / (1 - DETACH_END));
        // en reversa el punto de origen gira con el cuerpo: se recalcula
        // El origen se recalcula siempre: al subir el scroll el cuerpo ha
        // girado y la bola tiene que volver al punto que le toca ahora.
        const A = corridorTopWorld(s, _v3a);
        const B = b.slot;
        _v3b.lerpVectors(A, B, 0.5);
        _v3b.y += 0.9; _v3b.addScaledVector(_v3c.copy(A).normalize(), 0.45);
        // bézier cuadrática A → ctrl → B
        const u = 1 - tf;
        b.mesh.position.set(
          u*u*A.x + 2*u*tf*_v3b.x + tf*tf*B.x,
          u*u*A.y + 2*u*tf*_v3b.y + tf*tf*B.y,
          u*u*A.z + 2*u*tf*_v3b.z + tf*tf*B.z
        );
        const salida = P.R * escalaCuerpo;
        const sc = salida + (jPlacedR - salida) * tf;
        b.mesh.scale.setScalar(sc);
        b.mat.uniforms.uCenter.value.copy(b.mesh.position);
        b.mat.uniforms.uCoreSize.value = P.core * (sc / 1.05);
      } else if (b.state === 'placed'){
        b.mat.uniforms.uCenter.value.copy(b.slot);
        b.mat.uniforms.uCoreSize.value = P.core * (jPlacedR / 1.05);
      }
    }

    // extracción del cuerpo: solo si hay bola en fase de campo o cambió el grid
    if (fieldStage >= 0){
      journeyExtract(fieldStage, true, fbx, fby, fbz);
      commitJourneyFrame();
    } else if (gridChanged){
      journeyExtract(changedStage, false, 0, 0, 0);
      commitJourneyFrame();
    }


    // cámara: se aleja a medida que el recorrido se despliega
    camZTarget = CAM_BASE_Z + (CAM_FAR_Z - CAM_BASE_Z) * smoothstep01(jTime / JOURNEY_TOTAL);

  }

  function startJourney(){
    if (journeyMode === 'reversing'){       // reanudar hacia delante
      journeyMode = 'forming';
      return;
    }
    if (journeyMode !== 'off') return;
    cancelIntro();
    journeyMode = 'prep';
    rebuildDot.classList.add('on');

    requestAnimationFrame(() => requestAnimationFrame(() => {
      const key = JSON.stringify([P.R, P.shell, P.fuse]);
      if (!journey.ready || journey.cacheKey !== key){
        prepJourneyCore();
        journey.cacheKey = key;
      }
      if (!jSceneReady || jSceneKey !== key){
        prepJourneyScene();
        jSceneKey = key;
      }
      // estado inicial: cuerpo completo, todas las bolas dentro.
      // El conjunto activo de la etapa 0 solo cubre el casquete de la bola 0
      // a través de su tubo → se extrae con la bola 0 como término analítico
      // en su posición de reposo (equivale al cuerpo completo).
      journey.grid.set(journey.fullGrid);
      jBalls.forEach(b => { b.state = 'attached'; b.mesh.visible = false; });
      const d0 = journey.dirs[journey.order[0]], sh = journey.shellJ;
      jGridBall(d0[0]*sh, d0[1]*sh, d0[2]*sh, -1);
      journeyExtract(0, true, d0[0]*sh, d0[1]*sh, d0[2]*sh);
      commitJourneyFrame();
      if (blob.geometry !== journey.geo){
        const old = blob.geometry;
        blob.geometry = journey.geo;
        if (old !== morph.geo && old !== journey.geo) old.dispose();
      }
      // dejar el grid como cuerpo completo de nuevo; la etapa 0 lo restará al entrar
      jGridBall(d0[0]*sh, d0[1]*sh, d0[2]*sh, +1);
      rebuildDot.classList.remove('on');
      journeyMode = 'forming';
    }));
  }

  function startRegroup(){
    if (journeyMode !== 'formed' && journeyMode !== 'forming') return;
    journeyMode = 'reversing';
  }

  function cancelJourney(){
    if (journeyMode === 'off') return;
    journeyMode = 'off';
    if (journey.ready && journey.fullGrid) journey.grid.set(journey.fullGrid);
    jBalls.forEach(b => { b.state = 'attached'; b.mesh.visible = false; });
    camZTarget = CAM_BASE_Z;
  }


  /* ── 8 · Rotación: de abajo a arriba sobre eje inclinado 45º ────────────── */

  /* ── Puente con el scroll ─────────────────────────────────────────────── */
  // El progreso entra a cualquier ritmo (un scroll dispara decenas de eventos
  // por segundo) pero la superficie solo se extrae una vez por frame: guardamos
  // el último valor y lo aplicamos en el rAF.
  let pendiente = 0;
  let aplicado = -1;
  let listo = false;
  let pendienteJ = -1;
  let aplicadoJ = -1;

  function aplicarPendiente() {
    if (pendienteJ >= 0 && pendienteJ !== aplicadoJ) {
      aplicadoJ = pendienteJ;
      const v = pendienteJ;
      if (!jSceneReady) {
        /* Un lienzo sin medir daría unidades por píxel disparatadas y el
           precálculo del campo se iría a un tamaño imposible: el hilo se queda
           colgado y la pestaña deja de responder. Se espera a tener caja. */
        if (!canvas.clientWidth || !canvas.clientHeight) return;
        prepJourneyCore();
        prepJourneyScene();
        /* El cuerpo tiene que pasar a la geometría VIVA del recorrido. Sin esto
           se queda con la estática y nunca pierde bolas: se veían salir las
           doce y el cuerpo seguía entero. Es el mismo arranque del prototipo:
           campo completo, se resta la bola 0, se extrae y se devuelve. */
        journey.grid.set(journey.fullGrid);
        jBalls.forEach((b) => { b.state = "attached"; b.mesh.visible = false; });
        const d0 = journey.dirs[journey.order[0]];
        const sh = journey.shellJ;
        jGridBall(d0[0] * sh, d0[1] * sh, d0[2] * sh, -1);
        journeyExtract(0, true, d0[0] * sh, d0[1] * sh, d0[2] * sh);
        commitJourneyFrame();
        if (blob.geometry !== journey.geo) {
          const anterior = blob.geometry;
          blob.geometry = journey.geo;
          if (anterior && anterior !== morph.geo && anterior !== journey.geo) anterior.dispose();
        }
        jGridBall(d0[0] * sh, d0[1] * sh, d0[2] * sh, +1);
      }
      /* jTime NO salta al objetivo: se acerca a él con un tope por frame.
         Cada bola que cambia de estado obliga a reextraer la superficie del
         cuerpo, así que un salto grande —un anclaje, un scroll de golpe, la
         rueda a fondo— podía disparar cinco extracciones en el mismo frame y
         congelar la pestaña. Repartido, el salto tarda unos frames más y el
         hilo nunca se bloquea. */
      const objetivo = v * JOURNEY_TOTAL;
      const TOPE = JOURNEY_STAGE_MS * 0.5;
      const salto = objetivo - jTime;
      jTime += Math.max(-TOPE, Math.min(TOPE, salto));
      stepJourney();
      // Si aún no ha llegado, se sigue acercando en los próximos frames.
      if (Math.abs(objetivo - jTime) > 1) aplicadoJ = -1;
      avanceJ = smoothstep01(v);
      if (trazoMesh) {
        const total = trazoMesh.geometry.index ? trazoMesh.geometry.index.count : 0;
        trazoMesh.geometry.setDrawRange(0, Math.floor(total * avanceJ));
        trazoMesh.visible = avanceJ > 0.02;
      }
      colocarCamara();
      return;   // el recorrido reescribe la geometría del cuerpo: no toca morph
    }
    if (!listo || pendiente === aplicado) return;
    aplicado = pendiente;
    extractMorph(pendiente);
    commitMorphFrame();
  }

  /**
   * Forma final directa (corona 0.63 · fusión 6.0), sin motor de morphing.
   * Es la que usa el hero: las doce bolas ya se distinguen, y es además la
   * misma corona desde la que el recorrido las desprende — con la forma de la
   * primera clave (0.45) el cuerpo era una bola lisa y las bolas parecían
   * salir de cualquier parte.
   */
  function prepararFinal() {
    if (!canvas.clientWidth || !canvas.clientHeight) return;
    const anterior = blob.geometry;
    blob.geometry = buildBlobGeometry(RES_HI);
    if (anterior && anterior !== morph.geo) anterior.dispose();
    // OJO: no se toca `listo`. Esa bandera dice "los tres campos del morph
    // están calculados", y aquí no lo están: marcarla mandaba al bucle a
    // interpolar grids que no existen.
  }

  function preparar() {
    prepMorph();
    extractMorph(0);
    commitMorphFrame();
    const anterior = blob.geometry;
    blob.geometry = morph.geo;
    if (anterior && anterior !== morph.geo) anterior.dispose();
    listo = true;
  }

  return {
    /** Prepara los tres campos. Es el paso caro (~1s): se llama una sola vez. */
    preparar,
    /** Forma final directa, sin morphing. Para quien solo necesita el recorrido. */
    prepararFinal,
    /** t en [0,1]: 0 = primera clave, 1 = última. */
    progreso(t) {
      pendiente = Math.min(1, Math.max(0, t));
    },
    /**
     * Desprendimiento de las doce bolas, gobernado por el scroll.
     * t=0 cuerpo entero · t=1 las doce sueltas sobre el recorrido.
     * La primera llamada prepara el motor (coste alto, una sola vez).
     */
    /**
     * Recorrido útil de la página, en píxeles de scroll. Las paradas se dan en
     * fracción de él, así que fijarlo recoloca las doce.
     */
    ambito(px) {
      if (px === alturaUtil) return;
      alturaUtil = px;
      recolocarParadas();
    },
    /** Píxeles de scroll recorridos: baja la cámara sobre el mundo. */
    desplazar(px) {
      if (px === desplazamientoY) return;
      desplazamientoY = px;
      colocarCamara();
    },
    desmontar(t) {
      const v = Math.min(1, Math.max(0, t));
      // Antes de tocar nada no se paga el precio de preparar el recorrido.
      if (v <= 0 && !jSceneReady) return;
      pendienteJ = v;
    },
    /**
     * Posición en píxeles del lienzo de cada parada visible, y si ya ha
     * aterrizado. Es lo que permite colgar etiquetas HTML de las bolas sin
     * duplicar la geometría: se proyecta el punto 3D y se lee en CSS.
     */
    paradas() {
      if (!jSlots) return [];
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      const v = new THREE.Vector3();
      return jSlots.slice(0, PARADAS_CURVA.length).map((punto, i) => {
        v.copy(punto).project(camera);
        return {
          /* En coordenadas de la caja útil, que es donde vive la lista de
             etiquetas — el canvas empieza `sangrado` px antes. */
          x: ((v.x + 1) / 2) * w - sangrado,
          y: ((1 - v.y) / 2) * h - sangrado,
          puesta: jBalls[i] ? jBalls[i].state === "placed" : false,
        };
      });
    },
    /** Corona de centros y fusión de surcos en el progreso actual. */
    estado() {
      const K = [INTRO_KEYS[0], INTRO_KEYS[1], { shell: P.shell, fuse: P.fuse }];
      const t = pendiente;
      let a, b, s;
      if (t <= INTRO_SPLIT) { a = K[0]; b = K[1]; s = t / INTRO_SPLIT; }
      else { a = K[1]; b = K[2]; s = (t - INTRO_SPLIT) / (1 - INTRO_SPLIT); }
      s = s * s * (3 - 2 * s);
      return {
        t,
        corona: a.shell + (b.shell - a.shell) * s,
        fusion: a.fuse + (b.fuse - a.fuse) * s,
      };
    },
    /** Detiene el giro libre (para prefers-reduced-motion o pausas). */
    girar(activo) {
      giroLibre = activo && !reduceMotion;
    },
    destruir() {
      vivo = false;
      cancelAnimationFrame(bucle);
      observador.disconnect();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      shadowTex.dispose();
      renderer.dispose();
    },
  };
}
