'use client';

import React, { useEffect, useState } from 'react';
import { useKitchen } from '@/lib/hooks/useKitchen';
import MenuCard from '@/components/cards/MenuCard';
import { MenuItem } from '@/types/Menu';

const MenuContainer: React.FC = () => {
  const {
    menuItems,
    fetchMenuItems,
    toggleMenuAvailability,
    error,
    setError,
    loading
  } = useKitchen();
  const [activeCategory, setActiveCategory] = useState<'makanan' | 'minuman' | 'dessert'>('makanan');

  const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'MIE GACOAN LV 1',
    image: '/api/placeholder/300/200',
    category: 'makanan',
    isAvailable: true
  },
  {
    id: '2',
    name: 'MIE GACOAN LV 2',
    image: '/api/placeholder/300/200',
    category: 'makanan',
    isAvailable: false
  },
  {
    id: '3',
    name: 'ES TEH MANIS',
    image: '/api/placeholder/300/200',
    category: 'minuman',
    isAvailable: true
  },
  {
    id: '4',
    name: 'PUDING COKLAT',
    image: '/api/placeholder/300/200',
    category: 'dessert',
    isAvailable: true
  }
];


  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  const filteredItems =
  menuItems.length > 0
    ? menuItems.filter(item => item.category === activeCategory)
    : mockMenuItems.filter(item => item.category === activeCategory);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white shadow-md rounded flex">
        {['makanan', 'minuman', 'dessert'].map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category as any)}
            className={`w-full py-4 font-semibold border-b-4 text-center ${
              activeCategory === category ? 'text-tomato border-tomato' : 'text-gray border-transparent'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded">
          {error} <button onClick={() => setError()} className="ml-2 text-sm underline">Tutup</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <MenuCard key={item.id} item={item} onToggleAvailability={toggleMenuAvailability} />
        ))}
      </div>

      {!loading && filteredItems.length === 0 && (
        <div className="text-center text-gray py-12">
          Tidak ada menu untuk kategori ini.
        </div>
      )}
    </div>
  );
};

export default MenuContainer;