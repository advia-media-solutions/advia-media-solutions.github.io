// src/App.js
import React from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import Impulsa from "./pages/Impulsa";
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
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/cookies-policy" element={<CookiesPolicy />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
