interface SideBarProps {
  tabs: string[];
  onSelectTab: (tab: string) => void;
  selectedTab: string
}

export default function SideBar({ tabs , onSelectTab,selectedTab}: SideBarProps) {
  return (
    <div className="w-64 p-4">
      <h1 className="text-lg font-semibold">Admin Panel</h1>
      <div className="flex flex-col w-[90%] gap-2 mt-3">
        {tabs.map((tab) => (
          <div className={`p-3 rounded-lg  cursor-pointer ${selectedTab === tab ? "bg-black text-white" : "hover:bg-gray-200"} `} onClick={()=>onSelectTab(tab)}>
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
}
