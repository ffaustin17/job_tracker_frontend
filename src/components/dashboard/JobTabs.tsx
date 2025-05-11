type JobTabsProps = {
    activeTab : string;
    onTabChange: (tab: string) => void;
    tabs: string[];
};

export default function JobTabs({ activeTab, onTabChange, tabs }: JobTabsProps){
    return (
        <div className="flex flex-wrap gap-3 mb-4">
            {tabs.map((tab) => (
            <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
                activeTab === tab ? "bg-blue-600" : "bg-slate-700 hover:bg-slate-600"
                }`}
            >
                {tab}
            </button>
            ))}
        </div>
    );
}