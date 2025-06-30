import React, { useState } from 'react';
import { Menu } from '@/types/Menu/menu';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import Image from 'next/image';

interface MenuCardProps {
  item: Menu;
  onToggleAvailability: (id: string, isAvailable: boolean) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onToggleAvailability }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleToggle = () => {
    setShowConfirmation(true);
  };

  const confirmToggle = () => {
    onToggleAvailability(item.id, !item.is_available);
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="w-[260px] rounded-[11.62px] bg-white flex flex-col items-start justify-start p-[17.4px] gap-[11.6px] shadow-md">
        <Image
          className={`self-stretch h-[188.8px] object-cover ${!item.is_available ? 'mix-blend-luminosity opacity-70' : ''}`}
          width={237}
          height={189}
          alt={item.name}
          src={item.image_url || '/placeholder.jpg'}
        />
        <div className="self-stretch flex flex-col items-start justify-start gap-1.5">
          <div className="font-semibold text-gray text-lg">{item.name}</div>
          <div className="text-sm text-gray">{item.description}</div>
          <div className="text-sm text-gray">Rp {item.price}</div>
          <button
            onClick={handleToggle}
            className={`w-full rounded h-6 flex items-center justify-center px-[22px] text-sm font-poppins font-semibold text-whitesmoke-100 ${item.is_available ? 'bg-mediumspringgreen' : 'bg-crimson'}`}
          >
            {item.is_available ? 'Item Available' : 'Item Unavailable'}
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={confirmToggle}
        title="Konfirmasi Perubahan"
        message={`Apakah Anda yakin ingin mengubah status \"${item.name}\" menjadi ${item.is_available ? 'tidak tersedia' : 'tersedia'}?`}
      />
    </>
  );
};

export default MenuCard;