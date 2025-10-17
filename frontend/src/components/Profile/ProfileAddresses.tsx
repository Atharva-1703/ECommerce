"use client";

import React from "react";
import { Icon } from "@iconify/react";
import AddAddressForm from "./AddAddressForm";
import { useUserStore } from "@/stores/useUserStore";

const dummyAddresses = [
  {
    name: "Home",
    street: "221B Baker Street",
    city: "London",
    state: "London",
    postalCode: "NW1 6XE",
    country: "United Kingdom",
    phone: "+44 7911 123456",
  },
  {
    name: "Office",
    street: "742 Evergreen Terrace",
    city: "Springfield",
    state: "IL",
    postalCode: "62704",
    country: "USA",
    phone: "+1 555-123-4567",
  },
];

const ProfileAddresses = () => {
  const {user,removeAddress}=useUserStore();

  const handleRemoveAddress = async(addressId: string) => {
    await removeAddress(addressId);
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <header>
        <h2 className="text-2xl font-semibold text-gray-900">Your Addresses</h2>
        <p className="text-gray-600 mt-1">
          Manage your shipping and billing addresses here.
        </p>
      </header>

      {/* Address List */}
      <div className="grid gap-6">
        {user?.address.map((address, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
          >
            {/* Header Row */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {address.name}
                
              </h3>
              <div className="flex gap-3">
                <button className="text-gray-600 hover:text-gray-900 transition">
                  <Icon icon="mdi:pencil-outline" className="w-5 h-5" />
                </button>
                <button className="text-red-500 cursor-pointer hover:text-red-700 transition" onClick={()=>removeAddress(address._id!)}>
                  <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Address Details */}
            <dl className="grid sm:grid-cols-2 gap-y-3 text-gray-800">
              <div>
                <dt className="text-sm text-gray-500">Street</dt>
                <dd className="font-medium">{address.street}</dd>
              </div>

              <div>
                <dt className="text-sm text-gray-500">City</dt>
                <dd className="font-medium">{address.city}</dd>
              </div>

              <div>
                <dt className="text-sm text-gray-500">State</dt>
                <dd className="font-medium">{address.state}</dd>
              </div>

              <div>
                <dt className="text-sm text-gray-500">Postal Code</dt>
                <dd className="font-medium">{address.postalCode}</dd>
              </div>

              <div>
                <dt className="text-sm text-gray-500">Country</dt>
                <dd className="font-medium">{address.country}</dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm text-gray-500">Phone Number</dt>
                <dd className="font-medium">{address.phone}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <AddAddressForm/>
    </section>
  );
};

export default ProfileAddresses;
