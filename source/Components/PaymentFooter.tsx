import React from 'react'

export default function PaymentFooter() {
    return (
        <div className="fixed bottom-0 flex items-center justify-center w-full h-16 gap-4 bg-white shadow">
            <button className="w-2/5 text-white rounded-full h-9 bg-gradient-to-r from-blue-500 to-indigo-700 ">Add Payment</button>
            <button className="w-2/5 text-white rounded-full h-9 bg-gradient-to-r from-blue-500 to-indigo-700 ">Place Order</button>
        </div>
    )
}
