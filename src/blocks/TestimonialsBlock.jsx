import React from "react";
import { Stars } from "lucide-react";
import GlassCard from "../components/GlassCard";

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
    <section className="relative py-10 bg-gradient-to-b from-accent-cream/10 via-white to-accent-cream/10 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-secondary-DEFAULT/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-light/10 rounded-full blur-3xl animate-float-medium" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-DEFAULT/10 text-secondary-DEFAULT text-sm font-medium mb-6">
            <Stars className="w-4 h-4" />
            <span>Testimonios de Clientes</span>
          </div>

          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold text-neutral-dark tracking-tight mb-6">
            Lo que dicen nuestros{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-primary-light to-secondary-DEFAULT bg-clip-text text-transparent">
                clientes
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-secondary-DEFAULT/20 -skew-x-6" />
            </span>
          </h2>

          <p className="text-lg text-neutral-DEFAULT/80">
            Comentarios de expertos en activación de medios digitales
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative group h-full ${
                testimonial.featured ? "md:col-span-6 md:mb-8" : "md:col-span-2"
              }`}
            >
              <GlassCard
                className={`h-full transition-all duration-500 overflow-hidden flex flex-col
                  ${
                    testimonial.featured
                      ? "bg-gradient-to-br from-white/80 to-white/60"
                      : "hover:shadow-lg hover:-translate-y-1"
                  }`}
              >
                {/* Decorative Background Element */}
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-secondary-DEFAULT/10 to-primary-light/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                <div
                  className={`relative flex-1 ${
                    testimonial.featured ? "p-8 md:p-12" : "p-6"
                  }`}
                >
                  {/* Quote Content */}
                  <div
                    className={`h-full ${
                      testimonial.featured
                        ? "md:flex md:flex-row justify-between gap-8"
                        : "flex flex-col justify-between"
                    }`}
                  >
                    <blockquote className="relative">
                      <p
                        className={`font-medium text-neutral-dark relative italic ${
                          testimonial.featured
                            ? "text-2xl md:text-3xl leading-relaxed"
                            : "text-lg"
                        }`}
                      >
                        "{testimonial.quote}"
                      </p>
                    </blockquote>

                    {/* Author Info */}
                    <footer className="mt-auto relative md:min-w-[200px]">
                      <div className="space-y-3">
                        <div className="h-px bg-gradient-to-r from-secondary-DEFAULT/30 to-transparent" />
                        <div className="relative">
                          <div className="flex flex-col justify-between h-full">
                            {/* Decorative dot */}
                            <div className="absolute -left-3 top-1/2 w-1.5 h-1.5 rounded-full bg-secondary-DEFAULT/50 transform -translate-y-1/2" />

                            <div className="pl-2 space-y-2">
                              <div className="font-semibold text-neutral-dark">
                                {testimonial.author}
                              </div>
                              <div className="text-sm text-neutral-DEFAULT/80">
                                {testimonial.company}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </footer>
                  </div>
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
