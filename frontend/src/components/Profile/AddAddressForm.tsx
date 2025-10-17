"use client";
import { useUserStore } from "@/stores/useUserStore";
import React from "react";

const AddAddressForm = () => {
  const  {addAddress}=useUserStore()
  const [formState, setFormState] = React.useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      });
    };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
    await addAddress(formState);

  }


  return (
    <form className="space-y-5 mb-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200" onSubmit={handleSubmit}>
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name / Label
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formState.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          placeholder="Home, Office, etc."
          required
        />
      </div>

      {/* Street */}
      <div>
        <label
          htmlFor="street"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Street Address
        </label>
        <input
          id="street"
          name="street"
          type="text"
          value={formState.street}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          placeholder="221B Baker Street"
          required
        />
      </div>

      {/* City */}
      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          City
        </label>
        <input
          id="city"
          name="city"
          type="text"
          value={formState.city}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          placeholder="London"
          required
        />
      </div>

      {/* State*/}
      <div>
        <label
          htmlFor="state"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          State
        </label>
        <input
          id="state"
          name="state"
          type="text"
          value={formState.state}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          placeholder="London"
          required
        />
      </div>

      {/* Postal Code */}
      <div>
        <label
          htmlFor="postalCode"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Postal Code
        </label>
        <input
          id="postalCode"
          name="postalCode"
          type="text"
          value={formState.postalCode}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          placeholder="NW1 6XE"
          required
        />
      </div>

      {/* Country */}
      <div>
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Country
        </label>
        <input
          id="country"
          name="country"
          type="text"
          value={formState.country}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          placeholder="United Kingdom"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formState.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
          placeholder="+44 7911 123456"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        type="submit"
      >
        Add Address
      </button>
    </form>
  );
};

export default AddAddressForm;
