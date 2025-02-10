import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  to,
  children,
  icon,
  className = '',
  variant = 'default',
  size = 'md',
  padding,
  rounded = 'rounded-xl',
  type,
  id,
  onClick,
  loading = false,
  disabled = false,
  newTab = false,
  gtmEvent,
  event,
}) => {
  // Size classes using only Tailwind core utilities
  const sizeClasses = {
    sm: padding || 'px-4 py-2 text-sm',
    md: padding || 'px-6 py-3 text-base',
    lg: padding || 'px-8 py-4 text-lg',
  };

  // Variant classes using only Tailwind core utilities
  const variantClasses = {
    default: `
      relative
      text-gray-900
      bg-white
      shadow-md
      hover:shadow-lg
      active:shadow-inner
    `,
    primary: `
      relative
      text-gray-900
      bg-gradient-to-r
      from-orange-400
      to-yellow-300
      shadow-md
      hover:shadow-lg
      active:shadow-inner
    `,
  };

  // Base classes using only Tailwind core utilities
  const baseClasses = `
    relative 
    inline-flex 
    items-center 
    justify-center
    overflow-hidden
    font-semibold
    transition-all
    duration-300
    backdrop-blur-sm
    disabled:opacity-60 
    disabled:cursor-not-allowed
    group
  `;

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${rounded}
    ${variantClasses[variant]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const content = (
    <>
      {/* Shimmer effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Top gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

      {/* Button content */}
      <div className="relative flex items-center justify-center min-h-6 gap-2">
        {loading ? (
          <div className="animate-spin h-5 w-5 border-2 border-gray-900 rounded-full border-t-transparent" />
        ) : (
          <>
            {icon && <span className="transition-transform duration-300 group-hover:scale-110">{icon}</span>}
            <span className="transition-transform duration-300 group-hover:scale-105">{children}</span>
          </>
        )}
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 to-transparent blur" />
    </>
  );

  // Define the event handler once
  const handleClick = (e) => {
    if (event) {
      window.dataLayer?.push({
        'event': event,
        'event_from_code': event
      });
    }
    // Call the original onClick if it exists
    onClick?.(e);
  };

  // Handle disabled state
  if (loading || disabled) {
    return (
      <button 
        disabled 
        className={buttonClasses} 
        id={id}
        type={type}
      >
        {content}
      </button>
    );
  }

  // Handle link variant
  if (to) {
    const linkProps = {
      to,
      id,
      className: buttonClasses,
      onClick: handleClick,
      ...(newTab && { target: "_blank", rel: "noopener noreferrer" }),
    };
    
    return <Link {...linkProps}>{content}</Link>;
  }

  // Handle button variant
  const buttonProps = {
    id,
    type,
    onClick: handleClick,
    className: buttonClasses,
    disabled,
    ...(gtmEvent && { 'data-gtm-event': gtmEvent }),
    ...(newTab && { target: "_blank", rel: "noopener noreferrer" }),
  };

  return <button {...buttonProps}>{content}</button>;
};

export default Button;