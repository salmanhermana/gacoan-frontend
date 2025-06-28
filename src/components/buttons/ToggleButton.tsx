'use client';

import { useState } from 'react';
import { useMenuAvailability } from '/lib/hooks/useKitchen';

interface ToggleButtonProps {
  menuId: string;
  initialAvailable: boolean;
  onToggle?: (available: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  menuId,
  initialAvailable,
  onToggle,
}) => {
  const [isAvailable, setIsAvailable] = useState(initialAvailable);
  const { toggleMenuAvailability, loading } = useMenuAvailability();

  const handleToggle = async () => {
    try {
      const newAvailability = !isAvailable;
      await toggleMenuAvailability(menuId, newAvailability);
      setIsAvailable(newAvailability);
      onToggle?.(newAvailability);
    } catch (error) {
      // Error handled by hook
      console.error('Toggle failed:', error);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        isAvailable
          ? 'bg-green-500 text-white hover:bg-green-600'
          : 'bg-red-500 text-white hover:bg-red-600'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Loading...' : isAvailable ? 'Item Available' : 'Item Unavailable'}
    </button>
  );
};

export default ToggleButton;