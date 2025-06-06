import React from "react";
import { Search, Play } from "lucide-react";

const InternetDistributionChart = () => {
  return (
    <div className="relative w-full aspect-square max-w-xl flex flex-col items-center justify-center p-6 pb-6 md:pb-10 2xl:pb-6 rounded-2xl bg-white shadow-lg">
      <h3 className="text-lg font-medium text-neutral-dark mb-6">
        Distribución del Consumo de Medios Digitales
      </h3>

      {/* Distribution Visualization */}
      <div className="relative w-full max-w-md aspect-square">
        {/* Outer Circle (80% - Passive Internet) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-dark/20 to-neutral-dark/30 shadow-inner">
          {/* Inner Circle (20% - Active Internet) */}
          <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-amber-300 to-amber-400 shadow-lg animate-float-fast" />
        </div>

        {/* Passive Internet Label - Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 flex flex-col items-center gap-2">
          <div className="p-2 mt-6 bg-neutral-dark/30 rounded-full shadow-md transition-transform hover:scale-105">
            <Play className="w-5 h-5 text-neutral-dark" />
          </div>
          <div className="text-center">
            <p className="font-bold text-2xl text-neutral-dark">80%</p>
            <p className="text-sm font-medium text-neutral-dark">
              Navegación Pasiva
            </p>
          </div>
        </div>

        {/* Active Internet Label - Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <div className="p-2 bg-amber-200 rounded-full shadow-md transition-transform hover:scale-105">
            <Search className="w-5 h-5 text-neutral-dark" />
          </div>
          <div className="text-center">
            <p className="font-bold text-2xl text-neutral-dark">20%</p>
            <p className="text-sm font-medium text-neutral-dark">
              Navegación Activa
            </p>
          </div>
        </div>
      </div>

      {/* Legend with enhanced visuals */}
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-neutral-dark">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-neutral-dark/20 to-neutral-dark/30" />
          <span className="text-neutral-dark">Entretenimiento y Scroll</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-300" />
          <span className="text-neutral-dark">Búsqueda Activa</span>
        </div>
      </div>
    </div>
  );
};

export default InternetDistributionChart;
