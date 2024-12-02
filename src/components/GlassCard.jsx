import React from 'react';

const GlassCard = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: `
      relative overflow-hidden
      backdrop-blur-sm bg-corporate-cream/50
      rounded-2xl
      border border-white/30
      shadow-[0_4px_12px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)]
      hover:shadow-[0_8px_24px_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.15)]
      transition-all duration-300
    `,
    feature: `
      relative overflow-hidden
      backdrop-blur-sm bg-corporate-cream/50
      rounded-2xl
      border border-white/30
      shadow-[0_4px_12px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)]
      hover:shadow-[0_8px_24px_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.15)]
      transition-all duration-300
      group
    `
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      {/* Glass highlight effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"/>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>
    </div>
  );
};

export default GlassCard;