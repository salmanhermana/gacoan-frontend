interface Props {
    activeTab: string;
    onChange: (tab: string) => void;
}

export default function MenuTabs({ activeTab, onChange }: Props) {
    const tabs = ["Makanan", "Minuman", "Dessert"];

    return (
        <div className="flex justify-around border-b border-gray-300 bg-white pt-24">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={`py-3 px-4 text-sm font-semibold transition-colors cursor-pointer ${activeTab === tab
                        ? "text-primary-main border-b-2 border-primary-main"
                        : "text-black"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
