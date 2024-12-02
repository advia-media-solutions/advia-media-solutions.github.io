import React from 'react';
import HeroSection from '../components/HeroSection';
import ActiveInternet from '../components/ActiveInternet';
import MarketingBlock from '../components/MarketingBlock';
import BrandShowcase from '../components/BrandShowcase';
import ScrollToTop from '../components/ScrollToTop';

const Homepage = () => {
  return (
    <div className="relative min-h-screen">
      {/* Main Content Sections */}
      <div className="">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Marketing Solutions Section */}
        <MarketingBlock />

        {/* Brand Showcase Section */}
        <BrandShowcase />
      </div>

      {/* Scroll To Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Homepage;