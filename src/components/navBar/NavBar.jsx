import React from "react";
import { Menu } from "lucide-react";
import Logo from "../Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useNavigation } from "./hooks/useNavigation";

const NavBar = () => {
  const {
    isScrolled,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    openDropdown,
    setOpenDropdown,
  } = useNavigation();

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isScrolled ? "py-2 bg-accent-cream/50" : "py-4 bg-transparent"}
        backdrop-blur-sm border-b border-white/10
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Standardized Logo size */}
          <Logo className="w-40 h-10" />

          <DesktopNav
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />

          {/* Updated button styles to match MobileNav */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-neutral-dark" />
          </button>
        </div>
      </div>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
};

export default NavBar;
