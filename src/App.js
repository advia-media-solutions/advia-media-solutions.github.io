// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import About from './pages/About';
import OpenWebUserSimulation from './pages/OpenWebUserSimulation';
import Footer from './components/FooterComponent';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-corporate-cream via-corporate-lightGray to-corporate-cream">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products/web-simulation" element={<OpenWebUserSimulation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
