import React from "react";
import { Header } from "../../Components/Header";
import { PaymentInfo, PaymentInfoTick } from "../../Components/PaymentInfo";

export default function PaymentDetails() {
  const textSize = { fontSize: "12px" };
  return (
    <div className="h-screen bg-gray-100">
      {/* Header */}
      <div className="w-full pb-3 bg-white shadow ">
          {/* Todo :: Share icon have to be added in the place of contact icon */}
        <Header heading="Payment details" subHeading="XYZ Supplier" phoneNumber="" />
      </div>
      {/* Body */}
      <div className="flex flex-col items-center gap-5 py-10">
        <h1 className="text-6xl font-black text-center text-gray-500">
          ₹ 5000
        </h1>
        {/* ---------------- */}
        <div className="flex items-center justify-center gap-3">
          {/* Tick icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-green-300 "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <p className="text-xs text-gray-500">Completed</p>
          <p className="text-xs text-gray-500">● 5th Mar</p>
          {/* ------------------ */}
        </div>

        {/* Payment detail Card */}
        {/* ------------------- */}
        <div className="w-11/12 p-4 bg-white rounded-md shadow">
          <h1 className="mb-4 text-2xl font-semibold text-gray-800">
            Payment details
          </h1>

          <div className="flex flex-col gap-3">
            <PaymentInfo heading="Payment id" info="#24787453454524" />
            <PaymentInfo
              heading="Date of transaction"
              info="5:30 AM -5th March 2021"
            />
            <PaymentInfo heading="Payment method" info="Cash" />
            <PaymentInfo
              heading="Shop Name"
              info="OMart Super Market(+701232134)"
            />
            <PaymentInfo
              heading="Supplier name"
              info="Cadbury Sellers(+91824568535)"
            />
            <PaymentInfoTick heading="Status" info="Payment Completed" />
          </div>
        </div>
        {/* delete payment button */}
        <button className="w-10/12 h-12 mt-10 text-lg font-semibold text-red-400 bg-red-200 rounded-full">
          Delete Payment
        </button>
        {/* Bottom info delete */}
        <p style={textSize} className="w-9/12 px-4 text-center text-gray-400">
          Once deleted, you'll not be able to recover. Please create new payment
          if you have to
        </p>
      </div>
    </div>
  );
}
