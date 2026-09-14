import React from "react";
import Seo from "../../components/v4/Seo";
import { Banda, Cabecera, Cierre, Grid, Hero, Pagina, Section } from "../../components/v4/layout";
import { Boton, Cita, Key } from "../../components/v4/primitives";
import { Columnas } from "../../components/v4/blocks";
import Ciclo from "../../components/v4/Ciclo";
import PalabraRotativa from "../../components/v4/PalabraRotativa";
import RespuestaIA from "../../components/v4/RespuestaIA";

/** Productos › Navegación Activa en Entornos Conversacionales · donde la presencia se fabrica. */

/* Las categorías que rotan en el titular: sirve cualquiera, y ese es el punto. */
const CATEGORIAS = ["coche", "cafetera", "teléfono", "bicicleta", "colchón"];

/* Las dos vías de estar dentro de la respuesta. Una se construye, la otra se
   compra, y ahora conviven en el mismo entorno. */
const VIAS = [
  {
    nombre: "Presencia orgánica",
    desc: "Construimos tu presencia orgánica a partir de dónde se informa la IA.",
    destacado: true,
  },
  {
    nombre: "Paid media en ChatGPT",
    desc: "Las simulaciones de Vera nos permiten desarrollar estrategias clave para ChatGPT Ads.",
    destacado: false,
  },
];

/* Lo que aporta Vera a la parte de pago: dónde vas a ser relevante, con qué
   mensaje, y cómo se corrige sobre la marcha. */
const PAID = [
  {
    nombre: "De keywords a hints",
    desc: "Vera nos permite ir más allá de las keywords clásicas y entender dónde vas a ser relevante para tu consumidor.",
  },
  {
    nombre: "Mensajes creativos",
    desc: "Distintos mensajes que responden de verdad a la necesidad que tiene delante tu consumidor.",
  },
  {
    nombre: "Mejora continua",
    desc: "Durante la campaña, Vera nos permite entender qué mensajes funcionan mejor.",
  },
];

const LOOP = [
  {
    chip: "Medimos",
    texto:
      "Simulamos las conversaciones que tus consumidores tienen al decidir, y vemos si estás " +
      "presente de forma orgánica.",
  },
  {
    chip: "Diseñamos",
    texto:
      "Entendemos dónde se informa la IA antes de responderles. Eso es lo que nos permite " +
      "desarrollar estrategias de posicionamiento.",
  },
  {
    chip: "Creamos",
    texto:
      "Con nuestra red de publishers creamos el contenido donde la IA se informará la próxima " +
      "vez que un consumidor esté decidiendo.",
  },
];

const ESTANTERIAS = [
  { nombre: "Editorial", alto: 88 },
  { nombre: "Social", alto: 66 },
  { nombre: "Owned", alto: 24 },
  { nombre: "Multimedia", alto: 72 },
  { nombre: "Autoritario", alto: 80 },
];

export default function Geo() {
  return (
    <Pagina activo="Productos">
      <Seo
        path="/products/geo"
        title="Navegación Activa en Entornos Conversacionales — tu marca en la respuesta de la IA | Advia"
        description="Medimos cómo aparece tu marca en las respuestas de los modelos, decidimos en qué factores pelear y creamos el contenido que la IA cita."
      />

      <Hero
        eyebrow="Convertimos tu marca en la respuesta"
        eyebrowTamano="m"
        titularTamano="l"
        titular={
          <>
            La IA ha cambiado cómo tus consumidores <Key>deciden</Key>. Tienes que cambiar cómo
            te comunicas con ellos
          </>
        }
        lede="Los entornos conversacionales permiten a tus consumidores decidir rápido y con precisión. Vera entiende cómo lo hacen, para que también ahí seas tú la respuesta."
        banda={
          <Banda caption="Simulación de respuesta generativa">
            <RespuestaIA
              antes="Para ese uso, las opciones más recomendadas son "
              marca="[tu marca]"
              despues=", junto con Toyota y Kia, del mismo segmento. Las tres cubren bien lo que buscas y comparten un consumo contenido…"
              fuentes={["motorpasion.com", "youtube.com", "km77.com"]}
            />
          </Banda>
        }
      />

      <Section>
        <Cabecera
          eyebrow="Visibilidad Intencional"
          titular={
            <>
              Cuando un consumidor intenta decidir qué <PalabraRotativa palabras={CATEGORIAS} />{" "}
              comprarse, ¿eres la respuesta que la IA menciona?
            </>
          }
          lede="Cada vez más consumidores confían en la IA para decidir. Estas herramientas agrupan sus datos de entrenamiento y la información que se genera día a día en los canales donde antes decidíamos. Estar ahí es la clave para aumentar tu visibilidad intencional."
        />
        <Grid cols={2} className="v4-mt-12">
          {VIAS.map((v) => (
            <article
              key={v.nombre}
              className="v4-card"
              data-size="lg"
              data-destacada={v.destacado ? "true" : undefined}
            >
              <h3
                className="v4-subheading"
                style={v.destacado ? { color: "var(--accent-gold)" } : undefined}
              >
                {v.nombre}
              </h3>
              <p className="v4-body">{v.desc}</p>
            </article>
          ))}
        </Grid>
        <div className="v4-mt-12">
          <Cita fuente="Blog · Introducción a la Navegación Activa, III">
            «Millones de nuevos prescriptores ultrainformados… y no puedes llamarles para pedirles
            que corrijan su mensaje.»
          </Cita>
        </div>
      </Section>

      <Section surface="graphite">
        <Cabecera
          titular={
            <>
              Construye tu presencia orgánica en modelos <Key>conversacionales</Key>
            </>
          }
          lede="Medimos cómo estás hoy, entendemos de dónde saca la IA sus respuestas y creamos el contenido que citará mañana."
        />
        <div className="v4-mt-16">
          <Ciclo pasos={LOOP} />
        </div>
      </Section>

      <Section>
        <Cabecera
          titular={
            <>
              Solo una fracción pequeña de las fuentes que cita la IA son de tu web. Hacen falta
              las <Key>cinco estanterías</Key>
            </>
          }
          lede="Editorial, social, owned, multimedia y contenido autoritario. La propia es la que menos pesa, y es justo la única que la mayoría trabaja."
        />
        <Columnas items={ESTANTERIAS} destacada="Owned" />
        <p className="v4-label v4-label--faint v4-mt-8">
          Proporción ilustrativa. El reparto real de fuentes citadas se mide por categoría y pende
          de dato real.
        </p>
      </Section>

      <Section surface="inset">
        <Cabecera
          titular={
            <>
              Mientras construimos tu presencia orgánica, la complementamos con{" "}
              <Key>paid media en ChatGPT</Key>
            </>
          }
          lede="Vera nos permite entender cómo se informan tus consumidores y cuándo vas a ser una respuesta relevante para ellos."
        />
        <Grid cols={3} className="v4-mt-12">
          {PAID.map((p) => (
            <article key={p.nombre} className="v4-card">
              <h3 className="v4-subheading">{p.nombre}</h3>
              <p className="v4-body">{p.desc}</p>
            </article>
          ))}
        </Grid>
      </Section>

      <Cierre
        titular={
          <>
            Pide un análisis de tu <Key>visibilidad en IA</Key>
          </>
        }
        lede="Te enseñamos cuánto apareces hoy en las respuestas de tu categoría, frente a quién y por qué factores."
        cta={<Boton href="/contact">Pedir el análisis</Boton>}
      />
    </Pagina>
  );
}
