import React from 'react';

const ValueCard = ({
  icon,
  title,
  subtitle,
  className = "",
  index = 0
}) => {
  return (
    <div 
      className={`
        bg-white
        rounded-3xl
        shadow-[0_2px_20px_rgba(0,0,0,0.04)]
        hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]
        transition-all duration-300
        group
        p-10
        animate-fadeIn
        opacity-0
        ${className}
      `}
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'forwards'
      }}
    >
      {/* Icon */}
      <div className="mb-8">
        <div className="w-14 h-14 text-corporate-orange">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-corporate-dark">
          {title}
        </h3>
        <p className="text-[#94A3B8] leading-relaxed text-lg">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default ValueCard;