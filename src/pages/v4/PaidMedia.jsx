import React from "react";
import Seo from "../../components/v4/Seo";
import { Cabecera, Cierre, Grid, Hero, Pagina, Section } from "../../components/v4/layout";
import { Boton, Chips, Hueco, Key, Label } from "../../components/v4/primitives";
import Funnel from "../../components/v4/Funnel";

/** Productos › Navegación Activa en Canales Digitales · donde la presencia se compra. */

const CANALES = [
  {
    nombre: "Web",
    desc: "Donde compara: medios especializados, comparativas y artículos de prueba.",
  },
  {
    nombre: "YouTube",
    desc: "Donde resuelve la duda larga: reviews, comparativas en vídeo y demostraciones.",
  },
  {
    nombre: "Redes sociales",
    desc: "Donde contrasta con otros: opiniones, recomendaciones y experiencias de uso.",
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

function PanelCanal({ canal, num }) {
  return (
    <article className="v4-canal">
      <Label tono="gold">{num}</Label>
      <h3 className="v4-subheading v4-canal__nombre">{canal.nombre}</h3>
      <p className="v4-body v4-canal__desc">{canal.desc}</p>
      <div className="v4-canal__pie">
        <Label tono="faint">Formatos</Label>
        <span className="v4-mono">
          <Hueco />
        </span>
      </div>
    </article>
  );
}

export default function PaidMedia() {
  return (
    <Pagina activo="Productos">
      <Seo
        path="/products/paid-media"
        title="Navegación Activa en Canales Digitales — campañas dentro del recorrido de decisión | Advia"
        description="Campañas en web, YouTube y redes sociales colocadas sobre las fuentes que tu consumidor consulta mientras compara y decide."
      />

      <Hero
        eyebrow="Convertimos tu marca en la respuesta"
        eyebrowTamano="m"
        titularTamano="l"
        titular={
          <>
            Vera identifica dónde vas a ser relevante para tus consumidores y convierte tu
            anuncio en la <Key>respuesta</Key> que necesitan
          </>
        }
        lede="Campañas en medios digitales donde tus consumidores te buscan sin saberlo."
      />

      <Section surface="graphite">
        <Cabecera
          titular={
            <>
              Dónde ocurre cada tipo de búsqueda, y qué formato admite cada <Key>canal</Key>
            </>
          }
        />
        <Grid cols={3} className="v4-mt-12">
          {CANALES.map((c, i) => (
            <PanelCanal key={c.nombre} canal={c} num={`0${i + 1}`} />
          ))}
        </Grid>
        <p className="v4-label v4-label--faint v4-mt-8">
          Pendiente: formatos disponibles por canal.
        </p>
      </Section>

      <Section>
        <Cabecera
          titular={
            <>
              Una estrategia de mid funnel <Key>holística</Key>
            </>
          }
          lede="Te convierte en la respuesta que tus consumidores aún no saben que necesitan, de manera coherente y allí donde te están buscando. Es el tramo que casi nadie cose: de la parte baja de awareness a la consideración."
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
              La Navegación Activa es más <Key>lenta</Key>, y eso juega a tu favor
            </>
          }
          lede="Quien lee para decidir lo hace despacio: mira el vídeo entero, compara y vuelve. Por eso las métricas salen naturalmente más altas —visionado, clics más certeros y mejores tasas de conversión— sin haber comprado más impactos."
        />
        <div className="v4-btn-row v4-mt-10">
          <Boton href="/contact" variant="dark">
            Ver casos reales
          </Boton>
        </div>
        <p className="v4-label v4-label--faint v4-mt-8">
          Pendiente: cifras de campañas activadas y casos de éxito con dato real.
        </p>
      </Section>

      <Section>
        <Cabecera
          titular={
            <>
              El <Key>messy middle</Key>
            </>
          }
          lede="El mid funnel ha sido históricamente el tramo difícil: fragmentado, complejo y sin una forma clara de trabajarlo. Ahí es donde tu consumidor compara y descarta, y donde la Navegación Activa te pone delante."
        />
        <p className="v4-label v4-label--faint v4-mt-8">
          Pendiente: descripción larga del concepto (Claudio).
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
