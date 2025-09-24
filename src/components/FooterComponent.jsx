// src/components/FooterComponent.jsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Mail, MapPin, Linkedin } from "lucide-react";

const Footer = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (link) => {
    if (link.isProduct) {
      router.push(link.to);
      setTimeout(() => {
        const element = document.getElementById(link.to.split("#")[1]);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 50;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      router.push(link.to);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const footerSections = {
    company: {
      title: "Empresa",
      links: [
        { label: "Sobre Nosotros", to: "/about" },
        { label: "Contacto", to: "/contact" },
      ],
    },
    solutions: {
      title: "Productos",
      links: [
        {
          label: "Simulación en Open web",
          to: "/products#open-web",
          isProduct: true,
        },
        {
          label: "Simulación en Youtube",
          to: "/products#youtube",
          isProduct: true,
        },
        {
          label: "Simulación en Tiktok",
          to: "/products#tiktok",
          isProduct: true,
        },
      ],
    },
    support: {
      title: "Soporte",
      links: [
        { label: "Política de Cookies", to: "/cookies-policy" },
        { label: "Política de Privacidad", to: "/privacy-policy" },
        { label: "Aviso Legal", to: "/legal-notice" },
      ],
    },
  };

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/company/advia-media-solutions/",
      label: "LinkedIn",
    },
  ];

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, text: "contacto@advia.tech" },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: "C. de Moreno Nieto, 2, Arganzuela, 28005 Madrid",
    },
  ];

  return (
    <footer className="relative mt-10 bg-[#292929] text-white">
      <div className="relative container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="pt-16 pb-12 border-b border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-white/70"
                  >
                    <span className="mt-1 flex-shrink-0">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Columns */}
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key} className="lg:col-span-1">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.to}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link);
                        }}
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-white/60 text-sm">
              © {currentYear} Advia. Todos los derechos reservados.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full
                    flex items-center justify-center
                    text-white/60
                    hover:text-white
                    hover:bg-white/10
                    transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
