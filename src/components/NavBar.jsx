// src/components/NavBar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";
import {
  Menu,
  X,
  ArrowLeft,
  Home,
  Briefcase,
  InfoIcon,
  Phone,
  Users,
  MessageSquare,
  Package,
  ChevronDown,
} from "lucide-react";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      to: "/",
      label: "Home",
      description: "Return to the main page of our website",
      icon: <Home className="w-6 h-6" />,
    },
    {
      label: "Products",
      description: "Explore our product offerings",
      icon: <Package className="w-6 h-6" />,
      dropdown: [
        {
          to: "/products/web-simulation",
          label: "User Simulation on Open Web",
          description: "Understand user behavior across the open web",
          enabled: true,
        },
        {
          to: "/products/youtube-simulation",
          label: "User Simulation on YouTube",
          description: "Coming soon - Analyze user behavior on YouTube",
          enabled: false,
        },
      ],
    },
    {
      to: "/about",
      label: "About Us",
      description: "Learn more about our company and values",
      icon: <Users className="w-6 h-6" />,
    },
    {
      to: "/contact",
      label: "Contact",
      description: "Get in touch with our team",
      icon: <MessageSquare className="w-6 h-6" />,
    },
  ];

  const navClasses = `
    fixed top-0 left-0 right-0 z-40
    transition-all duration-300
    ${isScrolled ? "py-2" : "py-4"}
    backdrop-blur-sm
    border-b border-white/10
    ${isScrolled ? "bg-corporate-cream/50" : "bg-transparent"}
    shadow-lg shadow-black/5
  `;

  const desktopLinkClasses = `
    relative
    px-8 py-3
    rounded-xl
    text-corporate-dark font-semibold
    transition-all duration-300
    overflow-hidden
    group
    hover:bg-gradient-to-br hover:from-corporate-cream/90 hover:to-corporate-cream/70
    hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]
    before:absolute before:inset-0 
    before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
    before:translate-x-[-200%] before:transition-transform before:duration-500
    hover:before:translate-x-[200%]
  `;

  const activeLinkClasses = `
    bg-gradient-to-br from-corporate-cream/90 to-corporate-cream/70
    shadow-[0_4px_12px_rgba(0,0,0,0.1)]
    text-corporate-blue
  `;

  const mobileMenuClasses = `
    fixed inset-0
    bg-gradient-to-br from-corporate-cream via-white/98 to-corporate-cream
    transition-all duration-300 ease-out
    flex flex-col
    ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
    z-50
  `;

  const mobileHeaderClasses = `
    relative
    px-6 py-4
    flex items-center
    border-b border-corporate-dark/5
  `;

  const mobileLinkClasses = `
    flex items-start gap-4
    px-6 py-4
    text-corporate-dark
    hover:bg-corporate-blue/5
    transition-all duration-300
    group
  `;

  return (
    <>
      <nav className={navClasses}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Logo className="w-48 h-10 md:w-48 md:h-12" />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {menuItems.map((item) =>
                item.dropdown ? (
                  <div key={item.label} className="relative dropdown-container">
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        )
                      }
                      className={`${desktopLinkClasses} inline-flex items-center gap-2`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>

                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="py-1">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.to}
                              to={dropdownItem.enabled ? dropdownItem.to : "#"}
                              className={`
                                block px-4 py-3 text-sm
                                ${
                                  dropdownItem.enabled
                                    ? "text-corporate-dark hover:bg-corporate-cream/50"
                                    : "text-corporate-gray/50 cursor-not-allowed"
                                }
                              `}
                            >
                              <div className="font-medium">
                                {dropdownItem.label}
                              </div>
                              <div className="text-corporate-gray/70 text-xs mt-1">
                                {dropdownItem.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`${desktopLinkClasses} ${
                      location.pathname === item.to ? activeLinkClasses : ""
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </span>
                  </Link>
                )
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-corporate-dark/80 hover:text-corporate-blue transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={mobileMenuClasses}>
        {/* Header with back button */}
        <div className={mobileHeaderClasses}>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 text-corporate-dark/80 hover:text-corporate-blue transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg font-semibold">Back</span>
          </button>
        </div>

        {/* Logo section */}
        <div className="px-6 py-8 flex justify-center border-b border-corporate-dark/5">
          <Logo
            className="w-32 h-12 transition-transform duration-300 hover:scale-105"
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>

        {/* Navigation content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-6">
            <h2 className="text-sm font-medium text-corporate-dark/60 uppercase tracking-wider">
              Menu
            </h2>
          </div>

          <div className="space-y-2">
            {menuItems.map((item) =>
              item.dropdown ? (
                <div key={item.label} className="space-y-2">
                  <div className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-corporate-orange/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-lg font-semibold text-corporate-dark">
                          {item.label}
                        </div>
                        <div className="text-sm text-corporate-gray/60">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pl-16 space-y-1">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.to}
                        to={dropdownItem.enabled ? dropdownItem.to : "#"}
                        className={`
                          block py-2 px-4 rounded-lg
                          ${
                            dropdownItem.enabled
                              ? "text-corporate-dark hover:bg-corporate-cream/50"
                              : "text-corporate-gray/50 cursor-not-allowed"
                          }
                        `}
                        onClick={() =>
                          dropdownItem.enabled && setIsMobileMenuOpen(false)
                        }
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className={mobileLinkClasses}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 rounded-xl bg-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-corporate-blue/20 transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-semibold mb-1 group-hover:text-corporate-blue transition-colors">
                      {item.label}
                    </div>
                    <div className="text-sm text-corporate-dark/60 group-hover:text-corporate-dark/70 transition-colors line-clamp-2">
                      {item.description}
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-corporate-blue/5 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-corporate-teal/5 rounded-full blur-2xl animate-float-medium" />
          <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-corporate-purple/5 rounded-full blur-2xl animate-float-fast" />
        </div>
      </div>
    </>
  );
};

export default NavBar;
