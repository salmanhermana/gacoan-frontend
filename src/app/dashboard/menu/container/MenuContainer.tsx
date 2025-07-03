"use client";

import React, { useState } from "react";
import { useKitchen } from "@/app/hooks/useKitchen";
import MenuCard from "@/components/cards/MenuCard";
import  useGetAllCategories  from "@/app/hooks/useGetAllCategories";

const MenuContainer: React.FC = () => {
  const {
    menuItems,
    toggleMenuAvailability,
    error,
    setError,
    loading,
  } = useKitchen();

  const { data: categories = [] } = useGetAllCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    categories[0]?.id || null
  );

  const filteredItems = selectedCategoryId
    ? menuItems.filter((item) => item.category?.id === selectedCategoryId)
    : menuItems;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white shadow-md rounded flex overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
            className={`w-full py-4 font-semibold border-b-4 text-center whitespace-nowrap px-4 ${
              selectedCategoryId === category.id
                ? "text-tomato border-tomato"
                : "text-gray-500 border-transparent"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onToggleAvailability={toggleMenuAvailability}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuContainer;
