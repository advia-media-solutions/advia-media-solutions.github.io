import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return {
    isScrolled,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    openDropdown,
    setOpenDropdown,
  };
};

export default useNavigation;
