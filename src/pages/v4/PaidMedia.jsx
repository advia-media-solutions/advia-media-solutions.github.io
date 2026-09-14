import React from "react";
import Seo from "../../components/v4/Seo";
import { Cabecera, Cierre, Hero, Pagina, Section } from "../../components/v4/layout";
import { Boton, Key } from "../../components/v4/primitives";
import Canales from "../../components/v4/Canales";

/** Productos › Navegación Activa en Canales Digitales · donde la presencia se compra. */

/* Los tres canales, con los argumentos de las láminas del pitch reducidos a
   medida de web: un titular y una línea por punto. */
const CANALES = [
  {
    nombre: "Web",
    maqueta: "web",
    puntos: [
      {
        titulo: "Escala donde te buscan sin saberlo",
        texto:
          "Activamos en los artículos que tus consumidores leen mientras buscan respuestas. " +
          "Es el canal que aporta el volumen.",
      },
      {
        titulo: "Presencia en las fuentes que alimentan a la IA",
        texto:
          "Cuando alguien pregunta a ChatGPT o Gemini, la respuesta sale de algún sitio. " +
          "Identificamos esas fuentes y activamos en ellas.",
      },
      {
        titulo: "Un formato para cada objetivo",
        texto:
          "Vídeo para notoriedad, rich media para captar atención, native para tráfico " +
          "cualificado.",
      },
    ],
  },
  {
    nombre: "YouTube",
    maqueta: "video",
    puntos: [
      {
        titulo: "Máxima relevancia en el momento de consumo",
        texto:
          "Activamos mientras está viendo contenido de tu categoría. El anuncio no " +
          "interrumpe: completa lo que ya estaba buscando.",
      },
      {
        titulo: "Presencia en los vídeos que cita la IA",
        texto: "Los modelos también se apoyan en vídeo para construir sus respuestas.",
      },
      {
        titulo: "El formato de mayor atención, con intención detrás",
        texto:
          "Sin depender del targeting por intereses o afinidad. Hasta 2× más engagement.",
      },
    ],
  },
  {
    nombre: "Redes sociales",
    maqueta: "feed",
    wip: true,
  },
];

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
              Tus consumidores buscan información en distintos canales, y hay que ser la
              respuesta en <Key>todos ellos</Key>
            </>
          }
          lede="Una estrategia de mid funnel holística que te convierte en la respuesta que tus consumidores aún no saben que necesitan, de manera coherente y allí donde te están buscando."
        />
        <Canales canales={CANALES} />
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
