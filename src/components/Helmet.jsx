import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const PageHelmet = () => {
  const router = useRouter();

  // Define titles for each route
  const getTitleForRoute = (pathname) => {
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
    }
  };

  // Get meta description for each route
  const getDescriptionForRoute = (pathname) => {
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
    }
  };

  return (
    <Head>
      <title>{getTitleForRoute(router.pathname || "/")}</title>
      <meta
        name="description"
        content={getDescriptionForRoute(router.pathname || "/")}
      />
      <meta
        property="og:title"
        content={getTitleForRoute(router.pathname || "/")}
      />
      <meta
        property="og:description"
        content={getDescriptionForRoute(router.pathname || "/")}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://www.advia.tech${
          router.asPath || router.pathname || "/"
        }`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <link
        rel="canonical"
        href={`https://www.advia.tech${
          router.asPath || router.pathname || "/"
        }`}
      />
    </Head>
  );
};

export default PageHelmet;
