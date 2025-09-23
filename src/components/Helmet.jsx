import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const PageHelmet = () => {
  const location = useLocation();

  // Define titles for each route
  const getTitleForRoute = (pathname) => {
    // Check for blog article pattern
    if (pathname.startsWith("/blog/article/")) {
      return "Artículo del Blog | Advia";
    }

    switch (pathname) {
      case "/":
        return "Turning ads into Answers";
      case "/about":
        return "Sobre Nosotros | Advia";
      case "/products":
        return "Productos | Advia";
      case "/technology":
        return "Tecnología | Advia";
      case "/impulsa":
        return "Programa Impulsa | Advia";
      case "/contact":
        return "Contacto | Advia";
      case "/privacy-policy":
        return "Política de Privacidad | Advia";
      case "/cookies-policy":
        return "Política de Cookies | Advia";
      case "/legal-notice":
        return "Aviso Legal | Advia";
      case "/blog":
        return "Blog | Advia";
      default:
        return "Página no encontrada | Advia";
    }
  };

  // Get meta description for each route
  const getDescriptionForRoute = (pathname) => {
    // Check for blog article pattern
    if (pathname.startsWith("/blog/article/")) {
      return "Lee nuestros artículos especializados sobre marketing digital, tecnología y navegación activa en el blog de Advia.";
    }

    switch (pathname) {
      case "/":
        return "Optimiza tus campañas publicitarias con la tecnología de navegación activa de Advia. Soluciones de marketing digital basadas en IA para mejor retorno de inversión.";
      case "/about":
        return "Descubre cómo Advia está transformando el marketing digital a través de tecnología innovadora y soluciones personalizadas.";
      case "/products":
        return "Explora nuestros productos de marketing digital: campañas en Open Web, YouTube y TikTok optimizadas con IA.";
      case "/technology":
        return "Conoce nuestra tecnología de navegación activa y cómo utilizamos la IA para optimizar campañas publicitarias.";
      case "/impulsa":
        return "Programa Impulsa de Advia: potenciando el crecimiento de startups y empresas innovadoras.";
      case "/contact":
        return "Contacta con Advia para transformar tu estrategia de marketing digital. Estamos aquí para ayudarte.";
      case "/blog":
        return "Descubre nuestros artículos y noticias sobre marketing digital y tecnología.";
      default:
        return "Advia Media Solutions - Tecnología de navegación activa para optimizar tus campañas de marketing digital.";
    }
  };

  return (
    <Helmet>
      <title>{getTitleForRoute(location.pathname)}</title>
      <meta
        name="description"
        content={getDescriptionForRoute(location.pathname)}
      />
      <meta property="og:title" content={getTitleForRoute(location.pathname)} />
      <meta
        property="og:description"
        content={getDescriptionForRoute(location.pathname)}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://www.advia.tech${location.pathname}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <link
        rel="canonical"
        href={`https://www.advia.tech${location.pathname}`}
      />
    </Helmet>
  );
};

export default PageHelmet;
