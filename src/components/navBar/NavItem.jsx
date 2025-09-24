import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { preserveUtmParams } from "../../utils/urlUtils";

const NavItem = ({ item, location, onClick, className = "" }) => {
  const router = useRouter();

  if (!item.to) return null;

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }

    const preservedUrl = preserveUtmParams(item.to);
    router.push(preservedUrl);
  };

  const isActive = location?.pathname === item.to;

  return (
    <Link
      href={preserveUtmParams(item.to)}
      className={`
        px-4 py-2 rounded-lg flex items-center
        text-neutral-dark transition-all
        ${
          isActive
            ? "bg-primary-light/10 text-primary-light"
            : "hover:bg-neutral-100"
        }
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
