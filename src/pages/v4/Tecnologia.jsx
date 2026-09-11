import React from "react";
import Seo from "../../components/v4/Seo";
import EscenaConstruccion from "../../components/v4/EscenaConstruccion";
import AgenteEjemplo from "../../components/v4/AgenteEjemplo";
import { Cabecera, Cierre, Grid, Hero, Pagina, Section } from "../../components/v4/layout";
import { Boton, Door, Key, Label } from "../../components/v4/primitives";

/** Tecnología · Vera, el cómo (how, parte 2). */

/* Un agente es una carcasa a la que se le da un rol y unas herramientas. Los
   tres pasos son eso: quién es, con qué busca, y qué queda cuando termina. */
const BUILD = [
  {
    num: "01",
    titulo: "Le damos un rol",
    desc: "Perfil sociodemográfico, factores de decisión y contexto de decisión.",
    rotulo: "Lo que cambia",
    eco: "El perfil marca sus necesidades; los factores, las preguntas que se hace",
    tag: "Rol",
  },
  {
    num: "02",
    titulo: "Le damos herramientas",
    desc: "Las mismas que usamos cualquiera para buscar: buscadores, plataformas y modelos.",
    rotulo: "Lo que cambia",
    eco: "Si busca con lo mismo que tu consumidor, se comporta como él",
    tag: "Herramientas",
  },
  {
    num: "03",
    titulo: "Observamos lo que hace",
    desc: "Todos los comportamientos posibles dentro de la Navegación Activa.",
    rotulo: "Lo que cambia",
    eco: "Aparecen los sitios donde tu marca puede ser la respuesta",
    tag: "Comportamiento",
  },
];

/* El output de Vera no es "el recorrido": son los sitios donde la marca se
   convierte en la respuesta. Se nombran tal cual, sin abstraerlos. */
const SITIOS = [
  { titulo: "Artículos de web", texto: "Comparativas, análisis y guías de compra donde se descartan marcas." },
  { titulo: "Vídeos de YouTube", texto: "La review larga que se ve antes de decidir." },
  { titulo: "Posts de redes sociales", texto: "Lo que se consulta cuando la duda ya tiene nombre." },
  { titulo: "Conversaciones de IA", texto: "La respuesta del modelo, y las fuentes que cita para darla." },
];

const AGENTE = {
  quien: "Mujer, 35 años, Madrid",
  campos: [
    { clave: "Factores de decisión", valor: "Consumo, precio y tamaño del maletero." },
    { clave: "Contexto", valor: "Cambia de coche en los próximos tres meses." },
  ],
};

const PREGUNTAS = [
  { texto: "«¿cuáles son los mejores SUV híbridos?»", donde: "ChatGPT" },
  { texto: "«prestaciones Kia Sportage vs Hyundai Tucson»", donde: "Web", abre: true },
  { texto: "«vídeo review de Kia Sportage»", donde: "YouTube" },
];

const ATERRIZA = {
  rotulo: "La segunda pregunta la lleva a",
  sitios: [
    "Comparativa en un medio de motor",
    "Sección de pruebas de un generalista",
    "Ficha de un comparador de precios",
  ],
};

export default function Tecnologia() {
  return (
    <Pagina activo="Tecnología">
      <Seo
        path="/technology"
        title="Vera — cómo predecimos dónde va a buscar tu consumidor | Advia"
        description="Vera simula consumidores sintéticos que recorren la decisión antes que el tuyo, y devuelve los sitios donde tu marca puede ser la respuesta."
      />

      <Hero
        titular={
          <>
            Cómo sabemos qué va a preguntar tu consumidor, y <Key>dónde</Key>
          </>
        }
        lede="No adivinamos intenciones: observamos recorridos de Navegación Activa y los capitalizamos."
      />

      <Section>
        <Cabecera
          titular={
            <>
              Vera es un motor de <Key>simulación</Key>
            </>
          }
          lede="Usa consumidores sintéticos para entender la Navegación Activa de tus consumidores. Un agente es una carcasa: lo que lo convierte en tu consumidor es el rol que le damos y las herramientas con las que busca."
        />
        <div className="v4-mt-12">
          <EscenaConstruccion pasos={BUILD} />
        </div>
      </Section>

      <Section surface="graphite">
        <Cabecera
          titular={
            <>
              Los sitios clave donde tu marca se convertirá en la <Key>respuesta</Key>
            </>
          }
          lede="Eso es lo que devuelve Vera. No un informe de intenciones: los sitios concretos donde la pregunta ya está hecha."
        />
        <Grid cols={2} className="v4-mt-12">
          {SITIOS.map((sitio, i) => (
            <article key={sitio.titulo} className="v4-card">
              <Label tono="gold">{`0${i + 1}`}</Label>
              <div className="v4-body v4-strong">{sitio.titulo}</div>
              <p className="v4-body">{sitio.texto}</p>
            </article>
          ))}
        </Grid>
        <div className="v4-mt-10">
          <Door href="/products">Qué activamos sobre esos sitios</Door>
        </div>
      </Section>

      <Section>
        <Cabecera
          titular={
            <>
              Un agente, entre <Key>miles</Key>
            </>
          }
          lede="Sus factores de decisión le dictan las preguntas, y cada pregunta la deja en un sitio distinto. Multiplica esto por miles de agentes y tienes el mapa."
        />
        <AgenteEjemplo
          nota="Boceto · pendiente de animar"
          agente={AGENTE}
          preguntas={PREGUNTAS}
          aterriza={ATERRIZA}
          pie="Y así miles de agentes a la vez: lo que en uno es una anécdota, en miles es un volumen de audiencia planificable."
        />
      </Section>

      <Section surface="inset">
        <Cabecera
          titular={
            <>
              La Navegación Activa <Key>evoluciona</Key>, y tus consumidores también
            </>
          }
          lede="Por eso no trabajamos en estático. En precampaña vemos la Navegación Activa actual, y de ahí en adelante la vamos evolucionando: cuáles son los espacios más relevantes para tu marca en cada momento, para seguir mejorando la comunicación con tus consumidores durante toda su relación contigo."
        />
      </Section>

      <Cierre
        titular={
          <>
            Ver <Key>Vera</Key> en acción
          </>
        }
        lede="Te enseñamos el mapa de preguntas de tu target sobre una categoría real, y los sitios donde puedes responderlas."
        cta={<Boton href="/contact">Pedir una demo</Boton>}
      />
    </Pagina>
  );
}
