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
      id: "open-web",
      background: "",
      title: "Campañas Navegación Activa en Open Web",
      description:
        "Simulamos la navegación de tus potenciales clientes en open web, identificando patrones de búsqueda y consumo de información. Esto nos permite conectar con ellos en el momento preciso cuando están activamente buscando información relevante para tu marca o industria, maximizando así la efectividad de tu inversión publicitaria.",
      features: [
        {
          icon: Globe,
          text: "Simulación de patrones de navegación en tiempo real",
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
          text: "Insights desde el punto de vista de tu consumidor",
        },
      ],
      imageSrc:
        "https://storage.googleapis.com/public-web-assets-advia/Images/openweb.jpeg",
      imageAlt: "Simulación en Open Web",
      stats: [
        { value: "2.8x", label: "Mayor Afinidad" },
        { value: "2.2x", label: "Eficiencia Navegación Activa" },
      ],
      benefits: [
        "Mayor precisión en el targeting",
        "Reducción de costes publicitarios",
        "Mejor comprensión del journey del cliente",
      ],
    },
    // Update within the channels array
    {
      id: "youtube",
      background: "bg-neutral-50",
      title: "Campañas Navegación Activa en YouTube",
      description:
        "Replicamos el comportamiento de visualización de vídeos informativos de tus consumidores estableciendo una conexión más efectiva con tu audiencia. Esto nos permite impactar en los momentos de máxima receptividad, cuando tu mensaje se alinea con sus intereses.",
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
        { value: "Próximamente", label: "En desarrollo" },
        { value: "2025 H1", label: "Lanzamiento" },
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
      title: "Campañas Navegación Activa en TikTok",
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
        "Navegación Activa en el app",
        "Análisis de engagement por formato",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-12">
      <div className="mx-auto">
        {/* Section 1: Simulation Overview */}
        <SimulationOverview />

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
