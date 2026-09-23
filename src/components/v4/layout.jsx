import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import Logo from "./Logo";
import Reveal from "./Reveal";
import { ArrowOutward, IconoCerrar, IconoMenu, Label } from "./primitives";

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

/* Los rótulos son claves de `common`; `id` es lo que las páginas pasan en
   `activo` para marcar su entrada, y no depende del idioma. */
export const NAV_ITEMS = [
  { id: "navegacion", label: "nav.navegacion", href: "/navegacion-activa" },
  { id: "tecnologia", label: "nav.tecnologia", href: "/technology" },
  {
    id: "productos",
    label: "nav.productos",
    href: "/products",
    /* Los dos spokes cuelgan del hub: desde el nav se llega a cualquiera de los
       dos sin pasar por la página intermedia. */
    hijos: [
      {
        label: "nav.paidMedia",
        desc: "nav.paidMediaDesc",
        href: "/products/paid-media",
        /* Sus canales no son páginas: se nombran, no se enlazan. */
        canales: "nav.paidMediaCanales",
      },
      {
        label: "nav.geo",
        desc: "nav.geoDesc",
        href: "/products/geo",
        /* Y de este cuelgan sus dos productos, cada uno con su página. */
        hijos: [
          {
            label: "nav.posicionamiento",
            desc: "nav.posicionamientoDesc",
            href: "/products/geo/posicionamiento-ia",
          },
          {
            label: "nav.publicidad",
            desc: "nav.publicidadDesc",
            href: "/products/geo/publicidad-ia",
          },
        ],
      },
    ],
  },
  { id: "nosotros", label: "nav.nosotros", href: "/about" },
  { id: "blog", label: "nav.blog", href: "/blog" },
];

const IDIOMAS = ["es", "en"];

/** La misma ruta sin ancla ni query: al cambiar de idioma se vuelve arriba. */
function useRutaIdioma() {
  const { asPath, locale = "es" } = useRouter();
  return { ruta: asPath.split(/[?#]/)[0], locale };
}

/**
 * Idioma en el nav: una entrada más del menú, «Idioma» / «Language», que
 * despliega los dos idiomas igual que Productos despliega sus dos páginas.
 * Cada opción es un enlace a la misma ruta en el otro idioma, así que funciona
 * sin JavaScript y cada versión tiene su URL. El submenú se abre con el ratón
 * y con el teclado (:focus-within), sin estado.
 */
export function IdiomaMenu() {
  const { ruta, locale } = useRutaIdioma();
  const { t } = useTranslation("common");
  return (
    <div className="v4-nav__grupo">
      <span className="v4-nav__link" aria-haspopup="true" tabIndex={0}>
        {t("idioma.rotulo")}
      </span>
      <div className="v4-nav__menu" aria-label={t("idioma.rotulo")}>
        {IDIOMAS.map((idioma) => (
          <Link
            key={idioma}
            href={ruta}
            locale={idioma}
            className="v4-nav__sub"
            aria-current={idioma === locale ? "true" : undefined}
            lang={idioma}
            hrefLang={idioma}
          >
            {t(`idioma.${idioma}`)}
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * Conmutador compacto: dos siglas, la activa en tinta plena. Para donde no
 * cabe un menú: el nav de móvil y la fila de legales del footer.
 */
export function Idioma({ className = "" }) {
  const { ruta, locale } = useRutaIdioma();
  const { t } = useTranslation("common");
  return (
    <div className={`v4-idioma ${className}`.trim()} aria-label={t("idioma.rotulo")}>
      {IDIOMAS.map((idioma) => (
        <Link
          key={idioma}
          href={ruta}
          locale={idioma}
          className="v4-idioma__opcion"
          aria-current={idioma === locale ? "true" : undefined}
          lang={idioma}
          hrefLang={idioma}
          title={t(`idioma.${idioma}`)}
        >
          {idioma.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

/* A partir de aquí el nav ya no es la portada: se ha fijado y estorba. */
const UMBRAL_OCULTAR = 240;
/* Un mínimo de recorrido antes de reaccionar: sin esto el rebote del trackpad
   y el ajuste de scroll de iOS esconden y muestran la barra sin que nadie se
   haya movido. */
const MINIMO = 6;

export function Nav({ activo, sobreOscuro }) {
  const { t } = useTranslation("common");
  const { ruta } = useRutaIdioma();
  const [fijada, setFijada] = useState(false);
  const [oculta, setOculta] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const botonMenu = useRef(null);

  /* El panel de móvil se cierra solo al cambiar de página, con Escape, y
     mientras está abierto la página de detrás no hace scroll. El foco vuelve
     al botón que lo abrió, para que el teclado no se quede en el vacío. */
  useEffect(() => {
    setAbierto(false);
  }, [ruta]);
  useEffect(() => {
    if (!abierto) return undefined;
    const alTeclear = (e) => {
      if (e.key === "Escape") setAbierto(false);
    };
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", alTeclear);
    return () => {
      document.body.style.overflow = anterior;
      document.removeEventListener("keydown", alTeclear);
      botonMenu.current?.focus();
    };
  }, [abierto]);

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
      data-surface={(sobreOscuro && !fijada) || abierto ? "graphite" : "page"}
      data-theme={(sobreOscuro && !fijada) || abierto ? "dark" : undefined}
      data-fijada={fijada ? "true" : undefined}
      data-oculta={oculta && !abierto ? "true" : undefined}
      data-abierto={abierto ? "true" : undefined}
      onFocus={() => setOculta(false)}
      aria-label={t("nav.principal")}
    >
      <div className="v4-nav__inner">
        <Link href="/" aria-label={t("nav.inicio")}>
          <Logo variant={(sobreOscuro && !fijada) || abierto ? "light" : "dark"} />
        </Link>
        <div className="v4-nav__links">
          {NAV_ITEMS.map((item) => {
            const enlace = (
              <Link
                href={item.href}
                className="v4-nav__link"
                aria-current={item.id === activo ? "page" : undefined}
                aria-haspopup={item.hijos ? "true" : undefined}
              >
                {t(item.label)}
              </Link>
            );
            if (!item.hijos) return <React.Fragment key={item.href}>{enlace}</React.Fragment>;
            /* Se abre con el ratón y con el teclado: el panel está en el DOM y
               :focus-within lo despliega al tabular, sin estado ni JS. Una
               columna por familia de producto; la de Entornos Conversacionales
               lleva debajo sus dos productos, que son páginas. */
            return (
              <div className="v4-nav__grupo" key={item.href}>
                {enlace}
                <div className="v4-nav__menu v4-nav__panel">
                  {item.hijos.map((familia) => (
                    <div className="v4-nav__familia" key={familia.href}>
                      <Link
                        href={familia.href}
                        className="v4-nav__sub v4-nav__familia-link"
                        aria-current={ruta === familia.href ? "page" : undefined}
                      >
                        <span className="v4-nav__familia-titulo">{t(familia.label)}</span>
                        <span className="v4-nav__familia-desc">{t(familia.desc)}</span>
                      </Link>
                      {familia.canales ? (
                        <span className="v4-nav__familia-canales">{t(familia.canales)}</span>
                      ) : null}
                      {familia.hijos?.map((producto) => (
                        <Link
                          key={producto.href}
                          href={producto.href}
                          className="v4-nav__sub v4-nav__producto"
                          aria-current={ruta === producto.href ? "page" : undefined}
                        >
                          <span>
                            <span className="v4-nav__familia-titulo">{t(producto.label)}</span>
                            <span className="v4-nav__familia-desc">{t(producto.desc)}</span>
                          </span>
                          <ArrowOutward />
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <IdiomaMenu />
          <Link href="/contact" className="v4-btn v4-btn--primary v4-nav__cta">
            {t("nav.cta")}
          </Link>
        </div>
        <button
          type="button"
          className="v4-nav__toggle"
          ref={botonMenu}
          aria-expanded={abierto}
          aria-controls="v4-menu-movil"
          onClick={() => setAbierto((v) => !v)}
        >
          <span>{abierto ? t("nav.cerrar") : t("nav.menu")}</span>
          {abierto ? <IconoCerrar /> : <IconoMenu />}
        </button>
      </div>
      <MenuMovil abierto={abierto} activo={activo} ruta={ruta} />
    </nav>
  );
}

/**
 * El menú de móvil: un panel a pantalla completa sobre grafito, con la misma
 * jerarquía que el nav de escritorio. Las entradas de primer nivel van en
 * display; bajo Productos cuelgan las dos familias y, de la conversacional, sus
 * dos productos. Abajo, el idioma y el único botón dorado. Está siempre en el
 * DOM (oculto con `hidden`): lo que abre y cierra es el atributo, y así los
 * enlaces existen para el rastreador aunque no haya JavaScript.
 */
function MenuMovil({ abierto, activo, ruta }) {
  const { t } = useTranslation("common");
  return (
    <div
      id="v4-menu-movil"
      className="v4-menu"
      hidden={!abierto}
      aria-label={t("nav.principal")}
    >
      <ul className="v4-menu__lista">
        {NAV_ITEMS.map((item) => (
          <li key={item.href} className="v4-menu__item">
            <Link
              href={item.href}
              className="v4-menu__link"
              aria-current={item.id === activo ? "page" : undefined}
            >
              {t(item.label)}
            </Link>
            {item.hijos ? (
              <ul className="v4-menu__familias">
                {item.hijos.map((familia) => (
                  <li key={familia.href}>
                    <Link
                      href={familia.href}
                      className="v4-menu__familia"
                      aria-current={ruta === familia.href ? "page" : undefined}
                    >
                      {t(familia.label)}
                    </Link>
                    {familia.hijos ? (
                      <ul className="v4-menu__productos">
                        {familia.hijos.map((producto) => (
                          <li key={producto.href}>
                            <Link
                              href={producto.href}
                              className="v4-menu__producto"
                              aria-current={ruta === producto.href ? "page" : undefined}
                            >
                              {t(producto.label)}
                              <ArrowOutward />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
      <div className="v4-menu__pie">
        <Idioma />
        <Link href="/contact" className="v4-btn v4-btn--primary">
          {t("nav.cta")}
        </Link>
      </div>
    </div>
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
    <header
      className={cita ? "v4-cabecera v4-cabecera--cita" : "v4-cabecera"}
      /* Sin titular, la entradilla es lo único que hay: sube de tamaño y pasa a
         tinta plena para que sostenga la sección ella sola. */
      data-sin-titular={titular ? undefined : "true"}
    >
      {eyebrow ? <Label tamano={eyebrowTamano}>{eyebrow}</Label> : null}
      {/* Hay secciones que entran solo con la entradilla: la pieza que va debajo
          es el argumento y un titular encima solo la comentaría. */}
      {titular ? (
        <h2 className="v4-display-l" style={ancho ? { maxWidth: ancho } : undefined}>
          {titular}
        </h2>
      ) : null}
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

export function Miga({ hoja, raiz, href = "/products" }) {
  const { t } = useTranslation("common");
  return (
    <div className="v4-miga">
      <Link href={href} className="v4-label v4-label--faint">
        {raiz || t("nav.productos")}
      </Link>
      <span className="v4-label v4-label--faint">/</span>
      <span className="v4-label">{hoja}</span>
    </div>
  );
}

/**
 * Hero oscuro: velo dorado radial, retícula fina y banda opcional a sangre.
 * `titular` admite JSX para marcar la palabra clave con <Key>.
 *
 * `aparte` coloca una pieza a la derecha del hero, como la esfera de la
 * portada, para cuando lo que ilustra no es un fondo sino contenido con su
 * propio sitio y no puede ir en el lienzo absoluto de `pieza`. El titular NO
 * encoge: la portada vive de que sea grande, y la pieza se hace pequeña para
 * dejarle sitio, no al revés.
 */
export function Hero({
  eyebrow,
  eyebrowTamano,
  titular,
  titularTamano,
  lede,
  pie,
  miga,
  acciones,
  banda,
  campo,
  oscuro,
  pieza,
  aparte,
}) {
  const cabecera = (
    <>
      {miga ? (React.isValidElement(miga) ? miga : <Miga hoja={miga} />) : null}
      {eyebrow ? <Label tamano={eyebrowTamano}>{eyebrow}</Label> : null}
      <h1 className={titularTamano === "l" ? "v4-display-l" : "v4-display-xl"}>{titular}</h1>
      <p className="v4-lede">{lede}</p>
      {pie}
      {acciones ? <div className="v4-btn-row">{acciones}</div> : null}
    </>
  );

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
      <div
        className="v4-hero__body"
        data-banda={banda ? "true" : undefined}
        data-aparte={aparte ? "true" : undefined}
      >
        {aparte ? (
          <>
            {/* El ritmo de la cabecera vive en `.v4-hero__body > * + *`, así que
                al partir el hero hay que envolver el texto: si no, el titular y
                la columna de al lado se separarían con la misma regla. */}
            <div className="v4-hero__texto">{cabecera}</div>
            <div className="v4-hero__aparte">{aparte}</div>
          </>
        ) : (
          cabecera
        )}
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

/* Rótulos y enlaces del footer: las claves viven en `common`. */
const FOOTER_GRUPOS = [
  {
    titulo: "footer.concepto",
    links: [
      { label: "nav.navegacion", href: "/navegacion-activa" },
      { label: "nav.tecnologia", href: "/technology" },
    ],
  },
  {
    titulo: "nav.productos",
    links: [
      { label: "footer.canales", href: "/products/paid-media" },
      { label: "footer.conversacionales", href: "/products/geo" },
    ],
  },
  {
    titulo: "footer.advia",
    links: [
      { label: "nav.nosotros", href: "/about" },
      { label: "nav.blog", href: "/blog" },
    ],
  },
];

const FOOTER_LEGAL = [
  { label: "footer.avisoLegal", href: "/legal-notice" },
  { label: "footer.privacidad", href: "/privacy-policy" },
  { label: "footer.cookies", href: "/cookies-policy" },
  { label: "footer.optOut", href: "/opt-out" },
];

export function Footer() {
  const { t } = useTranslation("common");
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
                <Label tono="faint">{t(grupo.titulo)}</Label>
                {grupo.links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {t(link.label)}
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
                {t(link.label)}
              </Link>
            ))}
            <Idioma className="v4-idioma--footer" />
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
