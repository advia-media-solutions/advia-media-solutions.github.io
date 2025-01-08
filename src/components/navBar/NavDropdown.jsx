import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";

const NavDropdown = ({ item, openDropdown, setOpenDropdown }) => {
  return (
    <div className="relative">
      <button
        onClick={() =>
          setOpenDropdown(openDropdown === item.label ? null : item.label)
        }
        className="px-4 py-2 rounded-lg inline-flex items-center gap-2 text-neutral-dark hover:bg-neutral-light transition-all"
      >
        {item.icon}
        {item.label}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            openDropdown === item.label ? "rotate-180" : ""
          }`}
        />
      </button>

      {openDropdown === item.label && (
        <div className="absolute top-full left-0 mt-2 w-64 rounded-lg bg-white shadow-lg">
          {item.dropdown.map((dropdownItem) => (
            <Link
              key={dropdownItem.to}
              to={dropdownItem.enabled ? dropdownItem.to : "#"}
              className={`block px-4 py-3 ${
                dropdownItem.enabled
                  ? "text-neutral-dark hover:bg-neutral-light"
                  : "text-neutral/50 cursor-not-allowed"
              }`}
            >
              {dropdownItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

NavDropdown.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.element,
    dropdown: PropTypes.arrayOf(
      PropTypes.shape({
        to: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        enabled: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
  openDropdown: PropTypes.string,
  setOpenDropdown: PropTypes.func.isRequired,
};

export default NavDropdown;
