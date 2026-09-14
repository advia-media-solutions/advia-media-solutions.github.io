import React, { useEffect, useState } from "react";
import Seo from "../../../components/v4/Seo";
import { Hero, Pagina, Section } from "../../../components/v4/layout";
import { Key } from "../../../components/v4/primitives";
import { Articulos, Esqueleto, Estado, Paginacion } from "../../../components/v4/blog";
import { blogApiService } from "../../../services/blogApi";

/** Blog · listado completo, paginado. */

export default function BlogArticulos() {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true);
        const respuesta = await blogApiService.getArticles(9, pagina);
        setArticulos(respuesta.data || []);
        setTotalPaginas(respuesta.meta?.pagination?.pageCount || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [pagina]);

  const cambiarPagina = (siguiente) => {
    setPagina(siguiente);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Pagina activo="Blog" seccion="blog">
      <Seo
        path="/blog/articles"
        title="Todos los artículos | Blog ADVIA"
        description="Explora nuestra colección completa de artículos sobre Navegación Activa, medios y publicidad que responde."
      />

      <Hero
        titular={
          <>
            Todos los <Key>Artículos</Key>
          </>
        }
        lede="Explora nuestra colección completa de artículos"
      />

      <Section className="v4-sec--pegada">
        {cargando ? <Esqueleto fichas={6} /> : null}
        {error ? (
          <Estado>Error al cargar artículos. {error}. Por favor, inténtalo de nuevo más tarde.</Estado>
        ) : null}

        {!cargando && !error ? (
          articulos.length > 0 ? (
            <>
              <Articulos items={articulos} />
              <Paginacion
                paginaActual={pagina}
                totalPaginas={totalPaginas}
                onCambio={cambiarPagina}
              />
            </>
          ) : (
            <Estado>No hay artículos disponibles en este momento.</Estado>
          )
        ) : null}
      </Section>
    </Pagina>
  );
}
