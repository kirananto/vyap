import React, { useState, useEffect } from 'react';
import { Header } from '../../../Components/Header';
import OrderDetail from './OrderDetails'
import ItemList from './ItemList'
import { useSelector } from 'react-redux';
import { selectCredentials } from 'src/Pages/Login/credentialsSlice';
import { useParams } from 'react-router';
import { fetchOrderAPI } from 'src/API/order.axios';
import { format } from "date-fns";


export default function OrderDetails() {

    const [order, setOrder] = useState<any | undefined>()

    const { token } = useSelector(selectCredentials)
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        fetchOrderAPI(token!, id).then(result => {
            setOrder(result.data)
        })
    }, [])

    return (
        <div className="h-screen bg-gray-100 overflow-auto dark:bg-gray-900">
            {/* Header */}
            <div className="w-full py-2 bg-white shadow dark:bg-gray-800">
                {/* Todo :: Share icon have to be added in the place of contact icon */}
                <Header heading="Order details" subHeading="XYZ Supplier" shareDetails="bb" />
            </div>
            {/* Body */}
            <div className="flex flex-col items-center gap-5 py-10">
                <h1 className="text-6xl font-black text-center text-gray-600 dark:text-gray-300">
                    ₹{(parseFloat(order?.totalAmount) - parseFloat(order?.flatDiscount)).toFixed(2)}
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
                    <p className="text-xs text-gray-500 dark:text-gray-400">Order completed</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">● {order?.updatedAt ? format(
                new Date(order?.updatedAt),
                'do MMM'
              ) : null}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">● {order?.numberOfItems} Items</p>
                    {/* ------------------ */}
                </div>
                {/* Order Detail card */}
                <OrderDetail order={order} />
                {/* Item List */}
                <ItemList order={order}/>
            </div>
        </div>
    )
}
