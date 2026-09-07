import React from "react";
import Seo from "../../components/v4/Seo";
import { Banda, Cabecera, Cierre, Grid, Hero, Pagina, Section, Split } from "../../components/v4/layout";
import { Boton, Cita, Key, Nota } from "../../components/v4/primitives";
import { Columnas, PanelDatos } from "../../components/v4/blocks";
import Ciclo from "../../components/v4/Ciclo";
import RespuestaIA from "../../components/v4/RespuestaIA";

/** Productos › Navegación Activa en Entornos Conversacionales · donde la presencia se fabrica. */

/* Lo que ha cambiado en el consumo de información, contado sin comparar con
   otros medios: la comparación con la TV desconcertaba más que aclaraba. */
const CAMBIO = [
  {
    nombre: "Pregunta, no busca",
    desc: "Una consulta en lenguaje natural sustituye a diez pestañas abiertas.",
    destacado: false,
  },
  {
    nombre: "Se fía",
    desc: "La respuesta no parece publicidad, así que pesa como el consejo de alguien que sabe.",
    destacado: false,
  },
  {
    nombre: "Y decide con ella",
    desc: "Elige entre el puñado de marcas que el modelo nombra. Si no estás, no compites.",
    destacado: true,
  },
];

const LOOP = [
  { chip: "Medimos", texto: "Cómo apareces hoy en las respuestas de tu categoría." },
  { chip: "Diseñamos", texto: "En qué factores merece la pena pelear, y en cuáles no." },
  { chip: "Creamos", texto: "El contenido que la IA cita, donde la IA se informa." },
];

const SHARE = [
  { nombre: "Tu marca", etiqueta: "categoría", ancho: 46 },
  { nombre: "Competidor A", etiqueta: "categoría", ancho: 68 },
  { nombre: "Competidor B", etiqueta: "categoría", ancho: 31 },
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
        miga="Navegación Activa en Entornos Conversacionales"
        eyebrow="Donde la respuesta se fabrica"
        titular={
          <>
            Tu marca en la <Key>respuesta</Key> de la IA
          </>
        }
        lede="Cuando alguien pregunta por tu categoría, el modelo contesta con un puñado de marcas y unas cuantas fuentes. Trabajamos para que estés entre ellas."
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
              La IA es el consejero del que todo el mundo se <Key>fía</Key>
            </>
          }
          lede="El consumo de información ha cambiado de raíz: tu consumidor pregunta a un modelo y actúa sobre lo que le contesta. Estar dentro de esa recomendación es lo que llamamos Visibilidad Intencional, y es la posición que decide quién entra en la lista y quién no."
        />
        <Grid cols={3} className="v4-mt-12">
          {CAMBIO.map((m) => (
            <article
              key={m.nombre}
              className="v4-card"
              data-destacada={m.destacado ? "true" : undefined}
            >
              <h3 className="v4-subheading" style={m.destacado ? { color: "var(--accent-gold)" } : undefined}>
                {m.nombre}
              </h3>
              <p className="v4-body">{m.desc}</p>
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
              No vendemos un dashboard: cerramos el <Key>ciclo</Key>
            </>
          }
          lede="Medimos cómo estás, decidimos dónde merece la pena pelear y creamos el contenido que el modelo cita."
        />
        <div className="v4-mt-16">
          <Ciclo pasos={LOOP} />
        </div>
      </Section>

      <Section>
        <Split cols="2-3" align="start">
          <Cabecera
            eyebrow="Medimos"
            ancho="100%"
            titular={
              <>
                Del Share of Search al <Key>Share of Answer</Key>
              </>
            }
            lede="Cuánto apareces, en qué posición, frente a quién y por qué factores."
          />
          <PanelDatos
            caption="Share of Answer"
            meta="Cuota de respuesta"
            items={SHARE}
            neutraSalvo="Tu marca"
            nota="Reparto ilustrativo. Cuotas pendientes de dato real."
          />
        </Split>
      </Section>

      <Section surface="inset">
        <Cabecera
          eyebrow="Diseñamos la estrategia"
          titular={
            <>
              Medir no mueve nada. Decidimos <Key>en qué factores merece la pena pelear</Key>
            </>
          }
          lede="Entendemos por qué tu presencia es la que es, factor a factor, y concentramos el esfuerzo ahí. No hace falta salir primero en todo."
        />
        <div className="v4-mt-10" style={{ maxWidth: "900px" }}>
          <Nota>
            Salir primero en todo no es un objetivo alcanzable ni útil: los modelos citan por
            factores distintos según la pregunta. Elegir dos o tres donde sí puedes ganar rinde más
            que repartir el esfuerzo entre veinte.
          </Nota>
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
          eyebrow="Creamos el contenido"
          titular={
            <>
              El <Key>loop</Key> es el producto
            </>
          }
          lede="AI-Readable Content: contenido editorial diseñado para que los modelos lo citen, publicado donde la IA se informa. Después volvemos a medir, y el reparto de fuentes dice si funcionó."
        />
        <p className="v4-label v4-label--faint v4-mt-8">
          Nomenclatura a unificar antes de publicar: AI-Readable vs. AI-Friendly Content.
        </p>
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
