import React, { useEffect, useState } from "react";
import { format } from 'date-fns'
import { fetchPaymentById } from "../API/payment.axios";
import { useSelector } from "react-redux";
import { selectCredentials } from "../Pages/Login/credentialsSlice";
import { NavLink  } from "react-router-dom";

export interface paymentObject {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  amount: string;
  note: string;
  method: number;
  status: number;
  initiatedByUserId: string;
  initiatedByOrgId: string;
}

export default function PaymentCard({ className, thread }: { className: string, thread: any }) {
  const [payment, setPayment] = useState<paymentObject | undefined>()
  const { token } = useSelector(selectCredentials)

  useEffect(() => {
    fetchPaymentById(token!, thread.meta).then(result => {
      setPayment(result.data)
    })
  }, [])

  return (
    <div className={`flex ${className} w-full `}>
      <NavLink to={`/payment/${thread.meta}`} className="flex flex-col w-8/12 gap-1 p-4 bg-white rounded-lg shadow hover:bg-gray-50 border border-yellow-900 border-opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600">
        <div className="p-1 px-4 text-xs bg-yellow-100 text-yellow-900 rounded-full max-w-max">
          Payment #{thread.meta?.split('-')[0]}
        </div>
        <div className="text-4xl mt-2 text-gray-700 font-bold dark:text-gray-200">₹{payment?.amount ?? 0}</div>

        {/* bottom  */}
        <div className="flex items-center w-full">
          {/* col-1 */}
          <div className="flex items-center w-24 gap-1">
            {/* Tick icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-green-500 "
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <p className="text-xs text-gray-500 dark:text-gray-300">Completed</p>
          </div>
          {/* col-2 */}
          <div className="flex justify-left w-7/12 gap-1">
            <p className="text-xs text-gray-500 dark:text-gray-300">● {format(
                new Date(thread.updatedAt),
                'do MMM'
              )}</p>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="justify-end w-5 h-5 text-gray-500  dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </NavLink>
    </div>
  );
}
