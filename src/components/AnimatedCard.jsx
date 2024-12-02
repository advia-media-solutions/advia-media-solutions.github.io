import React from 'react';
import styles from './AnimatedCard.module.css';

const AnimatedCard = ({
  title = "UI / UX Designer",
  subtitle = "MikeAndrewDesigner",
  icon,
  className = "",
  size = "md" // sm, md, lg
}) => {
  const sizeClasses = {
    sm: {
      card: "w-48 h-64",
      icon: "w-12 h-12",
      title: "text-lg",
      subtitle: "text-sm"
    },
    md: {
      card: "w-64 h-80",
      icon: "w-16 h-16",
      title: "text-xl",
      subtitle: "text-base"
    },
    lg: {
      card: "w-80 h-96",
      icon: "w-20 h-20",
      title: "text-2xl",
      subtitle: "text-lg"
    }
  };

  return (
    <div className={`
      relative overflow-hidden
      backdrop-blur-sm 
      bg-gradient-to-br from-corporate-cream/50 to-corporate-cream/30
      rounded-2xl
      border border-white/30
      shadow-[0_4px_12px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)]
      hover:shadow-[0_8px_24px_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.15)]
      transition-all duration-300
      group
      ${sizeClasses[size].card}
      ${className}
    `}>
      {/* Waves background */}
      <div className={`${styles.wave} bg-gradient-to-br from-corporate-orange/40 via-corporate-coral/40 to-corporate-orange/40`}></div>
      <div className={`${styles.wave} bg-gradient-to-br from-corporate-coral/30 via-corporate-orange/30 to-corporate-orange/30`}></div>
      <div className={`${styles.wave} bg-gradient-to-br from-corporate-orange/20 via-corporate-orange/20 to-corporate-coral/20`}></div>

      {/* Glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
        {icon ? (
          <div className={`${sizeClasses[size].icon} mb-4 transition-transform duration-300 group-hover:scale-110`}>
            {icon}
          </div>
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            className={`${sizeClasses[size].icon} mb-4 transition-transform duration-300 group-hover:scale-110`}
          >
            <path fill="currentColor" d="M19.4133 4.89862L14.5863 2.17544C12.9911 1.27485 11.0089 1.27485 9.41368 2.17544L4.58674 4.89862C2.99153 5.7992 2 7.47596 2 9.2763V14.7235C2 16.5238 2.99153 18.2014 4.58674 19.1012L9.41368 21.8252C10.2079 22.2734 11.105 22.5 12.0046 22.5C12.6952 22.5 13.3874 22.3657 14.0349 22.0954C14.2204 22.018 14.4059 21.9273 14.5872 21.8252L19.4141 19.1012C19.9765 18.7831 20.4655 18.3728 20.8651 17.8825C21.597 16.9894 22 15.8671 22 14.7243V9.27713C22 7.47678 21.0085 5.7992 19.4133 4.89862ZM4.10784 14.7235V9.2763C4.10784 8.20928 4.6955 7.21559 5.64066 6.68166L10.4676 3.95848C10.9398 3.69152 11.4701 3.55804 11.9996 3.55804C12.5291 3.55804 13.0594 3.69152 13.5324 3.95848L18.3593 6.68166C19.3045 7.21476 19.8922 8.20928 19.8922 9.2763V9.75997C19.1426 9.60836 18.377 9.53091 17.6022 9.53091C14.7929 9.53091 12.1041 10.5501 10.0309 12.3999C8.36735 13.8847 7.21142 15.8012 6.68783 17.9081L5.63981 17.3165C4.69466 16.7834 4.10699 15.7897 4.10699 14.7235H4.10784ZM10.4676 20.0413L8.60933 18.9924C8.94996 17.0479 9.94402 15.2665 11.4515 13.921C13.1353 12.4181 15.3198 11.5908 17.6022 11.5908C18.3804 11.5908 19.1477 11.6864 19.8922 11.8742V14.7235C19.8922 15.2278 19.7589 15.7254 19.5119 16.1662C18.7615 15.3596 17.6806 14.8528 16.4783 14.8528C14.2136 14.8528 12.3781 16.6466 12.3781 18.8598C12.3781 19.3937 12.4861 19.9021 12.68 20.3676C11.9347 20.5316 11.1396 20.4203 10.4684 20.0413H10.4676Z"></path>
          </svg>
        )}
        
        <h3 className={`${sizeClasses[size].title} font-semibold mb-2 transition-transform duration-300 group-hover:scale-105`}>
          {title}
        </h3>
        
        <p className={`${sizeClasses[size].subtitle} text-corporate-gray/80 transition-transform duration-300 group-hover:scale-105`}>
          {subtitle}
        </p>
      </div>

      {/* Hover effects */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-lg"></div>
      </div>
    </div>
  );
};

export default AnimatedCard;