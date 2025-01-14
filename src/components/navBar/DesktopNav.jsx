import React from "react";
import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Mail } from "lucide-react";
import NavDropdown from "./NavDropdown";
import NavItem from "./NavItem";
import Button from "../Button";
import { menuItems } from "./config/menuItems";

const DesktopNav = ({ openDropdown, setOpenDropdown }) => {
  const location = useLocation();

  return (
    <div className="hidden md:flex items-center space-x-4">
      {menuItems.map((item) =>
        item.dropdown ? (
          <NavDropdown
            key={item.label}
            item={item}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        ) : (
          <NavItem key={item.label} item={item} location={location} />
        )
      )}
      <div className="flex items-center gap-6 pl-2 border-l border-neutral-200">
        <span className="text-sm font-medium text-neutral-600 animate-fadeIn ml-4">
          ¿Te interesa?
        </span>
        <Button
          as={Link}
          to="/contact"
          size="sm"
          className="bg-white hover:bg-neutral-50"
          icon={<Mail className="w-4 h-4" />}
        >
          ¡Contacta ahora!
        </Button>
      </div>
    </div>
  );
};

DesktopNav.propTypes = {
  openDropdown: PropTypes.string,
  setOpenDropdown: PropTypes.func.isRequired,
};

export default DesktopNav;
