import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { preserveUtmParams } from "../../utils/urlUtils";

const NavItem = ({ item, location, onClick, className = "" }) => {
  const navigate = useNavigate();
  
  if (!item.to) return null;

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
    
    const preservedUrl = preserveUtmParams(item.to);
    navigate(preservedUrl);
  };

  const isActive = location.pathname === item.to;

  return (
    <Link
      to={preserveUtmParams(item.to)}
      className={`
        px-4 py-2 rounded-lg flex items-center
        text-neutral-dark transition-all
        ${isActive ? "bg-primary-light/10 text-primary-light" : "hover:bg-neutral-100"}
        ${className}
      `}
      onClick={handleClick}
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