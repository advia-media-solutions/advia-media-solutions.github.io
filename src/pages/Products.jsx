import React from "react";
import {
  Play,
  Globe,
  Video,
  Sparkles,
  LineChart,
  UserCheck,
  Route,
  Users,
  Target,
} from "lucide-react";
import ScrollToTop from "../components/ScrollToTop";
import ChannelSection from "../blocks/ChannelSection";
import CreativeSection from "../blocks/CreativeSection";
import SimulationOverview from "../blocks/SimulationOverview";

const Products = () => {
  const channels = [
    {
      id: "open-web", // Add id for scrolling
      background: "",
      title: "Simulación en Open Web",
      description:
        "Simulamos la navegación de tus potenciales clientes en la web abierta, identificando patrones de búsqueda y consumo de información. Esto nos permite conectar con ellos en el momento preciso cuando están activamente buscando información relevante para tu marca o industria, maximizando así la efectividad de tu inversión publicitaria.",
      features: [
        {
          icon: Globe,
          text: "Análisis avanzado de patrones de navegación en tiempo real",
        },
        {
          icon: Route,
          text: "Identificación precisa de momentos de búsqueda activa",
        },
        {
          icon: LineChart,
          text: "Optimización continua basada en comportamiento del usuario",
        },
        {
          icon: UserCheck,
          text: "Activación publicitaria contextual y relevante",
        },
      ],
      imageSrc:
        "https://storage.googleapis.com/public-web-assets-advia/Images/openweb.jpeg",
      imageAlt: "Simulación en Open Web",
      stats: [
        { value: "96%", label: "Precisión en targeting" },
        { value: "3.2x", label: "Reducción de costes" },
      ],
      benefits: [
        "Mayor precisión en el targeting",
        "Reducción de costes publicitarios",
        "Mejor comprensión del journey del cliente",
      ],
    },
    {
      id: "youtube",
      background: "bg-neutral-50",
      title: "Simulación en YouTube",
      description:
        "Replicamos el comportamiento de visualización de vídeos informativos de tu audiencia objetivo, analizando patrones de consumo y preferencias de contenido. Esto nos permite mostrar tu publicidad en el momento más oportuno, cuando tu audiencia está más receptiva y comprometida con contenido relacionado a tu industria.",
      features: [
        {
          icon: Play,
          text: "Análisis de patrones de visualización de contenido",
        },
        {
          icon: Users,
          text: "Identificación de momentos de alta receptividad",
        },
        {
          icon: Target,
          text: "Optimización basada en engagement real",
        },
        {
          icon: LineChart,
          text: "Medición continua de efectividad y ajuste de estrategia",
        },
      ],
      imageSrc:
        "https://storage.googleapis.com/public-web-assets-advia/Images/youtube.jpeg",
      imageAlt: "Simulación en YouTube",
      stats: [
        { value: "93%", label: "Eficiencia de campaña" },
        { value: "2.5x", label: "Mayor engagement" },
      ],
      benefits: [
        "Mayor precisión en el targeting",
        "Incremento de la eficiencia de la campaña",
        "Presencia notoria",
      ],
    },
    {
      id: "tiktok",
      background: "",
      title: "Simulación en TikTok",
      description:
        "Innovamos en la forma de conectar con audiencias en TikTok mediante la simulación avanzada del comportamiento de usuarios en la plataforma. Analizamos patrones de interacción, preferencias de contenido y momentos de máximo engagement para optimizar la entrega de tu mensaje publicitario. Esta nueva frontera en la publicidad digital estará disponible próximamente.",
      features: [
        {
          icon: Video,
          text: "Análisis profundo de interacciones en la plataforma",
        },
        {
          icon: Users,
          text: "Identificación de tendencias y comportamientos",
        },
        {
          icon: Target,
          text: "Optimización de formatos publicitarios",
        },
        {
          icon: Sparkles,
          text: "Innovación constante en estrategias de engagement",
        },
      ],
      imageSrc:
        "https://storage.googleapis.com/public-web-assets-advia/Images/tiktok.jpeg",
      imageAlt: "Simulación en TikTok",
      stats: [
        { value: "Próximamente", label: "En desarrollo" },
        { value: "2025 H2", label: "Lanzamiento" },
      ],
      benefits: [
        "Expansión a nuevas audiencias",
        "Navegación activa en el app",
        "Análisis de engagement por formato",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-12">
      <div className="mx-auto">
        {/* Section 1: Simulation Overview */}
        <SimulationOverview />

        {/* Section 2: Creative Section */}
        <div className="mb-32">
          <CreativeSection />
        </div>

        {/* Section 3: Channels */}
        <div className="space-y-24 mb-12">
          {channels.map((channel, index) => (
            <div
              key={index}
              id={channel.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <ChannelSection {...channel} reverse={index % 2 === 1} />
            </div>
          ))}
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default Products;
