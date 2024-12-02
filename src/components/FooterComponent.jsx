import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    company: {
      title: 'Company',
      links: [
        { label: 'About', to: '/about' },
        { label: 'Careers', to: '/careers' },
        { label: 'Blog', to: '/blog' },
        { label: 'Press', to: '/press' }
      ]
    },
    solutions: {
      title: 'Solutions',
      links: [
        { label: 'AI Marketing', to: '/solutions/ai-marketing' },
        { label: 'Customer Analytics', to: '/solutions/analytics' },
        { label: 'Brand Insights', to: '/solutions/insights' },
        { label: 'Media Activation', to: '/solutions/media' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { label: 'Help Center', to: '/help' },
        { label: 'Documentation', to: '/docs' },
        { label: 'Contact', to: '/contact' },
        { label: 'Status', to: '/status' }
      ]
    }
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com', label: 'Instagram' }
  ];

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, text: 'contact@advia.tech' },
    { icon: <Phone className="w-5 h-5" />, text: '+34 900 000 000' },
    { icon: <MapPin className="w-5 h-5" />, text: 'Madrid, Spain' }
  ];

  return (
    <footer className="relative mt-20">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-corporate-orange/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-corporate-coral/5 rounded-full blur-2xl animate-float-medium" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="pt-16 pb-12 border-b border-corporate-dark/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-corporate-gray/70">
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Columns */}
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key} className="lg:col-span-1">
                <h3 className="text-lg font-semibold text-corporate-dark mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.to}
                        className="text-corporate-gray/70 hover:text-corporate-dark transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter Column */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-corporate-dark mb-4">
                Stay Updated
              </h3>
              <p className="text-corporate-gray/70 mb-4">
                Subscribe to our newsletter for the latest updates.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-xl
                    bg-white/50 backdrop-blur-sm
                    border border-corporate-dark/10
                    focus:border-corporate-orange
                    focus:ring-2 focus:ring-corporate-orange/20
                    transition-all duration-300
                    placeholder:text-corporate-gray/50"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-xl
                    bg-gradient-to-r from-corporate-orange to-corporate-coral
                    text-white font-semibold
                    hover:shadow-lg hover:shadow-corporate-orange/20
                    transition-all duration-300
                    active:scale-95"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-corporate-gray/60 text-sm">
              © {currentYear} Advia. All rights reserved.
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
                    text-corporate-gray/60
                    hover:text-corporate-dark
                    hover:bg-corporate-orange/10
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