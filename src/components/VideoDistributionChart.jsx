import React, { useEffect, useRef, useState } from "react";

const VideoDistributionChart = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // 50% visibility threshold
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (videoRef.current) {
            videoRef.current.play();
          }
        } else {
          setIsVisible(false);
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      });
    }, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-xl flex flex-col items-center justify-center p-6 pb-6 md:pb-10 2xl:pb-6 rounded-2xl bg-white shadow-lg"
    >
      <h3 className="text-lg font-medium text-neutral-dark mb-6">
        Distribución del Consumo de Medios Digitales
      </h3>

      <div className="relative w-full max-w-md aspect-square flex items-center">
        <video
          ref={videoRef}
          className="w-full object-cover rounded-lg"
          playsInline
          muted
          src="https://storage.googleapis.com/public-web-assets-advia/Videos/active_pasive_chart_web.mp4"
        />
      </div>

      {/* Legend with enhanced visuals */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-neutral-dark">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-neutral-dark to-neutral-dark" />
          <span className="text-neutral-dark">Navegación Pasiva</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F1B967]" />
          <span className="text-neutral-dark">Navegación Activa</span>
        </div>
      </div>
    </div>
  );
};

export default VideoDistributionChart;
