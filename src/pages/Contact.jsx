import React from 'react';
import { Mail, MessageSquare, Clock } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import EmployeeCard from '../components/EmployeeCard';
import LocationCard from '../components/LocationCard';
import ScrollToTop from '../components/ScrollToTop';

const Contact = () => {
  // Team members data (moved from About page)
  const teamMembers = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      quote: "Innovation is not just about technology, it's about understanding people and creating meaningful connections that drive growth.",
      email: "john.smith@advia.tech",
      linkedinUrl: "https://linkedin.com/in/johnsmith",
      imageUrl: "https://storage.googleapis.com/public-web-assets-advia/Images/persona.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "Chief Technology Officer",
      quote: "Technology should simplify lives, not complicate them. Our goal is to make marketing both powerful and accessible.",
      email: "sarah.johnson@advia.tech",
      linkedinUrl: "https://linkedin.com/in/sarahjohnson",
      imageUrl: "https://storage.googleapis.com/public-web-assets-advia/Images/persona.jpg"
    },
    {
      name: "Michael Brown",
      role: "Head of Innovation",
      quote: "The future belongs to those who can imagine it, shape it, and lead others towards it. We're here to build that future.",
      email: "michael.brown@advia.tech",
      linkedinUrl: "https://linkedin.com/in/michaelbrown",
      imageUrl: "https://storage.googleapis.com/public-web-assets-advia/Images/persona.jpg"
    }
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "Get in touch via email",
      info: "contact@advia.tech",
      action: "mailto:contact@advia.tech"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Chat with Us",
      description: "Live chat support",
      info: "Available 24/7",
      action: "#chat"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      description: "We're here for you",
      info: "Mon-Fri: 9:00 - 18:00"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-corporate-coral/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-corporate-orange/10 rounded-full blur-2xl animate-float-medium" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-corporate-orange/10 rounded-full blur-2xl animate-float-fast" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-corporate-dark mb-6 mt-10">
            Get in{' '}
            <span className="bg-gradient-to-r from-corporate-coral via-corporate-orange to-corporate-orange bg-clip-text text-transparent animate-gradient">
              Touch
            </span>
          </h1>
          <p className="text-xl text-corporate-gray/80 max-w-2xl mx-auto">
            Have a question or want to learn more about our services? 
            We're here to help and would love to hear from you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {contactInfo.map((info, index) => (
            <GlassCard key={index} className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-corporate-orange/10 flex items-center justify-center text-corporate-orange">
                  {info.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-2">
                    {info.title}
                  </h3>
                  <p className="text-corporate-gray/80 mb-2">
                    {info.description}
                  </p>
                  {info.action ? (
                    <a 
                      href={info.action}
                      className="text-corporate-orange hover:text-corporate-coral font-medium transition-colors"
                    >
                      {info.info}
                    </a>
                  ) : (
                    <p className="text-corporate-dark font-medium">{info.info}</p>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Location Section */}
        <div className="mb-20">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-corporate-dark mb-4">
            Visit Our Office
            </h2>
            <p className="text-xl text-corporate-gray/80 max-w-2xl mx-auto">
            Come and meet us at the Google for Startups Campus in Madrid, 
            where innovation and creativity come together.
            </p>
        </div>
        <LocationCard />
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-corporate-dark mb-6">Meet Our Team</h2>
          <p className="text-xl text-corporate-gray/80 max-w-2xl mx-auto mb-12">
            Get to know the people behind Advia who are ready to help you succeed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <EmployeeCard
                key={index}
                {...member}
                className="min-h-[400px]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll To Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Contact;