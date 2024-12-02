import React, { useEffect, useRef } from 'react';
import { Users, Award, Target, Briefcase, ChartBar, Globe, Trophy, Clock } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import EmployeeCard from '../components/EmployeeCard';
import ScrollToTop from '../components/ScrollToTop';
import AnimatedCounter from '../components/AnimatedCounter';
import ValueCard from '../components/ValueCard';

const About = () => {
  // Refs for sections
  const sectionRefs = {
    values: useRef(null),
    story: useRef(null),
    stats: useRef(null),
    team: useRef(null)
  };

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            entry.target.classList.add('opacity-100');
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        ref.current.classList.add('opacity-0');
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Company values data
const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Mission",
    subtitle: "To revolutionize digital marketing through AI-driven customer understanding and innovative solutions that create meaningful connections."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Culture",
    subtitle: "We foster an environment of creativity, collaboration, and continuous learning, where every team member is empowered to innovate and excel."
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Excellence",
    subtitle: "We are committed to delivering exceptional results through cutting-edge technology, data-driven insights, and unwavering dedication to quality."
  }
];

  // Company statistics
  const stats = [
    {
      icon: <Globe className="w-6 h-6" />,
      label: "Clients Worldwide",
      value: "200+",
      description: "Trusted by leading brands"
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: "Team Members",
      value: "50+",
      description: "Talented professionals"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      label: "Success Rate",
      value: "95%",
      description: "Client satisfaction"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Years of Innovation",
      value: "10+",
      description: "Industry experience"
    }
  ];

  // Team members data
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
            About{' '}
            <span className="bg-gradient-to-r from-corporate-coral via-corporate-orange to-corporate-orange bg-clip-text text-transparent animate-gradient">
              Advia
            </span>
          </h1>
          <p className="text-xl text-corporate-gray/80 max-w-2xl mx-auto">
            We're pioneering the future of digital marketing through advanced AI technology
            and deep customer understanding, helping businesses create meaningful connections
            in the digital age.
          </p>
        </div>

        {/* Values Section */}
        <div ref={sectionRefs.values} className="mb-32 transition-all duration-700">
          <h2 className="text-3xl font-bold text-corporate-dark text-center mb-16">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                subtitle={value.subtitle}
                className="h-full"
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div ref={sectionRefs.story} className="mb-20 transition-all duration-700">
          <GlassCard className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center p-8">
              <div>
                <h2 className="text-3xl font-bold text-corporate-dark mb-6">Our Story</h2>
                <div className="space-y-4 text-corporate-gray/80">
                  <p>
                    Founded with a vision to transform how businesses connect with their customers, 
                    Advia has been at the forefront of marketing innovation since our inception.
                  </p>
                  <p>
                    Our journey began with a simple question: How can we help businesses truly 
                    understand their customers? This led us to develop cutting-edge AI solutions 
                    that simulate and predict customer behavior with unprecedented accuracy.
                  </p>
                  <p>
                    Today, we're proud to serve clients worldwide, helping them build stronger 
                    connections with their audiences through data-driven insights and innovative 
                    marketing strategies that deliver measurable results.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-corporate-coral/20 via-corporate-orange/20 to-corporate-orange/20 animate-pulse" />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Stats Section */}
        <div ref={sectionRefs.stats} className="mb-20 transition-all duration-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <GlassCard key={index} className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-corporate-orange/10 flex items-center justify-center text-corporate-orange">
                    {stat.icon}
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-corporate-dark mb-1">
                      <AnimatedCounter value={stat.value} />
                    </h3>
                    <p className="text-corporate-gray/80 font-medium mb-1">
                      {stat.label}
                    </p>
                    <p className="text-sm text-corporate-gray/60">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div ref={sectionRefs.team} className="text-center mb-12 transition-all duration-700">
          <h2 className="text-4xl font-bold text-corporate-dark mb-6">Our Leadership</h2>
          <p className="text-xl text-corporate-gray/80 max-w-2xl mx-auto mb-12">
            Meet the visionary team driving innovation and excellence at Advia.
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

export default About;