import React from "react";
import Link from "next/link";
import { Door } from "./primitives";

/**
 * Piezas del blog sobre el design system v4.
 *
 * Siguen el patrón de card de la librería: media a sangre con el sello encima,
 * cuerpo compacto, título en cuerpo grande —no en display, que en rejilla
 * grita— y pie de metadatos separado por filete. La ficha entera es el enlace.
 */

export function formatearFecha(valor, largo = false) {
  return new Date(valor).toLocaleDateString("es-ES", {
    year: "numeric",
    month: largo ? "long" : "short",
    day: "numeric",
  });
}

export function truncar(texto, maximo = 150) {
  if (!texto) return "";
  if (texto.length <= maximo) return texto;
  return `${texto.substring(0, maximo).trim()}...`;
}

export function Meta({ articulo, largo, sello }) {
  return (
    <div className="v4-meta">
      {sello && articulo.category ? (
        <span className="v4-sello v4-sello--fijo">{articulo.category.name}</span>
      ) : null}
      <time className="v4-label v4-label--faint" dateTime={articulo.createdAt}>
        {formatearFecha(articulo.createdAt, largo)}
      </time>
      {articulo.author ? (
        <>
          <span className="v4-label v4-meta__sep">·</span>
          <span className="v4-label v4-label--faint">{articulo.author.name}</span>
        </>
      ) : null}
    </div>
  );
}

function Media({ articulo, tamano = "medium" }) {
  const cover = articulo.cover;
  return (
    <div className="v4-ficha__media">
      {cover ? (
        <img
          src={cover.formats?.[tamano]?.url || cover.url}
          alt={cover.alternativeText || articulo.title}
        />
      ) : null}
      {articulo.category ? <span className="v4-sello">{articulo.category.name}</span> : null}
    </div>
  );
}

export function TarjetaArticulo({ articulo }) {
  const href = `/blog/article/${articulo.slug}`;
  return (
    <article className="v4-ficha">
      <Link className="v4-ficha__link" href={href}>
        <span>{articulo.title}</span>
      </Link>
      <Media articulo={articulo} />
      <div className="v4-ficha__cuerpo">
        <h3 className="v4-ficha__titulo">{articulo.title}</h3>
        {articulo.description ? (
          <p className="v4-ficha__desc">{articulo.description}</p>
        ) : null}
        <div className="v4-ficha__pie">
          <Meta articulo={articulo} />
        </div>
      </div>
    </article>
  );
}

export function ArticuloDestacado({ articulo }) {
  const href = `/blog/article/${articulo.slug}`;
  return (
    <article className="v4-ficha v4-destacado" data-sin-media={articulo.cover ? undefined : "true"}>
      {articulo.cover ? <Media articulo={articulo} tamano="large" /> : null}
      <div className="v4-destacado__cuerpo">
        <Meta articulo={articulo} largo />
        <h2 className="v4-destacado__titulo">
          <Link href={href}>{articulo.title}</Link>
        </h2>
        {articulo.description ? <p className="v4-body">{articulo.description}</p> : null}
        <Door href={href}>Leer artículo completo</Door>
      </div>
    </article>
  );
}

export function Articulos({ items }) {
  return (
    <div className="v4-articulos">
      {items.map((articulo) => (
        <TarjetaArticulo key={articulo.id} articulo={articulo} />
      ))}
    </div>
  );
}

/** Carga: la rejilla que va a llegar, en gris. Menos salto que un texto solo. */
export function Esqueleto({ fichas = 3 }) {
  return (
    <div className="v4-articulos" aria-hidden="true">
      {Array.from({ length: fichas }, (_, i) => (
        <div className="v4-ficha" key={i}>
          <div className="v4-skel v4-skel--media" />
          <div className="v4-ficha__cuerpo">
            <div className="v4-skel v4-skel--titulo" />
            <div className="v4-skel v4-skel--linea" style={{ width: "100%" }} />
            <div className="v4-skel v4-skel--linea" style={{ width: "72%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Estado({ children }) {
  return (
    <p className="v4-lede v4-estado" role="status">
      {children}
    </p>
  );
}

export function Paginacion({ paginaActual, totalPaginas, onCambio }) {
  if (totalPaginas <= 1) return null;
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);
  return (
    <nav className="v4-paginacion" aria-label="Paginación de artículos">
      <button type="button" onClick={() => onCambio(paginaActual - 1)} disabled={paginaActual <= 1}>
        Anterior
      </button>
      {paginas.map((pagina) => (
        <button
          key={pagina}
          type="button"
          onClick={() => onCambio(pagina)}
          aria-current={pagina === paginaActual ? "page" : undefined}
        >
          {pagina}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onCambio(paginaActual + 1)}
        disabled={paginaActual >= totalPaginas}
      >
        Siguiente
      </button>
    </nav>
  );
}
