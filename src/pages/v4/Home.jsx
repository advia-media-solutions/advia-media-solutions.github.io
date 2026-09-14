import React from "react";
import Seo from "../../components/v4/Seo";
import EsferaHero from "../../components/v4/EsferaHero";
import Recorrido from "../../components/v4/Recorrido";
import { Cabecera, Cierre, Hero, Pagina, Section, Split } from "../../components/v4/layout";
import { Boton, Door, Key, Label, Nota } from "../../components/v4/primitives";
import { Bloque, Bloques } from "../../components/v4/blocks";

/**
 * Inicio · el Golden Circle comprimido (why → how → what).
 *
 * La unidad de valor es LA RESPUESTA. El formato que adopta — anuncio,
 * artículo, review, cita de un LLM — es consecuencia de dónde ocurre la
 * pregunta. El scroll 4 es el que carga ese giro.
 */

/* Los dos momentos, uno enfrente del otro. El rótulo lleva filete: es la
   clave de lectura del bloque —pasiva contra activa—, no un pie de foto, así
   que se lee antes que el párrafo y no después. */
const MOMENTOS = [
  {
    label: "Navegación pasiva",
    destacado: false,
    texto:
      "Esos momentos de entretenimiento en los que scrolleamos redes sociales o leemos " +
      "nuestras cabeceras favoritas. Somos pasivos al medio: es el editor o un algoritmo " +
      "quien elige lo que sale en pantalla.",
  },
  {
    label: "Navegación activa",
    destacado: true,
    texto:
      "Frente a una duda, pregunta, situación o frustración, cuando tenemos una decisión " +
      "que tomar y buscamos información de cara a tomar la mejor decisión. Aquí tu marca " +
      "puede ser la respuesta que el consumidor necesita.",
  },
];

/* Las cinco preguntas de una misma decisión: es el recorrido que ningún plan
   de medios contempla, y el que dibuja el camino de las bolas. */
const RECORRIDO = [
  { chip: "ChatGPT", texto: "«¿cuáles son los mejores SUV híbridos?»" },
  { chip: "Web", texto: "«prestaciones Kia Sportage vs Hyundai Tucson»" },
  { chip: "YouTube", texto: "«vídeo review de Kia Sportage»" },
  { chip: "Web", texto: "«coches chinos SUV»" },
  { chip: "YouTube", texto: "«Omoda vs MG vs BYD»" },
];

function PanelMomento() {
  return (
    <div className="v4-card" data-size="lg">
      {MOMENTOS.map((m) => (
        <div key={m.label} className="v4-momento" data-destacado={m.destacado ? "true" : undefined}>
          <Label tono={m.destacado ? "gold" : "faint"} tamano="m">
            {m.label}
          </Label>
          <p className="v4-body v4-mt-5">{m.texto}</p>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <Pagina>
      <Seo
        path="/"
        title="Advia — Turning ads into answers"
        description="Predecimos dónde busca tu consumidor para decidir y ponemos ahí la respuesta de tu marca: web, YouTube y respuestas de la IA."
      />

      <Hero
        pieza={<EsferaHero />}
        titular={
          <>
            Turning ads into <Key>answers</Key>
          </>
        }
        lede="Cuando alguien busca para decidir, hay una respuesta que le sirve. Trabajamos para que sea la de tu marca, y para que llegue con la forma que admite ese momento."
        acciones={
          <>
            <Boton href="/navegacion-activa">Cómo podemos aportarte valor</Boton>
            <Boton href="/about" variant="ghost">
              Por qué existe Advia
            </Boton>
          </>
        }
      />

      <Section>
        <Split>
          <div>
            <Cabecera
              titular={
                <>
                  Una marca aporta valor cuando se convierte en la respuesta a la necesidad de
                  su consumidor, durante su <Key>Navegación Activa</Key>
                </>
              }
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
          titular={
            <>
              Advia es capaz de identificar esos momentos de Navegación Activa gracias a
              nuestra tecnología, <Key>Vera</Key>
            </>
          }
          lede="Vera simula el comportamiento de tu consumidor a través de cientos de consumidores sintéticos. Nos ponemos en la piel de tu consumidor para saber dónde le serás útil."
        />
        <div className="v4-mt-10">
          <Door href="/technology">Cómo funciona Vera</Door>
        </div>
      </Section>

      <Section>
        <Cabecera
          titular={
            <>
              Tu consumidor elige a través de muchos canales, tú tienes que estar presente en{" "}
              <Key>todos ellos</Key>
            </>
          }
          lede="Distintas preguntas, en distintos momentos y a través de distintos canales. Nuestro trabajo es que tú siempre estés presente."
        />
        <Recorrido
          paradas={RECORRIDO}
          nota={
            <Nota meta="Su decisión no ocurre en un canal: ocurre en cinco preguntas que ningún plan de medios contempla.">
              <span className="v4-strong">Mujer de 35 años</span> quiere cambiar a un coche más
              eficiente.
            </Nota>
          }
        />
        <Bloques>
          <Bloque
            titulo="Navegación Activa en Canales Digitales"
            texto="Hay inventario en esa parada, así que se puja por él."
          >
            <Door href="/products/paid-media">Ver el producto</Door>
          </Bloque>
          <Bloque
            invertida
            titulo="Navegación Activa en Entornos Conversacionales"
            texto="No hay inventario que comprar: la única vía es ser la fuente que la IA cita."
          >
            <Door href="/products/geo">Ver el producto</Door>
          </Bloque>
        </Bloques>
      </Section>

      <Cierre
        titular={
          <>
            Cuéntanos tu objetivo, convirtamos tu marca en la <Key>respuesta</Key> que el
            consumidor necesita
          </>
        }
        cta={<Boton href="/contact">Conoce Advia</Boton>}
      />
    </Pagina>
  );
}
