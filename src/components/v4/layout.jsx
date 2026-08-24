import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Logo from "./Logo";
import Reveal from "./Reveal";
import { ArrowOutward, Label, Trama } from "./primitives";

/**
 * El campo 3D se carga aparte y solo en cliente: three.js no debe entrar en el
 * bundle inicial ni ejecutarse en el servidor. Mientras llega (o si nunca
 * llega), el hero ya está completo con su retícula SVG y su velo.
 */
const HeroField = dynamic(() => import("./HeroField"), { ssr: false });

/**
 * Chasis de página: nav, hero, secciones, cierre y footer.
 *
 * Las secciones declaran su superficie (`page` | `inset` | `graphite`) y el CSS
 * reasigna los colores de texto, línea y panel. Por eso un mismo bloque sirve
 * sobre marfil y sobre grafito sin duplicar componentes.
 */

export const NAV_ITEMS = [
  { label: "Navegación Activa", href: "/navegacion-activa" },
  { label: "Tecnología", href: "/technology" },
  { label: "Productos", href: "/products" },
  { label: "Nosotros", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export function Nav({ activo }) {
  const [fijada, setFijada] = useState(false);

  useEffect(() => {
    const alHacerScroll = () => setFijada(window.scrollY > 40);
    alHacerScroll();
    window.addEventListener("scroll", alHacerScroll, { passive: true });
    return () => window.removeEventListener("scroll", alHacerScroll);
  }, []);

  return (
    <nav
      className="v4-nav v4-surface"
      data-surface="graphite"
      data-fijada={fijada ? "true" : undefined}
      aria-label="Principal"
    >
      <div className="v4-nav__inner">
        <Link href="/" aria-label="Advia · inicio">
          <Logo variant="light" />
        </Link>
        <div className="v4-nav__links">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="v4-nav__link"
              aria-current={item.label === activo ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="v4-btn v4-btn--primary v4-nav__cta">
            Hablemos
          </Link>
        </div>
        <Link href="/contact" className="v4-btn v4-btn--primary v4-nav__toggle">
          Hablemos
        </Link>
      </div>
    </nav>
  );
}

export function Section({ surface = "page", className = "", children }) {
  const clase = `v4-surface v4-sec ${className}`.trim();
  return (
    <section className={clase} data-surface={surface}>
      <Reveal className="v4-wrap">{children}</Reveal>
    </section>
  );
}

export function Cabecera({ eyebrow, titular, lede, ancho }) {
  return (
    <header className="v4-cabecera">
      {eyebrow ? <Label>{eyebrow}</Label> : null}
      <h2 className="v4-display-l" style={ancho ? { maxWidth: ancho } : undefined}>
        {titular}
      </h2>
      {lede ? <p className="v4-lede">{lede}</p> : null}
    </header>
  );
}

export function Split({ cols, align, children }) {
  return (
    <div className="v4-split" data-cols={cols} data-align={align}>
      {children}
    </div>
  );
}

export function Grid({ cols, className = "", children }) {
  const clase = `v4-grid ${className}`.trim();
  return (
    <div className={clase} data-cols={String(cols)}>
      {children}
    </div>
  );
}

export function Miga({ hoja }) {
  return (
    <div className="v4-miga">
      <Link href="/products" className="v4-label v4-label--faint">
        Productos
      </Link>
      <span className="v4-label v4-label--faint">/</span>
      <span className="v4-label">{hoja}</span>
    </div>
  );
}

/**
 * Hero oscuro: velo dorado radial, retícula fina y banda opcional a sangre.
 * `titular` admite JSX para marcar la palabra clave con <Key>.
 */
export function Hero({ eyebrow, titular, lede, xl, miga, acciones, banda, campo }) {
  return (
    <header
      className="v4-surface v4-hero"
      data-surface="graphite"
      data-campo={campo ? "true" : undefined}
    >
      <div className="v4-hero__veil" aria-hidden="true" />
      {campo ? <HeroField /> : null}
      {campo ? <div className="v4-hero__scrim" aria-hidden="true" /> : null}
      <Trama />
      <div className="v4-hero__body" data-banda={banda ? "true" : undefined}>
        {miga ? <Miga hoja={miga} /> : null}
        <Label tono="gold">{eyebrow}</Label>
        <h1 className={xl ? "v4-display-xl" : "v4-display-l"}>{titular}</h1>
        <p className="v4-lede">{lede}</p>
        {acciones ? <div className="v4-btn-row">{acciones}</div> : null}
      </div>
      {banda}
    </header>
  );
}

export function Banda({ caption, nota, children }) {
  return (
    <div className="v4-banda">
      <div className="v4-banda__inner">
        <Label tono="faint">{caption}</Label>
        <div>{children}</div>
        {nota ? <p className="v4-label v4-label--faint">{nota}</p> : null}
      </div>
    </div>
  );
}

export function Cierre({ titular, lede, cta, doors }) {
  return (
    <section className="v4-surface v4-sec v4-cierre" data-surface="graphite">
      <Reveal className="v4-wrap">
        <h2 className="v4-heading" style={{ maxWidth: "940px" }}>
          {titular}
        </h2>
        {lede ? <p className="v4-lede v4-mt-5">{lede}</p> : null}
        {cta ? <div className="v4-btn-row v4-mt-10">{cta}</div> : null}
        {doors ? <div className="v4-door-row v4-mt-10">{doors}</div> : null}
      </Reveal>
    </section>
  );
}

const FOOTER_GRUPOS = [
  {
    titulo: "Concepto",
    links: [
      { label: "Navegación Activa", href: "/navegacion-activa" },
      { label: "Tecnología", href: "/technology" },
    ],
  },
  {
    titulo: "Productos",
    links: [
      { label: "Paid Media", href: "/products/paid-media" },
      { label: "GEO", href: "/products/geo" },
    ],
  },
  {
    titulo: "Advia",
    links: [
      { label: "Nosotros", href: "/about" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

const FOOTER_LEGAL = [
  { label: "Aviso legal", href: "/legal-notice" },
  { label: "Privacidad", href: "/privacy-policy" },
  { label: "Cookies", href: "/cookies-policy" },
  { label: "Opt-out", href: "/opt-out" },
];

export function Footer() {
  return (
    <footer className="v4-surface v4-footer" data-surface="graphite">
      <div className="v4-wrap">
        <div className="v4-footer__cols">
          <div>
            <Logo variant="light" />
            <p className="v4-body v4-mt-5">Turning ads into answers.</p>
          </div>
          <div className="v4-footer__links">
            {FOOTER_GRUPOS.map((grupo) => (
              <div key={grupo.titulo} className="v4-footer__group">
                <Label tono="faint">{grupo.titulo}</Label>
                {grupo.links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="v4-footer__legal">
          <span className="v4-label v4-label--faint">
            © 2026 Advia Media Solutions
          </span>
          <div className="v4-chips">
            {FOOTER_LEGAL.map((link) => (
              <Link key={link.href} href={link.href} className="v4-label v4-label--faint">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Envoltorio de página v4: aísla el árbol del chrome antiguo. */
export function Pagina({ activo, children }) {
  return (
    <div className="v4">
      <Nav activo={activo} />
      {children}
      <Footer />
    </div>
  );
}

export { ArrowOutward };
