import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavItem = ({ item, location, onClick, className = "" }) => {
  if (!item.to) return null;

  return (
    <Link
      to={item.to}
      className={`
        px-4 py-2 rounded-lg flex items-center
        text-neutral-dark transition-all
        ${
          location.pathname === item.to
            ? "bg-primary-light/10 text-primary-light"
            : "hover:bg-neutral-100"
        }
        ${className}
      `}
      onClick={onClick}
    >
      {item.icon}
      <span className="flex-1 ml-2">{item.label}</span>
    </Link>
  );
};

NavItem.propTypes = {
  item: PropTypes.shape({
    to: PropTypes.string,
    label: PropTypes.string.isRequired,
    icon: PropTypes.element,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default NavItem;
