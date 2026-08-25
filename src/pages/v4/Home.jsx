import React from "react";
import Seo from "../../components/v4/Seo";
import { Banda, Cabecera, Cierre, Hero, Pagina, Section, Split } from "../../components/v4/layout";
import { Boton, Door, Key, Label } from "../../components/v4/primitives";
import { Bloque, Bloques, Filas, PanelDatos, Pasos } from "../../components/v4/blocks";

/**
 * Inicio · el Golden Circle comprimido (why → how → what).
 *
 * La unidad de valor es LA RESPUESTA. El formato que adopta — anuncio,
 * artículo, review, cita de un LLM — es consecuencia de dónde ocurre la
 * pregunta. El scroll 4 es el que carga ese giro.
 */

/**
 * Preguntas ILUSTRATIVAS de un recorrido de decisión. No son datos: están
 * marcadas como tales bajo la banda. Si algún día Vera puede servir preguntas
 * reales agregadas por categoría, este es el sitio donde entran.
 */
const PREGUNTAS = [
  { texto: "¿qué SUV híbrido rinde mejor en ciudad?", destacada: true },
  { texto: "auriculares para correr que aguanten la lluvia", destacada: false },
  { texto: "¿me compensa cambiar de tarifa este año?", destacada: false },
  { texto: "seguro de coche para conductor novel", destacada: true },
  { texto: "¿qué portátil aguanta edición de vídeo?", destacada: false },
  { texto: "opiniones de quien ya lo tiene", destacada: false },
];

const PASOS_VERA = [
  {
    titulo: "Perfil",
    texto: "Sociodemo, interés y contexto de decisión: eso dirige toda su navegación.",
  },
  {
    titulo: "Herramientas",
    texto: "Buscadores, plataformas y LLMs. Cada agente busca como buscaría su perfil real.",
  },
  {
    titulo: "Touchpoints",
    texto: "Recogemos el recorrido entero y cualificamos cada parada.",
  },
];

const FUENTES = [
  { nombre: "Medio de motor · comparativa", etiqueta: "Open Web", ancho: 82 },
  { nombre: "YouTube · review de producto", etiqueta: "Vídeo", ancho: 64 },
  { nombre: "Respuestas de IA · consulta de compra", etiqueta: "LLM", ancho: 53 },
  { nombre: "Medio generalista · sección de pruebas", etiqueta: "Open Web", ancho: 38 },
];

const SUPERFICIES = [
  {
    num: "01",
    titulo: "Buscador",
    desc: "Compara opciones y descarta candidatos.",
    rotulo: "La respuesta toma la forma de",
    eco: "Un contenido que resuelve la duda",
    tag: "GEO",
  },
  {
    num: "02",
    titulo: "Web abierta",
    desc: "Lee análisis, pruebas y comparativas.",
    rotulo: "La respuesta toma la forma de",
    eco: "Un anuncio dentro del artículo que ya estaba leyendo",
    tag: "Paid Media",
  },
  {
    num: "03",
    titulo: "Vídeo",
    desc: "Busca la review larga antes de cerrar.",
    rotulo: "La respuesta toma la forma de",
    eco: "Tu marca en el momento en que se decide",
    tag: "Paid Media",
  },
  {
    num: "04",
    titulo: "Respuesta de la IA",
    desc: "Pregunta directamente qué le conviene.",
    rotulo: "La respuesta toma la forma de",
    eco: "Una cita del modelo entre las marcas que recomienda",
    tag: "GEO",
  },
];

function BandaPreguntas() {
  return (
    <Banda
      caption="Lo que se pregunta antes de decidir"
      nota="Preguntas ilustrativas de un recorrido de decisión real."
    >
      <div className="v4-chips">
        {PREGUNTAS.map((p) => (
          <span
            key={p.texto}
            className="v4-pregunta"
            data-destacada={p.destacada ? "true" : undefined}
          >
            {p.destacada ? <span className="v4-punto" /> : null}
            {p.texto}
          </span>
        ))}
      </div>
    </Banda>
  );
}

function PanelMomento() {
  return (
    <div className="v4-card" data-size="lg">
      <div>
        <Label tono="faint">Navegación pasiva</Label>
        <div className="v4-body v4-strong v4-mt-5">Elige el algoritmo</div>
        <p className="v4-body">
          El contenido llega solo. No había pregunta, así que no hay nada que responder.
        </p>
      </div>
      <div style={{ borderTop: "1px solid var(--v4-line)", paddingTop: "var(--space-6)" }}>
        <Label tono="gold">Navegación activa</Label>
        <div className="v4-body v4-strong v4-mt-5">Eliges tú</div>
        <p className="v4-body">
          Hay una duda concreta y una búsqueda detrás. Aquí una marca puede servir de algo.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Pagina heroOscuro>
      <Seo
        path="/"
        title="Advia — Turning ads into answers"
        description="Predecimos dónde busca tu consumidor para decidir y ponemos ahí la respuesta de tu marca: Open Web, YouTube y respuestas de la IA."
      />

      <Hero
        oscuro
        campo
        eyebrow="Advia · Navegación Activa"
        xl
        titular={
          <>
            Turning ads into <Key>answers</Key>.
          </>
        }
        lede="Cuando alguien busca para decidir, hay una respuesta que le sirve. Trabajamos para que sea la de tu marca, y para que llegue con la forma que admite ese momento."
        acciones={
          <>
            <Boton href="/contact">Cuéntanos tu objetivo</Boton>
            <Boton href="/about" variant="ghost">
              Por qué existe Advia
            </Boton>
          </>
        }
        banda={<BandaPreguntas />}
      />

      <Section>
        <Split>
          <div>
            <Cabecera
              eyebrow="El momento"
              titular={
                <>
                  Una marca aporta valor cuando responde a lo que alguien está{" "}
                  <Key>buscando</Key>.
                </>
              }
              lede="A ese momento lo llamamos Navegación Activa. Es el único en el que una marca puede dejar de interrumpir y empezar a servir de algo."
            />
            <div className="v4-mt-8">
              <Door href="/navegacion-activa">Qué es la Navegación Activa</Door>
            </div>
          </div>
          <PanelMomento />
        </Split>
      </Section>

      <Section surface="graphite">
        <Cabecera
          eyebrow="La máquina"
          titular={
            <>
              Vera sabe qué va a preguntar tu consumidor, y <Key>dónde</Key>.
            </>
          }
          lede="Miles de consumidores simulados recorren la decisión antes que él. No adivinamos intenciones: observamos recorridos y los cualificamos parada a parada."
        />
        <div className="v4-mt-16">
          <Split cols="2-3" align="start">
            <div>
              <Pasos items={PASOS_VERA} />
              <Door href="/technology">Cómo funciona Vera</Door>
            </div>
            <PanelDatos
              caption="Dónde va a preguntar"
              meta="Cuota del recorrido"
              items={FUENTES}
              nota="Fuentes de ejemplo. Cuotas pendientes de dato real."
            />
          </Split>
        </div>
      </Section>

      <Section>
        <Cabecera
          eyebrow="Las respuestas"
          titular={
            <>
              La respuesta que busca no siempre tiene la misma <Key>forma</Key>.
            </>
          }
          lede="La misma persona pregunta en cuatro sitios distintos, y cada uno admite una forma de respuesta. Nuestro trabajo es que en los cuatro haya una tuya."
        />
        <div className="v4-mt-16">
          <Filas items={SUPERFICIES} />
        </div>
        <p className="v4-lede v4-mt-16">
          Donde hay inventario, la presencia se compra. Donde no lo hay, se fabrica. Por eso
          hay dos productos y no uno.
        </p>
        <Bloques>
          <Bloque
            label="Donde la respuesta se compra"
            titulo="Navegación Activa en Paid Media"
            texto="Hay inventario en esa parada, así que se puja por él: campañas en Open Web y YouTube colocadas sobre las fuentes del recorrido."
          >
            <Door href="/products/paid-media">Ver el producto</Door>
          </Bloque>
          <Bloque
            invertida
            label="Donde la respuesta se fabrica"
            titulo="Visibilidad Intencional en IA: GEO"
            texto="No hay inventario que comprar: la única vía es ser la fuente que el modelo cita. Medimos, decidimos dónde pelear y creamos ese contenido."
          >
            <Door href="/products/geo">Ver el producto</Door>
          </Bloque>
        </Bloques>
      </Section>

      <Cierre
        titular={
          <>
            Cuéntanos tu objetivo y te enseñamos qué está preguntando tu consumidor, y{" "}
            <Key>dónde puedes responderle</Key>.
          </>
        }
        lede="Antes de activar nada. Y después no nos vamos: activamos, medimos qué cambió y decidimos la siguiente."
        cta={<Boton href="/contact">Pedir una precampaña</Boton>}
      />
    </Pagina>
  );
}
