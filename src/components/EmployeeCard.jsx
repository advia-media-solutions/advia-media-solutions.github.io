import React from 'react';
import { Mail, Quote } from 'lucide-react';
import GlassCard from './GlassCard';

const EmployeeCard = ({
  name,
  role,
  quote,
  email,
  imageUrl = "/api/placeholder/300/300",
  className = ""
}) => {
  return (
    <div 
      className={`
        relative overflow-hidden
        bg-white rounded-2xl
        transition-all duration-300 ease-out
        group
        hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]
        ${className}
      `}
    >
      <div className="relative z-10 p-8 flex flex-col items-center">
        {/* Profile Image Container */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          {/* Image Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-50 shadow-md">
            <img
              src={imageUrl}
              alt={`${name}'s profile`}
              loading="lazy"
              className="w-full h-full object-cover
                transition-transform duration-500
                group-hover:scale-105"
            />
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4 w-full">
          {/* Name & Role */}
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-corporate-dark">
              {name}
            </h3>
            <p className="text-corporate-gray/80 font-medium">
              {role}
            </p>
          </div>

          {/* Quote */}
          {quote && (
            <div className="relative mt-6 px-4">
              <Quote className="absolute top-0 left-0 w-5 h-5 text-corporate-orange/30 -translate-x-2 -translate-y-2" />
              <p className="text-corporate-gray/70 text-sm italic leading-relaxed">
                {quote}
              </p>
              <Quote className="absolute bottom-0 right-0 w-5 h-5 text-corporate-orange/30 translate-x-2 translate-y-2 rotate-180" />
            </div>
          )}

          {/* Contact Links */}
          {email && (
            <div className="pt-6">
            <a
                href={`mailto:${email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                  bg-corporate-cream hover:bg-corporate-orange/10
                  text-corporate-dark/70 hover:text-corporate-dark
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-corporate-orange/50"
                aria-label={`Send email to ${name}`}
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">Contact</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Subtle hover effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-corporate-orange/5 to-transparent" />
      </div>
    </div>
  );
};

export default EmployeeCard;