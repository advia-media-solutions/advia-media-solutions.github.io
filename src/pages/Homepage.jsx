import React from "react";
import HeroSection from "../blocks/HeroSection";
import ActiveInternet from "../blocks/ActiveInternet";
import MarketingBlock from "../blocks/MarketingBlock";
import TestimonialsBlock from "../blocks/TestimonialsBlock";
import ScrollToTop from "../components/ScrollToTop";

const Homepage = () => {
  return (
    <main className="relative min-h-screen bg-white overflow-x-hidden">
      {/* Main Content Sections */}
      <div className="relative z-0">
        {/* Hero Section */}
        <HeroSection />

        {/* Active Internet Section */}
        <ActiveInternet />

        {/* Marketing Solutions Section */}
        <MarketingBlock />

        {/* Testimonials Section */}
        <TestimonialsBlock />
      </div>

      {/* Scroll To Top Button */}
      <ScrollToTop />
    </main>
  );
};

export default Homepage;
