import { useUserStore } from "@/stores/useUserStore";
import React from "react";

const ProfileOverview = () => {
  const { user } = useUserStore();
  return (
    <div className="space-y-6">
      <h2 className=" text-xl font-semibold mb-4">Account Information</h2>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-300">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <div>
            <p className="text-gray-500 text-sm">Username</p>
            <p className="text-gray-900 font-medium text-lg">{user?.username}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-gray-900 font-medium text-lg">{user?.email}</p>
          </div>
        </div>
      </div>
      <p className="text-gray-500 text-sm">
        Joined on:
        <span className="font-medium text-gray-800">
          {user!.createdAt
            ? new Date(user!.createdAt).toLocaleDateString()
            : "—"}
        </span>
      </p>
    </div>
  );
};

export default ProfileOverview;
