import { address } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface AddressCardProps{
    address:address;
    onEdit:()=>void;
    handleRemoveAddress:(addressId: string) => Promise<void>;
}

const AddressCard = ({address,onEdit,handleRemoveAddress}:AddressCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">{address.name}</h3>
        <div className="flex gap-3">
          <button className="text-gray-600 cursor-pointer hover:text-gray-900 transition" onClick={onEdit}>
            <Icon icon="mdi:pencil-outline" className="w-5 h-5" />
          </button>
          <button
            className="text-red-500 cursor-pointer hover:text-red-700 transition"
            onClick={() => handleRemoveAddress(address._id!)}
          >
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
  );
};

export default AddressCard;
