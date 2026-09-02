import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Logo from "./Logo";
import Reveal from "./Reveal";
import { ArrowOutward, Label } from "./primitives";

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
  {
    label: "Productos",
    href: "/products",
    /* Los dos spokes cuelgan del hub: desde el nav se llega a cualquiera de los
       dos sin pasar por la página intermedia. */
    hijos: [
      { label: "Navegación Activa en Paid Media", href: "/products/paid-media" },
      { label: "Visibilidad Intencional en IA: GEO", href: "/products/geo" },
    ],
  },
  { label: "Nosotros", href: "/about" },
  { label: "Blog", href: "/blog" },
];

/* A partir de aquí el nav ya no es la portada: se ha fijado y estorba. */
const UMBRAL_OCULTAR = 240;
/* Un mínimo de recorrido antes de reaccionar: sin esto el rebote del trackpad
   y el ajuste de scroll de iOS esconden y muestran la barra sin que nadie se
   haya movido. */
const MINIMO = 6;

export function Nav({ activo, sobreOscuro }) {
  const [fijada, setFijada] = useState(false);
  const [oculta, setOculta] = useState(false);

  /* Baja el scroll, se va; sube lo más mínimo, vuelve. Arriba del todo siempre
     está, y el foco por teclado la trae de vuelta aunque esté escondida. */
  useEffect(() => {
    let anterior = window.scrollY;
    let pendiente = false;

    const evaluar = () => {
      pendiente = false;
      const y = window.scrollY;
      const delta = y - anterior;
      setFijada(y > 40);
      if (y <= UMBRAL_OCULTAR) setOculta(false);
      else if (delta > MINIMO) setOculta(true);
      else if (delta < -MINIMO) setOculta(false);
      if (Math.abs(delta) > MINIMO) anterior = y;
    };

    const alHacerScroll = () => {
      if (pendiente) return;
      pendiente = true;
      window.requestAnimationFrame(evaluar);
    };

    evaluar();
    window.addEventListener("scroll", alHacerScroll, { passive: true });
    return () => window.removeEventListener("scroll", alHacerScroll);
  }, []);

  return (
    <nav
      className="v4-nav v4-surface"
      data-surface={sobreOscuro && !fijada ? "graphite" : "page"}
      data-theme={sobreOscuro && !fijada ? "dark" : undefined}
      data-fijada={fijada ? "true" : undefined}
      data-oculta={oculta ? "true" : undefined}
      onFocus={() => setOculta(false)}
      aria-label="Principal"
    >
      <div className="v4-nav__inner">
        <Link href="/" aria-label="Advia · inicio">
          <Logo variant={sobreOscuro && !fijada ? "light" : "dark"} />
        </Link>
        <div className="v4-nav__links">
          {NAV_ITEMS.map((item) => {
            const enlace = (
              <Link
                href={item.href}
                className="v4-nav__link"
                aria-current={item.label === activo ? "page" : undefined}
                aria-haspopup={item.hijos ? "true" : undefined}
              >
                {item.label}
              </Link>
            );
            if (!item.hijos) return <React.Fragment key={item.href}>{enlace}</React.Fragment>;
            /* Se abre con el ratón y con el teclado: el submenú está en el DOM
               y :focus-within lo despliega al tabular, sin estado ni JS. */
            return (
              <div className="v4-nav__grupo" key={item.href}>
                {enlace}
                <div className="v4-nav__menu">
                  {item.hijos.map((hijo) => (
                    <Link key={hijo.href} href={hijo.href} className="v4-nav__sub">
                      {hijo.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
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
    <section
      className={clase}
      data-surface={surface}
      data-theme={surface === "graphite" ? "dark" : undefined}
    >
      <Reveal className="v4-wrap">{children}</Reveal>
    </section>
  );
}

export function Cabecera({ eyebrow, eyebrowTamano, titular, lede, ancho, cita }) {
  return (
    <header className={cita ? "v4-cabecera v4-cabecera--cita" : "v4-cabecera"}>
      {eyebrow ? <Label tamano={eyebrowTamano}>{eyebrow}</Label> : null}
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

export function Miga({ hoja, raiz = "Productos", href = "/products" }) {
  return (
    <div className="v4-miga">
      <Link href={href} className="v4-label v4-label--faint">
        {raiz}
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
export function Hero({
  eyebrow,
  eyebrowTamano,
  titular,
  lede,
  pie,
  miga,
  acciones,
  banda,
  campo,
  oscuro,
  pieza,
}) {
  return (
    <header
      className="v4-surface v4-hero"
      data-surface={oscuro ? "graphite" : "page"}
      data-theme={oscuro ? "dark" : undefined}
      data-campo={campo ? "true" : undefined}
      data-pieza={pieza ? "true" : undefined}
    >
      <div className="v4-hero__veil" aria-hidden="true" />
      {pieza}
      {campo ? <HeroField tono={oscuro ? "oscuro" : "claro"} /> : null}
      {campo ? <div className="v4-hero__scrim" aria-hidden="true" /> : null}
      <div className="v4-hero__body" data-banda={banda ? "true" : undefined}>
        {miga ? (React.isValidElement(miga) ? miga : <Miga hoja={miga} />) : null}
        {eyebrow ? <Label tamano={eyebrowTamano}>{eyebrow}</Label> : null}
        <h1 className="v4-display-xl">{titular}</h1>
        <p className="v4-lede">{lede}</p>
        {pie}
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
        {caption ? <Label tono="faint">{caption}</Label> : null}
        <div>{children}</div>
        {nota ? <p className="v4-label v4-label--faint">{nota}</p> : null}
      </div>
    </div>
  );
}

export function Cierre({ titular, lede, cta, doors }) {
  return (
    <section className="v4-surface v4-sec v4-cierre" data-surface="graphite" data-theme="dark">
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
    <footer className="v4-surface v4-footer" data-surface="graphite" data-theme="dark">
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
export function Pagina({ activo, heroOscuro, seccion, children }) {
  return (
    <div className="v4" data-seccion={seccion}>
      <Nav activo={activo} sobreOscuro={heroOscuro} />
      {children}
      <Footer />
    </div>
  );
}

export { ArrowOutward };
