import React from 'react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

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
  onClick,
  loading = false,
  disabled = false,
}) => {
  const sizeClasses = {
    sm: padding || 'px-4 py-2 text-sm',
    md: padding || 'px-6 py-3 text-base',
    lg: padding || 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    default: `
      relative
      text-corporate-dark
      before:absolute before:inset-0 before:-z-10
      before:rounded-[inherit] before:p-[1px]
      shadow-[0_4px_12px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)]
      hover:shadow-[0_8px_24px_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.15),0_1px_2px_rgba(0,0,0,0.1)]
      active:shadow-[inset_0_4px_12px_rgba(0,0,0,0.2)]
    `,
    primary: `
      relative
      bg-gradient-to-tr from-[#EC9F3F]/90 to-[#F5CE8B]/70
      text-corporate-dark
      before:absolute before:inset-0 before:-z-10
      before:rounded-[inherit] before:p-[1px]
      before:bg-gradient-to-tr before:from-[#EC9F3F] before:via-[#F3BB62] before:to-[#F5CE8B]
      hover:before:from-[#EC9F3F] hover:before:via-[#F3BB62] hover:before:to-[#F5CE8B]
      shadow-[0_4px_12px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)]
      hover:shadow-[0_8px_24px_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.15),0_1px_2px_rgba(0,0,0,0.1)]
      active:shadow-[inset_0_4px_12px_rgba(0,0,0,0.2)]
    `,
  };

  const baseClasses = `
    relative inline-flex items-center justify-center
    overflow-hidden
    font-semibold
    transition-all duration-300
    backdrop-blur-sm
    disabled:opacity-60 disabled:cursor-not-allowed
    disabled:hover:shadow-none
    group
  `;

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${rounded}
    ${variantClasses[variant]}
    ${className}
  `;

  const content = (
    <>
      {/* Efecto de brillo */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-[-100%] blur-sm animate-[spin_4s_linear_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>

      {/* Efecto de gradiente superior */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

      {/* Contenido del botón */}
      <div className="relative flex items-center justify-center min-h-[24px] gap-2">
        {loading ? (
          <Spin indicator={
            <LoadingOutlined 
              style={{ 
                fontSize: 24,
                color: 'var(--corporate-dark, #292929)'
              }} 
              spin 
            />
          } />
        ) : (
          <>
            {icon && <span className="duration-300 group-hover:scale-110">{icon}</span>}
            <span className="duration-300 group-hover:scale-105">{children}</span>
          </>
        )}
      </div>

      {/* Efecto de resplandor en hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-lg" />
    </>
  );

  if (loading || disabled) {
    return (
      <button disabled className={buttonClasses}>
        {content}
      </button>
    );
  }

  if (to) {
    return (
      <Link to={to} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={buttonClasses}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;