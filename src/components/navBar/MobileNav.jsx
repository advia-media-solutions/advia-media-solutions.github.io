import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import Logo from "../Logo";
import NavItem from "./NavItem";
import { menuItems } from "./config/menuItems";
import Button from "../Button";
import { Mail } from "lucide-react";
import { preserveUtmParams } from "../../utils/urlUtils";

const MobileNav = ({ isOpen, onClose }) => {
  const router = useRouter();

  // Handle body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div
      className={`
        fixed inset-0 z-[100] md:hidden
        flex flex-col
        bg-white
        transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}
        ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
      `}
      style={{
        height: "100dvh",
        overscrollBehavior: "contain",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Header */}
      <div className="relative bg-white border-b border-neutral-100">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between h-14">
            <Logo className="w-44 h-10" />
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-neutral-dark" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="container mx-auto px-4">
          <nav className="py-6 space-y-2">
            {menuItems.map((item) => (
              <div key={item.label} className="py-1">
                <div className="px-4">
                  <NavItem
                    item={{
                      ...item,
                      icon: React.cloneElement(item.icon, {
                        className: "w-5 h-5 mr-3",
                      }),
                    }}
                    location={{ pathname: router.pathname }}
                    onClick={onClose}
                    className="w-full py-3 text-base"
                  />
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
      <div className="container mx-auto px-4 py-4 border-t border-neutral-100 mt-4">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium text-neutral-600 animate-fadeIn">
            ¿Te interesa?
          </span>
          <Button
            as={Link}
            to={preserveUtmParams("/contact")}
            size="sm"
            className="w-full bg-white hover:bg-neutral-50"
            icon={<Mail className="w-4 h-4" />}
            onClick={onClose}
          >
            ¡Contacta ahora!
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative bg-white border-t border-neutral-100">
        <div className="container mx-auto px-4 py-4">
          <div className="text-sm text-neutral-500 text-center">
            © 2025 Advia. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </div>
  );
};

MobileNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MobileNav;
