"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import Accordion from "../Common/Accordion";
import toast from "react-hot-toast";
import useCheckoutStore from "@/stores/useCheckoutStore";
import { useRouter } from "next/navigation";

let success: boolean = false;

const CardPaymentForm = () => {
  const router = useRouter();
  const { placeOrder } = useCheckoutStore();
  const [formData, setFormData] = React.useState({
    cardNumber: "",
    nameOnCard: "",
    expirationDate: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Optional simple formatters:
    let newValue = value;
    if (name === "cardNumber") {
      newValue = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    }
    if (name === "expirationDate") {
      newValue = value
        .replace(/\D/g, "")
        .slice(0, 4)
        .replace(/^(\d{2})(\d{0,2})/, "$1/$2");
    }
    if (name === "cvv") {
      newValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Payment successful");
    success = await placeOrder("card");
    if (success) {
      setFormData({
        cardNumber: "",
        nameOnCard: "",
        expirationDate: "",
        cvv: "",
      });
      router.push("/orders");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleChange}
        placeholder="0000 0000 0000 0000"
        className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />

      <input
        type="text"
        name="nameOnCard"
        value={formData.nameOnCard}
        onChange={handleChange}
        placeholder="Name on Card"
        className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />

      <div className="flex gap-4">
        <input
          type="text"
          name="expirationDate"
          value={formData.expirationDate}
          onChange={handleChange}
          placeholder="MM/YY"
          className="p-4 border border-gray-200 rounded-xl w-1/2 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <input
          type="text"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          placeholder="CVV"
          className="p-4 border border-gray-200 rounded-xl w-1/2 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
      >
        Pay Now
      </button>
    </form>
  );
};

const UPIPaymentForm = () => {
  const [upiId, setUpiId] = React.useState<string>("");
  const { placeOrder } = useCheckoutStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (/@/.test(upiId)) {
      toast.success("Payment successful");
      success = await placeOrder("upi");
      if (success) {
        setUpiId("");
        router.push("/orders");
      }
    } else {
      toast.error("Invalid UPI ID");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="cardNumber"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        placeholder="Enter UPI ID"
        className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <button
        type="submit"
        className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
      >
        Pay Now
      </button>
    </form>
  );
};

const PaymentDetails = () => {
  const router = useRouter();
  const { placeOrder, totalCost, label } = useCheckoutStore();
  const handlePlaceOrder=async()=>{
    success = await placeOrder("cod");
    if (success) {
      router.push("/orders");
    }
  }
  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      <h3 className="text-2xl font-semibold mb-2 text-gray-900 text-center">
        <Icon icon="mdi:credit-card" className="inline-flex" /> Payment Method
      </h3>
      <p className="text-gray-600 text-center mb-5">
        Select your desired payment method.
      </p>
      <p className="text-green-600 text-center mb-2 text-lg font-semibold">
        Total Cost : ₹ {totalCost}
      </p>
      <p className="text-center font-semibold text-gray-700 mb-5">{label}</p>

      <div className="flex flex-col gap-4">
        <Accordion title="Credit Card / Debit Card" icon={"entypo:credit-card"}>
          <CardPaymentForm />
        </Accordion>
        <Accordion title="UPI" icon={"material-symbols:upi-pay-outline"}>
          <UPIPaymentForm />
        </Accordion>
        <Accordion
          title="Cash on Delivery"
          icon={"streamline-cyber:cash-hand-4"}
        >
          <button
            className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
            onClick={handlePlaceOrder}
          >
            Pay the Delivery Agent Directly
          </button>
        </Accordion>
      </div>
    </div>
  );
};

export default PaymentDetails;
