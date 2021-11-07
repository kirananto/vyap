import { fetchPaymentById } from "../../API/payment.axios";
import type { paymentObject } from "../../Components/PaymentCard";
import { selectCredentials } from "../Login/credentialsSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Header } from "../../Components/Header";
import { PaymentInfo, PaymentInfoIcon } from "../../Components/PaymentInfo";
import { format } from "date-fns";

export default function PaymentDetails() {
  const textSize = { fontSize: "12px" };
  const [payment, setPayment] = useState<paymentObject | undefined>()
  const { token } = useSelector(selectCredentials)
  const { id } = useParams()

  useEffect(() => {
    fetchPaymentById(token!, id!).then(result => {
      setPayment(result.data)
    })
  }, [])

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="w-full py-2 bg-white shadow dark:bg-gray-800">
          {/* Todo :: Share icon have to be added in the place of contact icon */}
        <Header heading="Payment details" subHeading="XYZ Supplier" phoneNumber="" />
      </div>
      {/* Body */}
      <div className="flex flex-col items-center gap-5 py-10">
        <h1 className="text-6xl font-black text-center text-gray-600 dark:text-gray-300">
          ₹{payment?.amount}
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
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">● {payment?.updatedAt ? format(
                new Date(payment?.updatedAt),
                'do MMM'
              ) : null}</p>
          {/* ------------------ */}
        </div>

        {/* Payment detail Card */}
        {/* ------------------- */}
        <div className="w-11/12 p-8 bg-white rounded-md shadow  border border-yellow-900 border-opacity-50 dark:bg-gray-800">
          <h1 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Payment details
          </h1>

          <div className="flex flex-col gap-3">
            <PaymentInfo heading="Payment id" info={`#${id}`} />
            <PaymentInfo
              heading="Date of transaction"
              info={payment?.updatedAt ? format(new Date(payment?.updatedAt), `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`) : 'Missing information'}
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
            <PaymentInfoIcon heading="Status" info="Payment Completed" />
          </div>
        </div>
        {/* delete payment button */}
        {/* <button className="w-10/12 h-12 mt-10 text-lg font-semibold text-red-400 bg-red-200 rounded-full">
          Delete Payment
        </button> */}
        {/* Bottom info delete */}
        <p style={textSize} className="w-9/12 px-4 text-center text-gray-400">
          You will not be able to delete the payment, instead create a payment with negative value.
        </p>
      </div>
    </div>
  );
}
