import { useMemo, useState } from "react";
import MenuContent from "./MenuContent";
import MenuTabs from "./MenuTabs";
import useGetAllMenus from "@/app/hooks/useGetAllMenus";
import MenuContentSkeleton from "./MenuContentSkeleton";
import useGetAllCategories from "@/app/hooks/useGetAllCategories";

const MenuSection = () => {
  const { data: categoryData = [], isLoading: isCategoryLoading } = useGetAllCategories();
  const [activeTab, setActiveTab] = useState("Semua");

  const tabs = useMemo(() => {
    return ["Semua", ...categoryData.map((category) => category.name)];
  }, [categoryData]);

  const activeCategoryId = useMemo(() => {
    if (activeTab === "Semua") return undefined;
    return categoryData.find((c) => c.name === activeTab)?.id;
  }, [activeTab, categoryData]);

  const { data: menuData = [], isLoading: isMenuLoading } = useGetAllMenus(activeCategoryId);

  const isLoading = isMenuLoading || isCategoryLoading;

  return (
    <div className="bg-gray-100 min-h-screen">
      <MenuTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 lg:p-12 pt-40">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <MenuContentSkeleton key={i} />)
          : menuData.map((item) => (
            <MenuContent key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default MenuSection;
