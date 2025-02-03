import React, { useState } from "react";

const SelectedCompanies = () => {
  // Estado inicial con array de objetos para las empresas
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Advia",
      status: "pending",
      number: "01",
      comingSoon: true,
    },
    {
      id: 2,
      name: "Empresa 2",
      status: "pending",
      number: "02",
      comingSoon: true,
    },
    {
      id: 3,
      name: "Empresa 3",
      status: "pending",
      number: "03",
      comingSoon: true,
    },
    {
      id: 4,
      name: "Empresa 4",
      status: "pending",
      number: "04",
      comingSoon: true,
    },
    {
      id: 5,
      name: "Empresa 5",
      status: "pending",
      number: "05",
      comingSoon: true,
    },
  ]);

  // Función para cambiar el estado
  const handleToggleStatus = (companyId) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === companyId
          ? {
              ...company,
              status: company.status === "active" ? "inactive" : "active",
              comingSoon: !company.comingSoon,
            }
          : company
      )
    );
  };

  return (
    <section className="py-12 bg-gradient-to-b from-white to-primary-light/5">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-primary-light">
              Impulsamos a 5 PYMES
            </span>{" "}
            con tecnología IA
          </h2>
          <p className="text-lg text-neutral/80 mb-8">
            Seleccionadas para el programa exclusivo de Advia Media Solutions
          </p>

          <div className="inline-flex items-center bg-primary-light/10 px-6 py-2 rounded-full border border-primary-light/20">
            <span className="text-sm font-semibold text-primary-dark">
              Advia Impulsa 2025
            </span>
          </div>
        </div>

        {/* Grid de empresas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {companies.map((company) => (
            <div
              key={company.id}
              className="group aspect-square rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 flex items-center justify-center relative overflow-hidden border border-primary-light/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-primary-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="text-center px-4 z-10">
                <div className="text-3xl font-bold text-primary-dark/30 mb-2">
                  {company.number}
                </div>
                <span className="text-sm font-medium text-neutral/50 tracking-wide">
                  {company.comingSoon ? "Próximamente" : company.name}
                </span>
              </div>

              {/* Indicador de estado interactivo */}
              <div
                className="absolute bottom-4 right-4 cursor-pointer"
                onClick={() => handleToggleStatus(company.id)}
              >
                <div className="w-8 h-8 bg-primary-light/10 rounded-full flex items-center justify-center border border-primary-light/20">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      company.status === "active"
                        ? "bg-green-500"
                        : company.status === "inactive"
                        ? "bg-red-500"
                        : "bg-primary-light animate-pulse"
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-sm text-neutral/60 max-w-2xl mx-auto">
          Las empresas seleccionadas podrán disfrutar de forma gratuita de
          nuestra tecnología IA para aumentar su presencia digital.
        </p>
      </div>
    </section>
  );
};

export default SelectedCompanies;
