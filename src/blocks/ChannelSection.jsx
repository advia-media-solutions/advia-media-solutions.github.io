import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ChannelSection = ({
  title,
  description,
  features,
  imageSrc,
  imageAlt,
  reverse = false,
  stats = [],
  background = "",
}) => {
  return (
    <div className={`w-full md:py-16 ${background}`}>
      <div className="container mx-auto px-4">
        {/* Main Layout */}
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12",
            reverse && "lg:direction-rtl"
          )}
        >
          {/* Content Column */}
          <div className={cn("space-y-8", reverse && "lg:order-2")}>
            {/* Title and Description */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-neutral-dark">{title}</h2>
              <p className="text-lg text-neutral-DEFAULT/80">{description}</p>
            </div>

            {/* Statistics Section */}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="group">
                    <div className="text-3xl font-bold text-neutral-dark group-hover:text-secondary-DEFAULT transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-neutral-DEFAULT/80 font-medium mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Features List */}
            <ul className="space-y-6">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 group hover:transform hover:translate-x-1 transition-transform duration-300"
                >
                  <div className="w-6 h-6 rounded-full bg-secondary-DEFAULT/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary-DEFAULT/20 transition-colors duration-300">
                    <feature.icon className="w-4 h-4 text-secondary-DEFAULT" />
                  </div>
                  <span className="text-neutral-DEFAULT/80 group-hover:text-neutral-dark transition-colors duration-300">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Column */}
          <div
            className={cn(
              "relative rounded-xl overflow-hidden bg-neutral-light flex items-center justify-center min-h-full",
              reverse && "lg:order-1"
            )}
          >
            <div className="w-full h-full aspect-video">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover rounded-xl shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelSection;
