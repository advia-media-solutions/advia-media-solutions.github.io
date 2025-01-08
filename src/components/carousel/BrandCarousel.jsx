import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BrandCarousel = ({
  items,
  visibleItems = {
    default: 4,
    lg: 3,
    md: 2,
    sm: 1,
  },
  autoPlayInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayItems, setDisplayItems] = useState(visibleItems.default);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDisplayItems(visibleItems.sm);
      } else if (width < 768) {
        setDisplayItems(visibleItems.md);
      } else if (width < 1024) {
        setDisplayItems(visibleItems.lg);
      } else {
        setDisplayItems(visibleItems.default);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [visibleItems]);

  // Navigation functions
  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => {
        const maxIndex = Math.ceil(items.length / displayItems) - 1;
        return prev >= maxIndex ? 0 : prev + 1;
      });
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isAnimating, items.length, displayItems]);

  const prevSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => {
        const maxIndex = Math.ceil(items.length / displayItems) - 1;
        return prev <= 0 ? maxIndex : prev - 1;
      });
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isAnimating, items.length, displayItems]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextSlide, autoPlayInterval);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [nextSlide, autoPlayInterval, isPaused]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Calculate visibility classes for items
  const getItemStyles = (index) => {
    const isVisible =
      index >= currentIndex * displayItems &&
      index < (currentIndex + 1) * displayItems;

    return {
      visibility: isVisible ? "visible" : "hidden",
      opacity: isVisible ? 1 : 0,
    };
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-glass-medium hover:bg-glass-heavy backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-neutral-dark" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-glass-medium hover:bg-glass-heavy backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-neutral-dark" />
      </button>

      {/* Carousel Content */}
      <div
        className="flex group touch-pan-y"
        style={{
          transform: `translateX(-${currentIndex * (100 / displayItems)}%)`,
          transition: "transform 500ms ease-in-out",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="w-full min-w-[25%] px-4 transition-all duration-500"
            style={getItemStyles(index)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {Array.from({ length: Math.ceil(items.length / displayItems) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-secondary-DEFAULT w-4"
                  : "bg-neutral-DEFAULT/30 hover:bg-neutral-DEFAULT/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default BrandCarousel;
