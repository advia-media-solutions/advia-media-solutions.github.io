import React from "react";

const ValueCard = ({ icon, title, subtitle, className = "", index = 0 }) => {
  return (
    <div
      role="article"
      aria-labelledby={`value-title-${index}`}
      className={`
        relative
        bg-white/80
        backdrop-blur-sm
        rounded-3xl
        shadow-lg
        hover:shadow-xl
        transition-all
        duration-500
        group
        p-8
        animate-fadeIn
        opacity-0
        hover:translate-y-[-4px]
        border border-neutral-light/20
        overflow-hidden
        ${className}
      `}
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: "forwards",
      }}
    >
      {/* Decorative background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-light/5 via-transparent to-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header section with icon and title */}
      <div className="flex items-center gap-4 mb-6">
        {/* Icon with enhanced container */}
        <div
          aria-hidden="true"
          className="relative transition-transform duration-500 group-hover:scale-110 flex-shrink-0"
        >
          <div className="w-12 h-12 rounded-xl bg-secondary-DEFAULT/10 p-2.5 text-secondary-DEFAULT relative">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-xl bg-secondary-DEFAULT/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">{icon}</div>
          </div>
        </div>

        {/* Title */}
        <h3
          id={`value-title-${index}`}
          className="text-2xl font-bold text-neutral-dark group-hover:text-primary-light transition-colors duration-300"
        >
          {title}
        </h3>
      </div>

      {/* Subtitle as a separate block */}
      <p className="text-neutral-DEFAULT/80 leading-relaxed text-lg transition-colors duration-300 group-hover:text-neutral-dark">
        {subtitle}
      </p>

      {/* Interactive highlight effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-DEFAULT to-primary-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
};

export default ValueCard;
