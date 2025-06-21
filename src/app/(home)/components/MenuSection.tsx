import { useState } from "react";
import MenuContent from "./MenuContent";
import MenuTabs from "./MenuTabs";

const dummyData = [
  {
    id: 1,
    name: "MIE GACOAN LV 1",
    price: 10000,
    imageUrl: "/images/BackgroundHero.png",
  },
  {
    id: 2,
    name: "MIE GACOAN LV 1",
    price: 10000,
    imageUrl: "/images/BackgroundHero.png",
  },
  {
    id: 3,
    name: "MIE GACOAN LV 1",
    price: 10000,
    imageUrl: "/images/BackgroundHero.png",
  },
  {
    id: 4,
    name: "MIE GACOAN LV 1",
    price: 10000,
    imageUrl: "/images/BackgroundHero.png",
  },
  {
    id: 5,
    name: "MIE GACOAN LV 1",
    price: 10000,
    imageUrl: "/images/BackgroundHero.png",
  },
];

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState("Makanan");

  return (
    <div className="bg-gray-100 min-h-screen">
      <MenuTabs activeTab={activeTab} onChange={setActiveTab} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 p-4 lg:p-12 bg-[#F6F6F6]">
        {dummyData.map((item) => (
          <MenuContent key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
