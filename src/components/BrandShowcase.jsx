import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import GlassCard from "./GlassCard";
import BrandCarousel from "./carousel/BrandCarousel";

const BrandShowcase = () => {
  const brands = [
    {
      name: "Disney+",
      logo: "https://storage.googleapis.com/public-web-assets-advia/brands/disney.svg",
      caseStudyUrl: "/case-studies/disney",
      description: "45% increase in qualified leads",
    },
    {
      name: "Nike",
      logo: "https://storage.googleapis.com/public-web-assets-advia/brands/nike.svg",
      caseStudyUrl: "/case-studies/innovatelabs",
      description: "2.5x ROI improvement",
    },
    {
      name: "FutureNow",
      logo: "https://storage.googleapis.com/public-web-assets-advia/brands/fintonic.png",
      caseStudyUrl: "/case-studies/futurenow",
      description: "89% customer engagement boost",
    },
    {
      name: "GlobalTech",
      logo: "https://storage.googleapis.com/public-web-assets-advia/brands/orange.png",
      caseStudyUrl: "/case-studies/globaltech",
      description: "3x conversion rate increase",
    },
  ];

  const BrandCard = ({ brand }) => (
    <GlassCard className="p-6 group cursor-pointer h-full transition-all duration-300">
      <div className="space-y-6">
        <div className="h-20 flex items-center justify-center">
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            className="max-h-full w-auto opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="text-center">
          <p className="text-neutral-DEFAULT/80 font-medium mb-2">
            {brand.description}
          </p>
        </div>
        <div className="flex justify-center">
          <a
            href={brand.caseStudyUrl}
            className="inline-flex items-center gap-2 text-sm font-medium
          text-secondary-DEFAULT hover:text-secondary-light transition-colors"
          >
            View Case Study
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </GlassCard>
  );

  const brandCards = brands.map((brand, index) => (
    <BrandCard key={index} brand={brand} />
  ));

  return (
    <section className="relative py-20 bg-gradient-to-b from-accent-cream/10 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-glass-light to-glass-medium backdrop-blur-md border border-white/30 text-sm text-neutral-dark/90 shadow-lg mb-6">
            <Sparkles className="w-4 h-4 text-secondary-DEFAULT animate-pulse" />
            <span className="font-medium">Trusted by Industry Leaders</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-6">
            Empowering{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary-light via-secondary-DEFAULT to-primary-light bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] px-2 py-1 relative z-10">
                Global Brands
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-DEFAULT/20 to-secondary-light/20 -skew-y-2 transform rounded-lg blur-[2px]"></div>
            </span>
          </h2>

          <p className="text-xl text-neutral-DEFAULT/80 max-w-2xl mx-auto">
            See how leading brands are transforming their digital presence with
            our AI-powered solutions.
          </p>
        </div>

        {/* Carousel Section */}
        <div className="mt-12">
          <BrandCarousel items={brandCards} />
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary-DEFAULT/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-secondary-light/10 rounded-full blur-2xl animate-float-medium" />
      </div>
    </section>
  );
};

export default BrandShowcase;
