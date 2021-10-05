import React, { useEffect, useState } from "react";
import { NavLink  } from "react-router-dom";
import { format } from 'date-fns'
import { useSelector } from "react-redux";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";
import { fetchOrderAPI } from "src/API/order.axios";


export default function OrderCard({ className, thread }: { className: string, thread: any }) {
  const [order, setOrder] = useState<any | undefined>()
  const { token } = useSelector(selectCredentials)

  useEffect(() => {
    fetchOrderAPI(token!, thread.meta).then(result => {
      setOrder(result.data)
    })
  }, [])

  return (
    <div className={`flex ${className} w-full`}>
      <NavLink to={`/order/${thread.meta}`} className="flex flex-col w-10/12 gap-1 p-4 bg-white rounded-lg hover:bg-gray-50 shadow border border-purple-900 border-opacity-50 dark:bg-gray-800 dark:hover:bg-gray-600">
        <div className="p-1 px-4 text-xs bg-purple-200 text-purple-900 rounded-full max-w-max">
          Order #{thread.meta?.split('-')[0]}
        </div>
        <div className="text-4xl mt-2 text-gray-700 font-bold dark:text-gray-200">₹ {(parseFloat(order?.totalAmount) - parseFloat(order?.flatDiscount)).toFixed(2)}</div>

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
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-xs text-gray-500 dark:text-gray-300">Completed</p>
          </div>
          {/* col-2 */}
          <div className="flex justify-left w-7/12 gap-2">
            <p className="text-xs text-gray-500 dark:text-gray-300">● {
              format(
                new Date(thread.updatedAt),
                'do MMM'
              )} ●</p>
            <p className="text-xs text-gray-500 dark:text-gray-300">{order?.numberOfItems} items</p>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="justify-end w-5 h-5 text-gray-500 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </NavLink>
    </div>
  );
}
