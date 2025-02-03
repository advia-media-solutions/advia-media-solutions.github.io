import React from "react";
import { useScrollToTop } from "../hooks/useScrollToTop";
import ImpulsaHero from "../blocks/ImpulsaHero";
import SelectedCompanies from "../blocks/SelectedCompanies";
import ProgramFeatures from "../blocks/ProgramFeatures";

const Impulsa = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen pt-16 md:pt-32 pb-12">
      <ImpulsaHero />
      <ProgramFeatures />
      <SelectedCompanies />
    </div>
  );
};

export default Impulsa;
