'use client';

import { useState, useEffect } from 'react';
import MenuCard from '@/components/cards/MenuCard';
import { Menu } from '@/types';

// Mock data - replace with real API call
const mockMenus: (Menu & { is_available: boolean })[] = [
  { id: '1', name: 'MIE GACOAN LV 1', is_available: true },
  { id: '2', name: 'MIE GACOAN LV 1', is_available: false },
  { id: '3', name: 'MIE GACOAN LV 1', is_available: true },
  { id: '4', name: 'MIE GACOAN LV 1', is_available: true },
  { id: '5', name: 'MIE GACOAN LV 1', is_available: true },
  { id: '6', name: 'MIE GACOAN LV 1', is_available: true },
  { id: '7', name: 'MIE GACOAN LV 1', is_available: true },
  { id: '8', name: 'MIE GACOAN LV 1', is_available: false },
];

const MenuDashboardContainer: React.FC = () => {
  const [menus, setMenus] = useState<(Menu & { is_available: boolean })[]>(mockMenus);

  const handleAvailabilityChange = (menuId: string, available: boolean) => {
    setMenus(prev => 
      prev.map(menu => 
        menu.id === menuId ? { ...menu, is_available: available } : menu
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <div className="px-6 py-4 border-b-2 border-red-500">
              <h2 className="text-lg font-semibold text-red-500">Menu</h2>
            </div>
            <div className="px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-500">Antrian Order</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex mb-6">
              <button className="px-4 py-2 bg-red-500 text-white rounded-md mr-4">
                Makanan
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-4">
                Minuman
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">
                Dessert
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {menus.map((menu) => (
                <MenuCard
                  key={menu.id}
                  menu={menu}
                  onAvailabilityChange={handleAvailabilityChange}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDashboardContainer;