// src/App.js
import React from "react";
import { useEffect } from "react";
// Router removed in Next.js
import NavBar from "./components/NavBar";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Products from "./pages/Products";
import CookiesPolicy from "./pages/CookiesPolicy";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Footer from "./components/FooterComponent";
import NotFound from "./pages/404";
import CookieConsent from "./components/CookieConsent";
import Contact from "./pages/Contact";
import Technology from "./pages/Technology";
import Blog from "./pages/Blog";
import PageHelmet from "./components/Helmet";
import { initializeGTM } from "./utils/gtm";

export default function App() {
  useEffect(() => {
    // Initialize GTM with your container ID
    initializeGTM("GTM-PWN554Q3");
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-corporate-cream via-corporate-lightGray to-corporate-cream">
      <PageHelmet />
      <NavBar />
      <main></main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
