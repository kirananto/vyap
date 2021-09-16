import React, { useState } from "react";
import { PaymentInfo, PaymentInfoTick } from "../../../Components/PaymentInfo"

function OrderDetailed() {
    return (
        <div className="flex flex-col gap-3">
            <PaymentInfo heading="Order id" info='#23434534534' />
            <PaymentInfo
                heading="Order placed on"
                info='5:30 AM - 5th March 2021'
            />
            <PaymentInfo
                heading="Last updated on"
                info='5:30 AM - 5th March 2021'
            />
            <PaymentInfo
                heading="Shop name"
                info="OMart Super market (+701232134)"
            />
            <PaymentInfo
                heading="Supplier name"
                info="Cadbury Sellers (+91823423432)"
                more={['Order taken by Jazeem', 'Delivered by - Kiran Anto']}
            />
            <PaymentInfo
                heading="Note"
                info="Urgent deliver, Also personalised message for the supplier"
            />
            <PaymentInfoTick
                heading="Status"
                info="Order Completed"
            />
        </div>
    )
}

export default function OrderDetail() {
    const [isExpanded, setIsExpanded] = useState(false)
    return (
        <div className="w-11/12 p-4 bg-white rounded-md shadow">
            <div className="flex mb-4 items-center justify-between">
                <div className="flex flex-col text-2xl font-semibold text-gray-800">
                    Order details
            </div>
                <div>
                    {isExpanded ? (<div className="flex text-gray-600" onClick={() => setIsExpanded(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </div>

                    ) : (<div className="flex text-gray-600" onClick={() => setIsExpanded(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>)}
                </div>
            </div>
            {isExpanded && <OrderDetailed />}
        </div>
    )
}
