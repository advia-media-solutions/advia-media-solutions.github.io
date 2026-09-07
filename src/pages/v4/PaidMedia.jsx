import React from "react";
import Seo from "../../components/v4/Seo";
import { Banda, Cabecera, Cierre, Grid, Hero, Pagina, Section } from "../../components/v4/layout";
import { Boton, Chips, Hueco, Key, Label } from "../../components/v4/primitives";
import { TarjetaKpi } from "../../components/v4/blocks";
import Funnel from "../../components/v4/Funnel";

/** Productos › Navegación Activa en Canales Digitales · donde la presencia se compra. */

const TIPOS = [
  {
    num: "01",
    titulo: "Territorios",
    desc: "Capitalizar un territorio que la marca aspira a conquistar.",
  },
  {
    num: "02",
    titulo: "Producto",
    desc: "De los primeros síntomas de necesidad a la compra.",
  },
  {
    num: "03",
    titulo: "Local",
    desc: "El comportamiento de búsqueda alrededor de una ciudad o región.",
  },
];

const CANALES = [
  {
    nombre: "Open Web",
    desc: "Donde compara: medios especializados, comparativas y artículos de prueba.",
  },
  {
    nombre: "YouTube",
    desc: "Donde resuelve la duda larga: reviews, comparativas en vídeo y demostraciones.",
  },
];

const FUNNEL = [
  { label: "Awareness", texto: "Brand-day, skins", peso: 2, destacado: false },
  {
    label: "Advia",
    texto: "De la parte baja de awareness a la consideración",
    peso: 3,
    destacado: true,
  },
  { label: "Performance", texto: "Conversión pura", peso: 2, destacado: false },
];

const KPIS = [
  { label: "Viewability", desc: "vs. benchmark de mercado" },
  { label: "VTR", desc: "vs. benchmark de mercado" },
  { label: "Tiempo de atención", desc: "media por impacto" },
];

const FACTORES = [
  {
    titulo: "Intencionalidad",
    pregunta: "¿Llegó buscando, o le llegó sin pedirlo?",
    subs: [
      ["Clasificación del contenido", "Cómo se clasifica esta página en los motores de búsqueda."],
      ["Volumen de búsqueda", "Qué volumen total de búsquedas relevantes conducen aquí."],
      ["Variedad de búsqueda", "Cuántas búsquedas distintas conducen aquí."],
    ],
  },
  {
    titulo: "Credibilidad",
    pregunta: "¿Le vale como fuente para lo que está decidiendo?",
    subs: [
      ["Medio especializado", "Si la pieza aparece en un medio del sector."],
      ["Profundidad del medio", "Cuántas piezas suyas responden preguntas relevantes."],
      ["Reputación del editor", "Qué peso tiene ese editor en la categoría."],
    ],
  },
  {
    titulo: "Experiencia",
    pregunta: "¿La respuesta encaja con lo que estaba preguntando?",
    subs: [
      ["Encaje del mensaje", "Si lo que dice la marca responde a esa duda concreta."],
      ["Encaje del contenido", "Si la pieza responde de verdad a la pregunta."],
      ["Privacidad", "Si el impacto respeta la privacidad de quien lo recibe."],
    ],
  },
];

function TarjetaFactor({ factor }) {
  return (
    <article className="v4-card" data-kpi="true">
      <div className="v4-dato__head">
        <span className="v4-subheading">{factor.titulo}</span>
        <span className="v4-kpi" style={{ color: "var(--accent-gold)" }}>
          <Hueco />
        </span>
      </div>
      <p className="v4-body">{factor.pregunta}</p>
      <div>
        {factor.subs.map(([nombre, desc]) => (
          <div
            key={nombre}
            style={{ padding: "var(--space-4) 0", borderTop: "1px solid var(--v4-line)" }}
          >
            <div className="v4-body v4-strong" style={{ fontWeight: "var(--fw-semibold)" }}>
              {nombre}
            </div>
            <div className="v4-body-s">{desc}</div>
          </div>
        ))}
      </div>
    </article>
  );
}

function TarjetaTipo({ tipo }) {
  return (
    <article className="v4-card" data-size="lg">
      <span className="v4-fila__num" style={{ fontSize: "var(--fs-code-l)", lineHeight: "var(--lh-code-l)" }}>
        {tipo.num}
      </span>
      <h3 className="v4-subheading">{tipo.titulo}</h3>
      <p className="v4-body" style={{ flexGrow: 1 }}>
        {tipo.desc}
      </p>
      <div style={{ paddingTop: "var(--space-4)", borderTop: "1px solid var(--v4-line)" }}>
        <Label tono="faint">Verticales</Label>
        <div className="v4-mono v4-mt-5">
          <Hueco />
        </div>
      </div>
    </article>
  );
}

function PanelCanal({ canal }) {
  return (
    <article className="v4-panel">
      <h3 className="v4-subheading">{canal.nombre}</h3>
      <p className="v4-body v4-mt-5">{canal.desc}</p>
      {[1, 2, 3].map((n) => (
        <div key={n} className="v4-linea">
          <span className="v4-body">Formato {n}</span>
          <span className="v4-mono">
            <Hueco />
          </span>
        </div>
      ))}
    </article>
  );
}

export default function PaidMedia() {
  return (
    <Pagina activo="Productos">
      <Seo
        path="/products/paid-media"
        title="Navegación Activa en Canales Digitales — campañas dentro del recorrido de decisión | Advia"
        description="Campañas en Open Web y YouTube colocadas sobre las fuentes que tu consumidor consulta mientras compara y decide."
      />

      <Hero
        miga="Navegación Activa en Canales Digitales"
        eyebrow="Donde la respuesta se compra"
        titular={
          <>
            Tu marca dentro de la respuesta que ya estaba <Key>leyendo</Key>
          </>
        }
        lede="Campañas en Open Web y YouTube colocadas sobre las fuentes que Vera ha identificado en el recorrido de decisión de tu target."
        banda={
          <Banda caption="Tres formas de entrar">
            <Chips items={["Territorios", "Producto", "Local"]} />
          </Banda>
        }
      />

      <Section>
        <Cabecera
          titular={
            <>
              No todas las decisiones empiezan en el mismo <Key>sitio</Key>
            </>
          }
        />
        <Grid cols={3} className="v4-mt-12">
          {TIPOS.map((t) => (
            <TarjetaTipo key={t.num} tipo={t} />
          ))}
        </Grid>
      </Section>

      <Section surface="graphite">
        <Cabecera
          titular={
            <>
              Dónde ocurre cada tipo de búsqueda, y qué formato admite cada <Key>canal</Key>
            </>
          }
        />
        <Grid cols={2} className="v4-mt-12">
          {CANALES.map((c) => (
            <PanelCanal key={c.nombre} canal={c} />
          ))}
        </Grid>
      </Section>

      <Section>
        <Cabecera
          titular={
            <>
              Visibilidad donde se <Key>descartan marcas</Key>
            </>
          }
          lede="Es el tramo que casi nadie cose: desde la parte baja de awareness hasta la consideración. Ahí tu consumidor ya está comparando, y sin Navegación Activa te descarta sin haberte visto."
        />
        <Funnel segmentos={FUNNEL} />
        <div className="v4-mt-8">
          <Chips items={["Reach", "Viewability", "VTR", "CTR", "Qualified Visits"]} />
        </div>
      </Section>

      <Section surface="inset">
        <Cabecera
          titular={
            <>
              Quien busca para decidir está más <Key>atento</Key> que quien se entretiene haciendo
              scroll
            </>
          }
          lede="Lee, compara y vuelve. Eso se nota en viewability y en VTR."
        />
        <Grid cols={3} className="v4-mt-12">
          {KPIS.map((k) => (
            <TarjetaKpi key={k.label} label={k.label} valor={<Hueco />} desc={k.desc} />
          ))}
        </Grid>
        <p className="v4-label v4-label--faint v4-mt-8">
          Cifras agregadas de campañas activadas. Pendientes de dato real.
        </p>
      </Section>

      <Section>
        <Cabecera
          titular={
            <>
              La atención dice cuánto te miran. Falta saber si te estaban <Key>buscando</Key>
            </>
          }
          lede="Un formato que bloquea la navegación retiene mucha atención y aun así interrumpe. Valoramos cada impacto desde la perspectiva de quien lo recibe, con tres factores puntuados de 0 a 100."
        />
        <Grid cols={3} className="v4-mt-12">
          {FACTORES.map((f) => (
            <TarjetaFactor key={f.titulo} factor={f} />
          ))}
        </Grid>
        <p className="v4-label v4-label--faint v4-mt-8">
          Los rangos por factor se calculan por campaña. Cifras agregadas pendientes de dato real.
        </p>
      </Section>

      <Cierre
        titular={
          <>
            Precampaña: te enseñamos cómo puedes responder <Key>antes de activar</Key>
          </>
        }
        lede="Con las fuentes concretas del recorrido de tu target y el forecast por KPI."
        cta={<Boton href="/contact">Pedir un análisis precampaña</Boton>}
      />
    </Pagina>
  );
}
