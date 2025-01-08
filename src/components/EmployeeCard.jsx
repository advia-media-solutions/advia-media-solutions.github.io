import React from "react";
import { Linkedin } from "lucide-react";
import Button from "./Button"; // Add this import

const EmployeeCard = ({
  name,
  role,
  quote,
  linkedinUrl,
  imageUrl = "/api/placeholder/300/300",
  className = "",
}) => {
  const handleLinkedInClick = () => {
    window.open(linkedinUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <article
      className={`
        relative overflow-hidden
        backdrop-blur-sm bg-white/80
        rounded-xl
        border border-white/30
        shadow-[0_4px_12px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)]
        group
        ${className}
      `}
      aria-labelledby={`employee-name-${name
        .replace(/\s+/g, "-")
        .toLowerCase()}`}
    >
      {/* Glass highlight effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 p-6">
        {/* Profile Image */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="w-24 h-24 mx-auto">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-sm group-hover:shadow-md transition-shadow">
              <img
                src={imageUrl}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="text-center space-y-3">
          {/* Name & Role */}
          <div className="space-y-1">
            <h3
              id={`employee-name-${name.replace(/\s+/g, "-").toLowerCase()}`}
              className="text-lg font-bold text-neutral-dark"
            >
              {name}
            </h3>
            <p className="text-sm text-neutral-DEFAULT/80 font-medium">
              {role}
            </p>
          </div>

          {/* Quote */}
          {quote && (
            <p className="text-neutral-DEFAULT/70 text-sm italic leading-relaxed pb-4">
              "{quote}"
            </p>
          )}

          {/* LinkedIn Contact Button */}
          {linkedinUrl && (
            <Button
              size="sm"
              onClick={handleLinkedInClick}
              className="bg-glass-light hover:bg-glass-medium mt-4"
              padding="px-6 py-3"
              rounded="rounded-lg"
              aria-label={`Ver perfil de LinkedIn de ${name}`}
            >
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                <span className="text-sm font-medium">Contactar</span>
              </div>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default EmployeeCard;
