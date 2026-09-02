import React, { useEffect, useState } from "react";
import Seo from "../../../components/v4/Seo";
import { Hero, Pagina, Section } from "../../../components/v4/layout";
import { Boton, Key } from "../../../components/v4/primitives";
import { Articulos, ArticuloDestacado, Esqueleto, Estado } from "../../../components/v4/blog";
import { blogApiService } from "../../../services/blogApi";

/**
 * Blog · portada.
 *
 * Migración de estilo: la carga de datos y los textos son los de la versión
 * anterior. Lo que cambia es el chrome (nav y footer de v4) y que las fichas
 * pasan a ser piezas del design system.
 */

export default function BlogHome() {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true);
        const respuesta = await blogApiService.getArticlesForHomepage();
        setArticulos(respuesta.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, []);

  const ultimo = articulos[0];
  const resto = articulos.slice(1, 7);

  return (
    <Pagina activo="Blog" seccion="blog">
      <Seo
        path="/blog"
        title="Blog ADVIA — Navegación Activa y publicidad que responde | Advia"
        description="Novedades y noticias sobre Advia y la Navegación Activa. Explora con nosotros cómo convertir la publicidad en respuestas."
      />

      <Hero
        titular={
          <>
            Blog <Key>ADVIA</Key>
          </>
        }
        lede="Novedades y noticias sobre Advia y la Navegación Activa. Explora con nosotros cómo convertir la publicidad en respuestas"
      />

      <Section className="v4-sec--pegada">
        {cargando ? <Esqueleto fichas={3} /> : null}
        {error ? (
          <Estado>Error al cargar artículos. {error}. Por favor, inténtalo de nuevo más tarde.</Estado>
        ) : null}

        {!cargando && !error ? (
          <>
            {ultimo ? <ArticuloDestacado articulo={ultimo} /> : null}

            {resto.length > 0 ? (
              <div className="v4-mt-16">
                <h2 className="v4-subheading">Más artículos</h2>
                <div className="v4-mt-8">
                  <Articulos items={resto} />
                </div>
              </div>
            ) : null}

            {!ultimo ? <Estado>No hay artículos disponibles en este momento.</Estado> : null}

            <div className="v4-btn-row v4-mt-16">
              <Boton href="/blog/articles" variant="ghost">
                Ver todos los artículos
              </Boton>
            </div>
          </>
        ) : null}
      </Section>
    </Pagina>
  );
}
