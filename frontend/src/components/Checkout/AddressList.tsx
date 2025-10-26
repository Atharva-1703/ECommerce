

import React from "react";
import ProfileAddresses from "../Profile/ProfileAddresses";

const AddressList = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold mb-2 text-gray-900 text-center">
        🏠 Select Address
      </h3>
      <p className="text-gray-600 text-center mb-5">
        Choose one of your saved addresses or add a new one.
      </p>
      <p className="text-gray-600 text-center ">By Default Your First Address will be selected</p>
      <ProfileAddresses mode="checkout"/>
    </div>
  );
};

export default AddressList;
