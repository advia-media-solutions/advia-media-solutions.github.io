import React, { useEffect } from "react";
import ScrollToTop from "../components/ScrollToTop";
import TechnologyOverview from "../blocks/TechnologyOverview";
import NavigationSimulation from "../blocks/NavigationSimulation";
import Optimization from "../blocks/Optimization";
import CreativeSection from "../blocks/CreativeSection";
import InsightsSection from "../blocks/InsightsSection";
import { useScrollToTop } from "../hooks/useScrollToTop";

const Technology = () => {
  useScrollToTop();
  return (
    <div className="min-h-screen pt-16 md:pt-32 pb-12">
      <div className="mx-auto">
        <TechnologyOverview />
        <NavigationSimulation />
        <CreativeSection />
        <Optimization />
        <InsightsSection /> {/* Add this component */}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Technology;
