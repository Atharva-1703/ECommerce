"use client";

import { useState } from "react";
import AddAddressForm from "./AddAddressForm";
import { useUserStore } from "@/stores/useUserStore";
import AddressCard from "./AddressCard";
import EditAddressForm from "./EditAddressForm";
import { address } from "@/types";


const ProfileAddresses = () => {
  const { user, removeAddress ,editAddress} = useUserStore();
  const [editingId, setEditingId] = useState<string>("");

  const handleRemoveAddress = async (addressId: string) => {
    await removeAddress(addressId);
  };

  const handleSave = async(updated: address) => {
    // console.log(updated);
    await editAddress(editingId,updated)
    setEditingId("");
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
        {user?.address.map((address, index) =>
          editingId === address._id ? (
            <EditAddressForm
              address={address}
              onCancel={() => setEditingId("")}
              onSave={(updated) => handleSave(updated)}
            />
          ) : (
            <AddressCard
              address={address}
              onEdit={() => setEditingId(address._id!)}
              handleRemoveAddress={handleRemoveAddress}
            />
          )
        )}
      </div>

      <AddAddressForm />
    </section>
  );
};

export default ProfileAddresses;
