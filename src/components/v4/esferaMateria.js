import * as THREE from "three";

/* ANTES de construir un solo THREE.Color.
   La paleta del design system ya está en sRGB, y el renderer saca los píxeles
   tal cual (outputColorSpace lineal), así que aquí no debe convertirse nada.
   Esta línea vivía en EsferaFacetada.js, que importa este módulo: los módulos
   ES evalúan sus dependencias primero, así que COL se construía con la
   conversión todavía activa y toda la familia dorada entraba al shader un
   escalón más quemada — el acento #FAAD33 se pintaba como #F46B08. De ahí el
   naranja. Va aquí porque este es el módulo que crea los colores. */
THREE.ColorManagement.enabled = false;

/**
 * El cristal dorado: el material del que están hechas todas las esferas de la
 * web. Vivía dentro de crearEsfera, y salió de ahí cuando la constelación de
 * /navegacion-activa necesitó las mismas bolas sin necesitar el motor entero
 * —campos escalares, morphing, recorrido—. Duplicar 90 líneas de GLSL habría
 * garantizado que las dos piezas se separasen a la primera corrección de color.
 *
 * Aquí solo está el aspecto. Quién lo usa, con qué uniforms y sobre qué
 * geometría, es cosa de cada escena.
 */

/* ── 4 · Shader de cristal con núcleo dorado central ────────────────────── */
/* Reparto de la familia dorada dentro de la pieza. El ámbar y la miel entran
   más tarde que en el prototipo: allí la esfera ocupaba una ventana entera y
   el núcleo quedaba lejos, aquí llena un hueco estrecho y con los umbrales
   originales se leía como una masa naranja en vez de como cristal. */
export const TONO = {
  /* Afinado sobre la esfera con el panel, ya con el color corregido (ver la
     nota de ColorManagement arriba): hasta entonces la paleta entraba al
     shader quemada y cualquier número de aquí estaba compensando eso. */
  ambarDesde: 0.39,   // core al que empieza a aparecer el oro
  ambarHasta: 0.52,   //                        y al que domina
  mielDesde: 0.63,    // coreH al que el núcleo caliente entra en la miel
  mielHasta: 1.00,
  velo: 0.21,         // cuánto tiñe el cristal visto al trasluz
  cuerpo: 0.30,       // peso del oro sobre el cuerpo
  cuerpoVista: 0.75,  //   ídem, según el ángulo de vista
  halo: 0.35,         // peso del núcleo caliente
};
/* GLSL no acepta enteros donde espera float: un 1 pelado rompe el shader
   entero y la pieza desaparece sin decir por qué. Todo valor que entre en el
   código del shader pasa por aquí. */
const f = (n) => n.toFixed(3);

export const COL = {
  /* Los cuatro son tokens del design system, sin retoques. Se llegaron a
     mover buscando un dorado que no salía; el problema no estaba aquí sino en
     la gestión de color (ver arriba), que los quemaba antes de llegar al
     shader. Con eso arreglado, la familia vale tal cual. El recorrido crema →
     oro → miel se gobierna desde TONO, no cambiando estos hex. */
  cream:  new THREE.Color('#FEECAD'),   // --brand-gold-cream
  amber:  new THREE.Color('#FAAD33'),   // --accent-gold
  honey:  new THREE.Color('#EEAB4A'),   // --brand-gold-honey
  crema:  new THREE.Color('#FCF2D7'),   // --gold-crema
  ivory:  new THREE.Color('#FCFDFD'),
  /* El trazo del recorrido: soporte, no dato. Gris del DS. */
  trazo:  new THREE.Color('#CDCDCD'),   // --border-gray
  graphite: new THREE.Color('#1C1C1C')
};

export const vertexShader = `
  varying vec3 vWorldPos;
  varying vec3 vWorldNormal;
  void main(){
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

export const fragmentShader = `
  precision highp float;
  varying vec3 vWorldPos;
  varying vec3 vWorldNormal;

  uniform vec3 uBg;
  uniform vec3 uCream;
  uniform vec3 uAmber;
  uniform vec3 uHoney;
  uniform vec3 uCrema;
  uniform vec3 uIvory;
  uniform float uDark;
  uniform float uIOR;
  uniform float uCoreSize;
  uniform float uGlow;
  uniform float uFres;
  uniform float uSpec;
  uniform vec3 uCenter;   // centro del núcleo de color (origen en el cuerpo)

  void main(){
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(cameraPosition - vWorldPos);
    float NdV = clamp(dot(N, V), 0.0, 1.0);
    float fres = pow(1.0 - NdV, 3.0) * uFres;

    vec3 Rr = refract(-V, N, 1.0 / uIOR);
    if (dot(Rr, Rr) < 1e-6) Rr = -V;
    vec3 toC = uCenter - vWorldPos;
    vec3 w = toC - dot(toC, Rr) * Rr;
    float lineDist = length(w);
    float core  = exp(-pow(lineDist / uCoreSize, 2.0) * 2.6) * uGlow;
    float coreH = exp(-pow(lineDist / (uCoreSize * 0.48), 2.0) * 3.0) * uGlow;

    vec3 gold = mix(uCream, uAmber, smoothstep(${f(TONO.ambarDesde)}, ${f(TONO.ambarHasta)}, core));
    /* El tramo de miel. Se quitó en algún momento y el núcleo caliente pasó a
       resolverse subiendo el ÁMBAR, que es el acento puro: el punto más
       caliente de la esfera se iba a #FAAD33 y, con el halo ya ancho, ese
       naranja se comía la pieza entera. La miel (#EEAB4A) es medio tono más
       apagada, y es la que hace que el oro se lea como oro y no como butano. */
    gold      = mix(gold,  uHoney, smoothstep(${f(TONO.mielDesde)}, ${f(TONO.mielHasta)}, coreH));

    float edgeThin = pow(1.0 - NdV, 1.6);
    vec3 through = mix(uBg, uCrema, ${f(TONO.velo)} + 0.06 * uDark);
    vec3 base = mix(through, gold, clamp(core * (${f(TONO.cuerpo)} + ${f(TONO.cuerpoVista)} * NdV) + coreH * ${f(TONO.halo)}, 0.0, 1.0));
    base = mix(base, through, edgeThin * 0.55);

    vec3 Rf = reflect(-V, N);
    float sky = smoothstep(-0.35, 0.9, Rf.y);
    vec3 envLight = mix(uCrema * 0.9, uIvory, sky);
    vec3 envDark  = mix(vec3(0.10), mix(uHoney, uIvory, 0.35), sky * 0.6);
    vec3 env = mix(envLight, envDark, uDark);
    base += env * (0.06 + 0.60 * fres);

    vec3 L1 = normalize(vec3(-0.55,  0.85,  0.65));
    vec3 L2 = normalize(vec3( 0.75,  0.35,  0.45));
    vec3 L3 = normalize(vec3( 0.10, -0.75,  0.55));
    float s1 = pow(max(dot(Rf, L1), 0.0), 240.0);
    float s2 = pow(max(dot(Rf, L2), 0.0), 120.0);
    float s3 = pow(max(dot(Rf, L3), 0.0), 320.0);
    base += (uIvory * (s1 * 0.95 + s3 * 0.5)
          + mix(uIvory, uCream, 0.6) * s2 * 0.45) * uSpec;

    base += uAmber * fres * core * 0.35;
    base *= 0.94 + 0.06 * NdV;
    gl_FragColor = vec4(base, 1.0);
  }
`;

