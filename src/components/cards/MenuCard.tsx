import React, { useState } from 'react';
import { MenuItem } from '@/types/Menu';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import Image from 'next/image';

interface MenuCardProps {
  item: MenuItem;
  onToggleAvailability: (id: string, isAvailable: boolean) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onToggleAvailability }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleToggle = () => {
    setShowConfirmation(true);
  };

  const confirmToggle = () => {
    onToggleAvailability(item.id, !item.isAvailable);
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="w-[260px] rounded-[11.62px] bg-white flex flex-col items-start justify-start py-[17.4px] px-[11.6px] box-border gap-[11.6px]">
        <Image
          className={`self-stretch relative max-w-full overflow-hidden h-[188.8px] shrink-0 object-cover ${!item.isAvailable ? 'mix-blend-luminosity' : ''}`}
          width={236.7}
          height={188.8}
          sizes="100vw"
          alt={item.name}
          src={item.image || '/placeholder.jpg'}
        />
        <div className="self-stretch flex flex-col items-start justify-start gap-1.5">
          <div className="relative font-semibold text-lg text-gray">{item.name}</div>
          <button
            onClick={handleToggle}
            className={`w-[237px] rounded h-6 flex flex-row items-center justify-center py-2 px-[22px] box-border text-sm text-whitesmoke-100 font-poppins ${
              item.isAvailable ? 'bg-mediumspringgreen' : 'bg-crimson'
            }`}
          >
            <div className="relative leading-6 font-semibold">
              {item.isAvailable ? 'Item Available' : 'Item Unavailable'}
            </div>
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={confirmToggle}
        title="Konfirmasi Perubahan"
        message={`Apakah Anda yakin ingin mengubah status "${item.name}" menjadi ${item.isAvailable ? 'tidak tersedia' : 'tersedia'}?`}
      />
    </>
  );
};

export default MenuCard;
