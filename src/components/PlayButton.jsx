import React, { useState } from "react";
import { Play } from "lucide-react";

const LiquidButton = ({
  primaryColor = "#F1B967",
  buttonSize = "w-36 h-36",
  iconSize = "w-12 h-12",
  spinDuration = 2,
  wobbleDuration = 8,
  morphDuration = 8,
  liquidOpacity = 0.1,
  borderOpacity = 0.2,
  morphRadius = 40,
  hoverScale = 1.05,
  wobbleAmplitude = 20,
  videoUrl = "https://www.youtube.com/embed/YOUR_VIDEO_ID",
}) => {
  const [showVideo, setShowVideo] = useState(false);

  // Define keyframes with unique names to avoid conflicts
  const keyframes = `
    @keyframes liquid-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes liquid-wobble {
      0%, 100% { transform: translate(0, 0); }
      33% { transform: translate(-${wobbleAmplitude}px, ${wobbleAmplitude}px); }
      66% { transform: translate(${wobbleAmplitude}px, -${wobbleAmplitude}px); }
    }

    @keyframes liquid-morph {
      0%, 100% { border-radius: ${morphRadius}%; }
      33% { border-radius: ${morphRadius + 5}% ${morphRadius - 5}% ${
    morphRadius - 5
  }% ${morphRadius + 5}%; }
      66% { border-radius: ${morphRadius - 5}% ${morphRadius + 5}% ${
    morphRadius + 5
  }% ${morphRadius - 5}%; }
    }
  `;

  return (
    <>
      {/* Inject keyframes directly into component output */}
      <style>{keyframes}</style>

      <div
        className="relative cursor-pointer"
        onClick={() => setShowVideo(true)}
      >
        {/* Liquid animation effect */}
        <div className="absolute -inset-8 rounded-full overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                animation: `liquid-spin ${spinDuration}s linear infinite`,
              }}
            >
              <div
                className="w-full h-full"
                style={{
                  animation: `liquid-wobble ${wobbleDuration}s ease-in-out infinite`,
                }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    animation: `liquid-morph ${morphDuration}s ease-in-out infinite`,
                    backgroundColor: primaryColor,
                    opacity: liquidOpacity,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main container */}
        <div className={`group relative ${buttonSize}`}>
          <div
            className={`${buttonSize} rounded-full bg-white shadow-lg flex items-center justify-center relative overflow-visible transform transition-transform duration-300 hover:scale-[${hoverScale}]`}
          >
            {/* Inner gradient border */}
            <div
              className="absolute inset-1 rounded-full border-2"
              style={{
                borderColor: primaryColor,
                opacity: borderOpacity,
              }}
            />

            {/* Play button container */}
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-white to-transparent flex items-center justify-center transition-all duration-300">
              <Play
                className={`${iconSize} transition-colors duration-300`}
                style={{ color: primaryColor }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white/80 hover:text-white hover:bg-black/70 transition-all duration-300 z-10"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={videoUrl}
              title="Advia Impulsa Program"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LiquidButton;
