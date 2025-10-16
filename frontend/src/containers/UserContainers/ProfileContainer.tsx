"use client";

import ProfileAddresses from "@/components/Profile/ProfileAddresses";
import ProfileOverview from "@/components/Profile/ProfileOverview";
import ProfileReviews from "@/components/Profile/ProfileReviews";
import React, { useState } from "react";

const tabs = [
  { key: "overview", label: "Overview" },
  { key: "reviews", label: "Reviews" },
  { key: "addresses", label: "Addresses" },
];

const ProfileContainer = () => {
  const [activetab, setActiveTab] = useState<string>("overview");

  const renderTabContent = () => {
    switch (activetab) {
      case "overview":
        return <ProfileOverview />;
      case "reviews":
        return <ProfileReviews />;
      case "addresses":
        return <ProfileAddresses />;

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-b">My Profile</h1>
        <section>
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium ${
                  activetab === tab.key ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-6">{renderTabContent()}</div>
        </section>
      </div>
    </main>
  );
};

export default ProfileContainer;
