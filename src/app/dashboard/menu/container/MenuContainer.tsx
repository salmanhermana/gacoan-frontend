"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import MenuCard from "@/components/cards/MenuCard";
import useGetAllMenus from "@/app/hooks/useGetAllMenus";
import useGetAllCategories from "@/app/hooks/useGetAllCategories";
import { useKitchen } from "@/app/hooks/useKitchen";

const MenuContainer = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const { data: categories = [] } = useGetAllCategories();
  const { data: menuItems = [], isLoading } = useGetAllMenus(selectedCategoryId ?? undefined);
  const { toggleMenuAvailability, loading } = useKitchen();

  return (
    <section className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={selectedCategoryId === null ? "default" : "outline"}
          onClick={() => setSelectedCategoryId(null)}
        >
          Semua
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategoryId === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategoryId(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {menuItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onToggleAvailability={toggleMenuAvailability}
            loading={loading}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuContainer;