import React from 'react';
import { Header } from '../../../Components/Header';
import OrderDetail from './OrderDetails'
import ItemList from './ItemList'

export default function OrderDetails() {
    return (
        <div className="h-screen bg-gray-100">
            {/* Header */}
            <div className="w-full pb-3 bg-white shadow ">
                {/* Todo :: Share icon have to be added in the place of contact icon */}
                <Header heading="Order details" subHeading="XYZ Supplier" shareDetails="bb" />
            </div>
            {/* Body */}
            <div className="flex flex-col items-center gap-5 py-10">
                <h1 className="text-6xl font-black text-center text-gray-500">
                    ₹{"1660"}
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
                    <p className="text-xs text-gray-500">Order completed</p>
                    <p className="text-xs text-gray-500">● 5th Mar</p>
                    <p className="text-xs text-gray-500">● 5 Items</p>
                    {/* ------------------ */}
                </div>
                {/* Order Detail card */}
                <OrderDetail />
                {/* Item List */}
                <ItemList />
            </div>
        </div>
    )
}
