import React from 'react';
import { MapPin, Clock, Navigation2, ExternalLink, Phone, Mail } from 'lucide-react';
import GlassCard from './GlassCard';

const LocationCard = () => {
  const location = {
    name: "Google for Startups Campus",
    address: "C. de Moreno Nieto, 2",
    city: "Arganzuela, 28005 Madrid",
    coordinates: {
      lat: 40.41271712474577,
      lng: -3.7171392163822223
    },
    schedule: {
      weekdays: "9:00 - 18:00",
      weekend: "Closed"
    },
    contact: {
      phone: "+34 900 000 000",
      email: "campus@advia.tech"
    }
  };

  const handleNavigate = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=Google+for+Startups+Campus+Madrid`, '_blank');
  };

  return (
    <GlassCard className="w-full max-w-4xl mx-auto overflow-hidden">
      <div className="p-8 md:p-12">
        {/* Header with campus name */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-corporate-dark mb-3">
            {location.name}
          </h3>
          <div className="h-1 w-24 bg-gradient-to-r from-corporate-orange to-corporate-coral mx-auto rounded-full" />
        </div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column - Address & Hours */}
          <div className="space-y-8">
            {/* Address Section */}
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-corporate-orange/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-corporate-orange group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-xl font-semibold text-corporate-dark">Our Office</h4>
              </div>
              <div className="ml-13 space-y-1">
                <p className="text-lg text-corporate-gray/80">{location.address}</p>
                <p className="text-lg text-corporate-gray/80">{location.city}</p>
              </div>
            </div>

            {/* Business Hours Section */}
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-corporate-orange/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-corporate-orange group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-xl font-semibold text-corporate-dark">Business Hours</h4>
              </div>
              <div className="ml-13 space-y-1">
                <p className="text-lg text-corporate-gray/80">Monday - Friday: {location.schedule.weekdays}</p>
                <p className="text-lg text-corporate-gray/80">Weekend: {location.schedule.weekend}</p>
              </div>
            </div>
          </div>

          {/* Right column - Contact & Navigation */}
          <div className="space-y-8">
            {/* Contact Section */}
            <div className="space-y-4">
              <a 
                href={`tel:${location.contact.phone}`}
                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-corporate-orange/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-corporate-orange/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-corporate-orange group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-lg text-corporate-gray/80 group-hover:text-corporate-dark transition-colors">
                  {location.contact.phone}
                </span>
              </a>

              <a 
                href={`mailto:${location.contact.email}`}
                className="group flex items-center gap-3 p-3 rounded-xl hover:bg-corporate-orange/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-corporate-orange/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-corporate-orange group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-lg text-corporate-gray/80 group-hover:text-corporate-dark transition-colors">
                  {location.contact.email}
                </span>
              </a>
            </div>

            {/* Navigation Button */}
            <button
              onClick={handleNavigate}
              className="w-full p-4 rounded-xl
                bg-gradient-to-r from-corporate-orange to-corporate-coral
                text-white text-lg font-semibold
                transition-all duration-300
                hover:shadow-lg hover:shadow-corporate-orange/20
                active:scale-98
                flex items-center justify-center gap-2"
            >
              <Navigation2 className="w-5 h-5" />
              Get Directions
              <ExternalLink className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-corporate-orange/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-corporate-coral/5 rounded-full blur-2xl animate-float-medium" />
      </div>
    </GlassCard>
  );
};

export default LocationCard;