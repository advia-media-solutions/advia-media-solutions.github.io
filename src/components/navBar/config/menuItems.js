import { Home, Package, Users, MessageSquare } from 'lucide-react';
import React from 'react';

export const menuItems = [
  {
    to: '/',
    label: 'Home',
    icon: <Home className="w-5 h-5" />,
  },
  {
    to: '/products',
    label: 'Products',
    icon: <Package className="w-5 h-5" />,
  },
  {
    to: '/about',
    label: 'About Us',
    icon: <Users className="w-5 h-5" />,
  },
];

export default menuItems;
