import React from "react";
import Seo from "../../components/v4/Seo";
import EscenaConstruccion from "../../components/v4/EscenaConstruccion";
import { Cabecera, Cierre, Grid, Hero, Pagina, Section, Split } from "../../components/v4/layout";
import { Boton, Door, Key, Label } from "../../components/v4/primitives";
import { Filas, PanelDatos } from "../../components/v4/blocks";


/** Tecnología · Vera, el cómo (how, parte 2). */

const BUILD = [
  {
    num: "01",
    titulo: "Le damos un rol",
    desc: "Sociodemo, interés y contexto de decisión.",
    rotulo: "Lo que cambia",
    eco: "El contexto de decisión dirige toda su navegación",
    tag: "Perfil",
  },
  {
    num: "02",
    titulo: "Le damos herramientas",
    desc: "Buscadores, plataformas y LLMs.",
    rotulo: "Lo que cambia",
    eco: "Cada agente busca como buscaría su perfil real",
    tag: "Búsqueda",
  },
  {
    num: "03",
    titulo: "Recogemos el recorrido",
    desc: "Sites, vídeos y fuentes visitadas.",
    rotulo: "Lo que cambia",
    eco: "Cada parada queda cualificada, no solo contada",
    tag: "Touchpoints",
  },
];

const FUENTES = [
  { nombre: "Medio de motor · comparativa", etiqueta: "Open Web", ancho: 82 },
  { nombre: "YouTube · review de producto", etiqueta: "Vídeo", ancho: 64 },
  { nombre: "Respuestas de IA · consulta de compra", etiqueta: "LLM", ancho: 53 },
  { nombre: "Medio generalista · sección de pruebas", etiqueta: "Open Web", ancho: 38 },
];

const CUADRANTES = [
  { titulo: "High intent · Low impact", items: ["SEO", "SEM (Google, Bing)"], destacado: false },
  { titulo: "High intent · High impact", items: ["Advia"], destacado: true },
  {
    titulo: "Low intent · Low impact",
    items: ["Retargeting", "Contextual semántica"],
    destacado: false,
  },
  {
    titulo: "Low intent · High impact",
    items: ["Open Exchange", "Native Ads", "Social Ads"],
    destacado: false,
  },
];

const CICLO = [
  {
    label: "Antes · pre",
    titulo: "Qué va a preguntar, y dónde",
    items: ["Forecast por KPI", "Las paradas del recorrido", "Mapa de audiencia"],
    invertida: false,
  },
  {
    label: "Después · post",
    titulo: "Si la respuesta sirvió",
    items: ["Intent score", "Calidad del impacto", "Qué cambiar en la siguiente"],
    invertida: true,
  },
];

function Cuadrante() {
  return (
    <Grid cols={2} className="v4-mt-12">
      {CUADRANTES.map((c) => (
        <article
          key={c.titulo}
          className="v4-card"
          data-invertida={c.destacado ? "true" : undefined}
          style={{ minHeight: "190px" }}
        >
          <Label tono={c.destacado ? "gold" : "faint"}>{c.titulo}</Label>
          <div className="v4-stack" style={{ gap: "var(--space-2)" }}>
            {c.items.map((item) => (
              <span
                key={item}
                className="v4-body"
                style={{
                  color: c.destacado ? "var(--v4-fg)" : "var(--v4-muted)",
                  fontWeight: c.destacado ? "var(--fw-bold)" : "var(--fw-regular)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </article>
      ))}
    </Grid>
  );
}

function Ciclo() {
  return (
    <Grid cols={2} className="v4-mt-12">
      {CICLO.map((panel) => (
        <article
          key={panel.label}
          className="v4-card"
          data-size="lg"
          data-invertida={panel.invertida ? "true" : undefined}
        >
          <Label tono="gold">{panel.label}</Label>
          <h3 className="v4-subheading">{panel.titulo}</h3>
          <div>
            {panel.items.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  padding: "var(--space-3) 0",
                  borderTop: "1px solid var(--v4-line)",
                }}
              >
                <span className="v4-punto" />
                <span className="v4-body">{item}</span>
              </div>
            ))}
          </div>
        </article>
      ))}
    </Grid>
  );
}

export default function Tecnologia() {
  return (
    <Pagina activo="Tecnología">
      <Seo
        path="/technology"
        title="Vera — cómo predecimos dónde va a buscar tu consumidor | Advia"
        description="Vera simula miles de consumidores que recorren la decisión antes que el tuyo: perfil, herramientas y touchpoints cualificados uno a uno."
      />

      <Hero
        titular={
          <>
            Cómo sabemos qué va a preguntar tu consumidor, y <Key>dónde</Key>
          </>
        }
        lede="Vera simula miles de consumidores que recorren la decisión antes que él. No adivinamos intenciones: observamos recorridos y los cualificamos parada a parada."
      />

      <Section>
        <Cabecera
          titular={
            <>
              Un rol, unas herramientas, y todo lo que hicieron por el <Key>camino</Key>
            </>
          }
        />
        <div className="v4-mt-12">
          <EscenaConstruccion pasos={BUILD} />
        </div>
      </Section>

      <Section surface="graphite">
        <Split cols="2-3" align="start">
          <div>
            <Cabecera
              ancho="100%"
              titular={
                <>
                  Un mapa de preguntas que es <Key>accionable</Key>
                </>
              }
              lede="Cada parada del recorrido es una fuente donde se puede estar. Eso convierte el análisis en inventario."
            />
            <div className="v4-mt-8">
              <Door href="/products">Qué activamos sobre el mapa</Door>
            </div>
          </div>
          <PanelDatos
            caption="Dónde va a preguntar"
            meta="Cuota del recorrido"
            items={FUENTES}
            nota="Fuentes de ejemplo. Cuotas pendientes de dato real."
          />
        </Split>
      </Section>

      <Section>
        <Cabecera
          titular={
            <>
              Intención × impacto: Advia ocupa el cuadrante <Key>vacío</Key>
            </>
          }
          lede="El search llega con intención, pero con poco espacio para la marca. El display tiene espacio de sobra, pero llega sin que nadie preguntara nada."
        />
        <Cuadrante />
      </Section>

      <Section surface="inset">
        <Cabecera
          titular={
            <>
              Es un <Key>ciclo</Key>, no un informe
            </>
          }
          lede="Antes de invertir ves qué va a preguntar tu target y dónde. Después, si la respuesta sirvió y qué cambiar en la siguiente."
        />
        <Ciclo />
      </Section>

      <Cierre
        titular={
          <>
            Ver <Key>Vera</Key> en acción
          </>
        }
        lede="Te enseñamos el mapa de preguntas de tu target sobre una categoría real, con las fuentes y el forecast por KPI."
        cta={<Boton href="/contact">Pedir una demo</Boton>}
      />
    </Pagina>
  );
}
