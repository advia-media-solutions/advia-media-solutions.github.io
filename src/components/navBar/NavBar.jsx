import React from "react";
import { Menu } from "lucide-react";
import Logo from "../Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useNavigation } from "./hooks/useNavigation";

const NavBar = () => {
  // Custom hooks
  const {
    isScrolled,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    openDropdown,
    setOpenDropdown,
  } = useNavigation();

  // Initialize scroll-to-top behavior

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isScrolled ? "py-2 bg-accent-cream/50" : "py-4 bg-transparent"}
        backdrop-blur-sm border-b border-white/10
      `}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo with standardized size */}
          <Logo className="w-40 h-10" />

          {/* Desktop Navigation */}
          <DesktopNav
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="w-6 h-6 text-neutral-dark" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
      />
    </nav>
  );
};

export default NavBar;
