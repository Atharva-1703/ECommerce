"use client";
import SideBar from "@/components/admin/Sidebar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export default function AdminContainer() {
  const [open, setOpen] = useState<boolean>(false);
  const tabs = ["product", "test", "orders", "users", "reviews"];
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

  return (
    <div className="flex md:p-8 relative">
      <aside className="hidden md:block fixed top-24 left-0 w-64 h-screen border-r">
        <SideBar
          tabs={tabs}
          onSelectTab={(tab) => setSelectedTab(tab)}
          selectedTab={selectedTab}
        />
      </aside>

      <div
        className={`fixed inset-0 top-20 md:hidden ${open ? "block" : "hidden"}`}
      >
        <div className="absolute inset-0 " onClick={() => setOpen(false)}></div>

        {/* Drawer */}
        <div className="absolute left-0 top-0 w-64 h-[78vh] p-4 bg-white shadow-2xl  ">
          <button className="mb-4" onClick={() => setOpen(false)}>
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
          <SideBar
            tabs={tabs}
            onSelectTab={(tab) => setSelectedTab(tab)}
            selectedTab={selectedTab}
          />
        </div>
      </div>

      <main className="flex-1 p-4 md:ml-64 md:p-6 min-h-screen">
        <div className=" md:hidden mb-4 flex items-center gap-3">
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Icon icon="mdi:menu" className="w-7 h-7" />
          </button>
          <h1 className="text-2xl font-bold text-black">Admin</h1>
        </div>
      </main>
    </div>
  );
}
