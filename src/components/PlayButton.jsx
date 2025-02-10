import React, { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const YouTubePlayer = ({
  videoId,
  primaryColor = "#F1B967",
  buttonSize = "w-36 h-36",
  iconSize = "w-12 h-12",
  spinDuration = 2,
  wobbleDuration = 8,
  morphDuration = 8,
  liquidOpacity = 0.1,
  borderOpacity = 0.2,
  morphRadius = 40,
  id,
  hoverScale = 1.05,
  wobbleAmplitude = 20,
  gtmEvent = null,
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isAPIReady, setIsAPIReady] = useState(false);
  const playerRef = useRef(null);

  // Load YouTube IFrame API
  useEffect(() => {
    // Only load the API once
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Setup the callback for when API is ready
    window.onYouTubeIframeAPIReady = () => {
      setIsAPIReady(true);
    };

    // If YT is already loaded, set API as ready
    if (window.YT && window.YT.Player) {
      setIsAPIReady(true);
    }
  }, []);

  // Initialize player when modal is shown and API is ready
  useEffect(() => {
    if (showVideo && isAPIReady) {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onStateChange: onPlayerStateChange,
          onError: onPlayerError,
        },
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [showVideo, isAPIReady, videoId]);

  const onPlayerStateChange = (event) => {
    if (window.dataLayer && gtmEvent) {
      switch(event.data) {
        case window.YT.PlayerState.PLAYING:
          window.dataLayer.push({
            event: 'youtube_playing',
            video_id: videoId,
            event_from_code: gtmEvent
          });
          break;
        case window.YT.PlayerState.ENDED:
          window.dataLayer.push({
            event: 'youtube_completed',
            video_id: videoId,
            event_from_code: gtmEvent
          });
          break;
      }
    }
  };

  const onPlayerError = (error) => {
    console.error('YouTube Player Error:', error);
    if (window.dataLayer && gtmEvent) {
      window.dataLayer.push({
        event: 'youtube_error',
        video_id: videoId,
        error_code: error.data,
        event_from_code: gtmEvent
      });
    }
  };

  const handleVideoClick = () => {
    setShowVideo(true);
    if (window.dataLayer && gtmEvent) {
      window.dataLayer.push({
        event: 'youtube_open',
        video_id: videoId,
        event_from_code: gtmEvent
      });
    }
  };

  const handleCloseVideo = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
    setShowVideo(false);
    if (window.dataLayer && gtmEvent) {
      window.dataLayer.push({
        event: 'youtube_close',
        video_id: videoId,
        event_from_code: gtmEvent
      });
    }
  };

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
      33% { border-radius: ${morphRadius + 5}% ${morphRadius - 5}% ${morphRadius - 5}% ${morphRadius + 5}%; }
      66% { border-radius: ${morphRadius - 5}% ${morphRadius + 5}% ${morphRadius + 5}% ${morphRadius - 5}%; }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>

      <div className="relative cursor-pointer" onClick={handleVideoClick}>
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

        {/* Main button */}
        <div className={`group relative ${buttonSize}`}>
          <div
            className={`${buttonSize} rounded-full bg-white shadow-lg flex items-center justify-center relative overflow-visible transform transition-transform duration-300 hover:scale-105`}
          >
            <div
              className="absolute inset-1 rounded-full border-2"
              style={{
                borderColor: primaryColor,
                opacity: borderOpacity,
              }}
            />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-white to-transparent flex items-center justify-center transition-all duration-300">
              <Play
                className={`${iconSize} transition-colors duration-300`}
                style={{ color: primaryColor }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Player Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <button
              onClick={handleCloseVideo}
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
            <div id="youtube-player" className="w-full h-full" />
          </div>
        </div>
      )}
    </>
  );
};

export default YouTubePlayer;