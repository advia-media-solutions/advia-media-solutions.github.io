// src/pages/About.jsx
import React, { useEffect, useRef } from "react";
import ScrollToTop from "../components/ScrollToTop";
import AboutHero from "../blocks/AboutHero";
import WhyAdvia from "../blocks/WhyAdvia";
import AboutStory from "../blocks/AboutStory";
import AboutStats from "../blocks/AboutStats";
import AboutTeam from "../blocks/AboutTeam";

const About = () => {
  const sectionRefs = {
    values: useRef(null),
    story: useRef(null),
    stats: useRef(null),
    team: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
            entry.target.classList.add("opacity-100");
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        ref.current.classList.add("opacity-0");
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary-light/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-secondary-DEFAULT/10 rounded-full blur-2xl animate-float-medium" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary-DEFAULT/10 rounded-full blur-2xl animate-float-fast" />
      </div>

      <div className="mx-auto px-4">
        <AboutHero />
        <div ref={sectionRefs.values}>
          <WhyAdvia />
        </div>
        <div ref={sectionRefs.story}>
          <AboutStory />
        </div>
        <div ref={sectionRefs.team}>
          <AboutTeam />
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default About;
