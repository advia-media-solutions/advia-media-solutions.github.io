import { Home, Package, Users, MessageSquare, Wand2 } from 'lucide-react';
import React from 'react';

export const menuItems = [
  {
    to: '/',
    label: 'Inicio',
    icon: <Home className="w-5 h-5" />,
  },
  {
    to: '/products',
    label: 'Productos',
    icon: <Package className="w-5 h-5" />,
  },
  {
    to: '/technology',
    label: 'Tecnología',
    icon: <Wand2 className="w-5 h-5" />,
  },
  {
    to: '/about',
    label: 'Nosotros',
    icon: <Users className="w-5 h-5" />,
  },
];

export default menuItems;
