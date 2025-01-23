// src/hooks/useScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]); // Se ejecutará cada vez que cambie la ruta
};

export default useScrollToTop;
