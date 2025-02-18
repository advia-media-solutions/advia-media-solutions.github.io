import React from "react";
import EmployeeCard from "../components/EmployeeCard";

const AboutTeam = () => {
  const teamMembers = [
    {
      name: "Miguel Pérez",
      role: "Co-Fundador",
      quote:
        "La innovación no se trata solo de tecnología, sino de entender a las personas y crear conexiones significativas que impulsen el crecimiento.",
      email: "miguel@advia.tech",
      linkedinUrl:
        "https://www.linkedin.com/in/luis-miguel-p%C3%A9rez-p%C3%A9rez/",
      imageUrl:
        "https://storage.googleapis.com/public-web-assets-advia/Images/miguelo%CC%81n.jpeg",
    },
    {
      name: "Jaime Sanabria",
      role: "Co-Fundador",
      quote:
        "La tecnología debe simplificar la vida, no complicarla. Nuestro objetivo es hacer que la publicidad sea potente y accesible.",
      email: "jaime@advia.tech",
      linkedinUrl: "https://www.linkedin.com/in/jaime-sanabria-sunye/",
      imageUrl:
        "https://storage.googleapis.com/public-web-assets-advia/Images/jimmy.jpeg",
    },
    {
      name: "Pablo Martínez",
      role: "Co-Fundador",
      quote:
        "El futuro pertenece a quienes pueden imaginarlo, darle forma y guiar a otros hacia él. Estamos aquí para construir ese futuro.",
      email: "pablo@advia.tech",
      linkedinUrl:
        "https://www.linkedin.com/in/pablo-mart%C3%ADnez-salt%C3%B3-6b258aa1/",
      imageUrl:
        "https://storage.googleapis.com/public-web-assets-advia/Images/pablo.jpeg",
    },
  ];

  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-neutral-dark mb-6">
        Nuestro Equipo
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <EmployeeCard key={index} {...member} className="min-h-[400px]" />
        ))}
      </div>
    </div>
  );
};

export default AboutTeam;
