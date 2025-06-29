'use client';

import Image from 'next/image';
import ToggleButton from '@/components/buttons/ToggleButton';
import { Menu } from '@/types/Menu';

interface MenuCardProps {
  menu: Menu & { is_available: boolean };
  onAvailabilityChange?: (menuId: string, available: boolean) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, onAvailabilityChange }) => {
  const handleToggle = (available: boolean) => {
    onAvailabilityChange?.(menu.id, available);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <Image
          src="/img/mie-gacoan.jpg"
          alt={menu.name}
          width={200}
          height={150}
          className={`w-full h-40 object-cover ${
            !menu.is_available ? 'grayscale' : ''
          }`}
        />
        {!menu.is_available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">UNAVAILABLE</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">{menu.name}</h3>
        <ToggleButton
          menuId={menu.id}
          initialAvailable={menu.is_available}
          onToggle={handleToggle}
        />
      </div>
    </div>
  );
};

export default MenuCard;