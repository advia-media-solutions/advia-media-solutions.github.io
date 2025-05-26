import React from "react";
import { Stars } from "lucide-react";
import GlassCard from "./../components/GlassCard"; // Import GlassCard

const TestimonialsBlock = () => {
  const testimonials = [
    {
      quote:
        "Esto aporta un enfoque estratégico clave para la activación digital, muy necesario en las agencias",
      author: "Ex Ejecutivo C-Level",
      company: "Agencia de Medios",
      featured: true,
    },
    {
      quote: "Es un enfoque muy novedoso, muy diferente de lo que conozco",
      author: "Account Director",
      company: "Agencia de Medios",
      featured: false,
    },
    {
      quote:
        "[Cliente] siempre ha tenido problemas para dirigirse a ciertos segmentos, creo que esto podría ser muy útil",
      author: "Brand Director",
      company: "Agencia de Medios",
      featured: false,
    },
    {
      quote: "Parece ciencia ficción",
      author: "Responsable de Paid Media",
      company: "Cliente Directo",
      featured: false,
    },
  ];

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* Clean background - no colored elements */}

      {/* Content Container */}
      <div className="container mx-auto px-4 relative max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-sm font-medium mb-6 shadow-sm">
            <Stars className="w-4 h-4" />
            <span>Testimonios de Clientes</span>
          </div>

          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 tracking-tight mb-6">
            Lo que dicen nuestros{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                clientes
              </span>
            </span>
          </h2>

          <p className="text-lg text-gray-600">
            Comentarios de expertos en activación de medios digitales
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
          {/* Featured Testimonial */}
          <div className="lg:col-span-12 mb-8">
            <GlassCard className="overflow-hidden">
              <div className="p-8 md:p-12 flex flex-col justify-between min-h-[200px]">
                {/* Quote at the top */}
                <div className="mb-6">
                  <blockquote className="text-lg md:text-2xl xl:text-3xl font-medium text-gray-900 leading-relaxed">
                    "{testimonials[0].quote}"
                  </blockquote>
                </div>

                {/* Author info at the bottom */}
                <div className="mt-auto">
                  <div className="h-px bg-gray-300 mb-4"></div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"></div>
                      <div className="font-semibold text-gray-900 text-lg">
                        {testimonials[0].author}
                      </div>
                    </div>
                    <div className="text-gray-600 ml-5">
                      {testimonials[0].company}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Regular Testimonials */}
          {testimonials.slice(1).map((testimonial, index) => (
            <div key={index + 1} className="lg:col-span-4">
              <GlassCard className="h-full">
                <div className="p-6 flex flex-col justify-between h-full min-h-[250px]">
                  {/* Quote at the top */}
                  <div className="mb-6">
                    <blockquote className="text-lg font-medium text-gray-900 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>

                  {/* Author info at the bottom */}
                  <footer className="mt-auto">
                    <div className="h-px bg-gray-300 mb-4"></div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"></div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.author}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 ml-5">
                        {testimonial.company}
                      </div>
                    </div>
                  </footer>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsBlock;
