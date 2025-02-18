import { useNavigation } from "./navBar/hooks/useNavigation";
import Logo from "./Logo";
import DesktopNav from "./navBar/DesktopNav";
import MobileNav from "./navBar/MobileNav";
import { Menu } from "lucide-react";

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
        fixed top-0 left-0 right-0 z-40
        transition-all duration-300
        ${isScrolled ? "py-2 bg-accent-cream/50" : "py-4 bg-transparent"}
        backdrop-blur-sm border-b border-white/10
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Logo className="w-48 h-10" />

          <DesktopNav
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(true)}
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
