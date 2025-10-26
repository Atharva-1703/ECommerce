"use client";
import AddressList from "@/components/Checkout/AddressList";
import OrderDetails from "@/components/Checkout/OrderDetails";
import PaymentDetails from "@/components/Checkout/PaymentDetails";
import { useState } from "react";

const steps: string[] = ["Order Details", "Select Address", "Payment"];

const CheckoutContainer = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-6">
      {/* Step Bar */}
      <div className=" flex items-center justify-between relative">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <div
              key={index}
              className="flex flex-col  items-center flex-1 text-center relative"
              onClick={() => isCompleted && setCurrentStep(stepNumber)}
            >
              {index !== 0 && (
                <div
                  className={`absolute top-1/4 -left-[50%] w-full h-0.5 -z-10 ${
                    isActive || isCompleted ? "bg-green-500" : "bg-gray-300"
                  } `}
                ></div>
              )}

              {/* Step Circle */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full text-lg z-10  font-semibold transition-all duration-100 border  ${
                  isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : isActive
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-white border-gray-300 text-gray-600"
                }`}
              >
                {stepNumber}
              </div>

              {/* Step Label */}
              <p
                className={`mt-2 text-sm font-medium ${
                  isActive ? "text-blue-500" : "text-gray-600"
                }`}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>

      {currentStep === 1 && <OrderDetails />}
      {currentStep === 2 && <AddressList />}
      {currentStep === 3 && <PaymentDetails />}

      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Back
          </button>
        )}

        {currentStep < steps.length ? (
          <button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Next
          </button>
        ) : (
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Place Order
          </button>
        )}
      </div>
    </section>
  );
};

export default CheckoutContainer;
