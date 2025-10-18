"use client";
import { address } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

interface EditAddressFormProps {
  address: address;
  onCancel: () => void;
  onSave: (updated: address) =>void;
}

const EditAddressForm = ({address,onCancel,onSave}:EditAddressFormProps) => {
    const [formData, setFormData] = useState(address);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await onSave(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg p-4 border">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full border px-3 py-2 rounded-md"
      />
      <input
        name="street"
        value={formData.street}
        onChange={handleChange}
        placeholder="Street"
        className="w-full border px-3 py-2 rounded-md"
      />
      <input
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        className="w-full border px-3 py-2 rounded-md"
      />
      <input
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
        className="w-full border px-3 py-2 rounded-md"
      />
      <input
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        placeholder="Postal Code"
        className="w-full border px-3 py-2 rounded-md"
      />
      <input
        name="country"
        value={formData.country}
        onChange={handleChange}
        placeholder="Country"
        className="w-full border px-3 py-2 rounded-md"
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full border px-3 py-2 rounded-md"
      />
      <div className="flex justify-end gap-3 mt-4">
        <button type="button" onClick={onCancel} className="text-gray-600 hover:underline">
          Cancel
        </button>
        <button type="submit" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditAddressForm;
