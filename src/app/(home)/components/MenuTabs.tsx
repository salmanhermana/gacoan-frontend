interface Props {
    tabs: string[];
    activeTab: string;
    onChange: (tab: string) => void;
}

export default function MenuTabs({ tabs, activeTab, onChange }: Props) {
    return (
        <div className="fixed w-full overflow-x-auto whitespace-nowrap scrollbar-hide border-b border-gray-300 bg-white pt-24 top-0">
            <div className="flex px-4 gap-2 w-full justify-between">
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
        </div>
    );
}
