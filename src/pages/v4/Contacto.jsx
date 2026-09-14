import React from "react";
import Seo from "../../components/v4/Seo";
import { Cabecera, Hero, Pagina, Section, Split } from "../../components/v4/layout";
import { Key } from "../../components/v4/primitives";

/**
 * Contacto · el destino de todos los CTA del sitio.
 *
 * Migración de estilo, no de contenido: los textos son los mismos que traía la
 * página anterior. Lo que cambia es el chrome — nav y footer de v4 — y que todo
 * pasa a apoyarse en tokens.css en vez de en las clases corporate.
 */

export default function Contacto() {
  return (
    <Pagina>
      <Seo
        path="/contact"
        title="Contacto — hablemos de tu objetivo | Advia"
        description="¿Listo para transformar tu estrategia de marketing? Escríbenos a contact@advia.tech o visítanos en el Campus de Google en Madrid."
      />

      <Hero
        titular={
          <>
            Construyamos <Key>juntos</Key> el Futuro
          </>
        }
        lede="¿Listo para transformar tu estrategia de marketing? Nuestro equipo está aquí para ayudarte a alcanzar tus objetivos. Contáctanos y descubre cómo podemos potenciar tu presencia digital con soluciones innovadoras y personalizadas."
        acciones={
          <a className="v4-btn v4-btn--primary" href="mailto:contact@advia.tech">
            contact@advia.tech
          </a>
        }
      />

      <Section>
        <Split align="start">
          <Cabecera
            ancho="100%"
            titular={
              <>
                Visítanos en Google for Startups <Key>Campus</Key>
              </>
            }
            lede="Nos enorgullece formar parte del programa Google for Startups. Te invitamos a visitarnos en nuestras oficinas ubicadas en el Campus de Google en Madrid, donde la innovación y la tecnología se encuentran."
          />
          <div className="v4-card" data-size="lg">
            <p className="v4-mono">
              Paseo de la Castellana 154, 8 Izquierda
              <br />
              28046 Madrid
            </p>
          </div>
        </Split>
      </Section>
    </Pagina>
  );
}
