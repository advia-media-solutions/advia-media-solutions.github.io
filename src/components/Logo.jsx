import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ to = "/", src = "https://storage.googleapis.com/public-web-assets-advia/advia.svg", alt = "Company Logo", className = "w-72 h-28 object-contain m-0 p-0" }) => {
  return (
    <Link to={to} className={className}>
      <img 
        src={src}
        alt={alt} 
        className
      />
    </Link>
  );
};

export default Logo;