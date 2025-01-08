// src/blocks/AboutStats.jsx
import React from "react";
import { Globe, Users, Trophy, Clock } from "lucide-react";
import GlassCard from "../components/GlassCard";
import AnimatedCounter from "../components/AnimatedCounter";

const AboutStats = () => {
  const stats = [
    {
      icon: <Globe className="w-6 h-6" />,
      label: "Clients Worldwide",
      value: "200+",
      description: "Trusted by leading brands",
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Team Members",
      value: "50+",
      description: "Talented professionals",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      label: "Success Rate",
      value: "95%",
      description: "Client satisfaction",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Years of Innovation",
      value: "10+",
      description: "Industry experience",
    },
  ];

  return (
    <div className="mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <GlassCard key={index} className="p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-secondary-DEFAULT/10 flex items-center justify-center text-secondary-DEFAULT">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-4xl font-bold text-neutral-dark mb-1">
                  <AnimatedCounter value={stat.value} />
                </h3>
                <p className="text-neutral-DEFAULT/80 font-medium mb-1">
                  {stat.label}
                </p>
                <p className="text-sm text-neutral-DEFAULT/60">
                  {stat.description}
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default AboutStats;
