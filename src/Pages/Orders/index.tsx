import { Header } from '../../Components/Header'
import React, { useState, useEffect } from 'react'
import AppliedFilters from './AppliedFilters'
import OrderContainer from './OrderContainer'
import { fetchOrdersAPI } from 'src/API/order.axios'
import { useSelector } from 'react-redux'
import { selectCredentials } from '../Login/credentialsSlice'

export default function Orders() {
    const [orders, setOrders] = useState<any[]>([])
    const { token } = useSelector(selectCredentials)

    useEffect(() => {
        fetchOrdersAPI(token!).then(result => {
            setOrders(result?.data?.data ?? [])
        })
    }, [])

    return (
        <div className="">
            {/* header */}
            <div className="w-full pb-3 bg-white shadow ">
                <Header heading="All Orders" />
                <AppliedFilters />
            </div>
            {/* body */}
            <OrderContainer orders={orders} />

            {/* Footer */}

            <div className="fixed bottom-0 w-full h-16 bg-white shadow px-8 grid">
                <div className="flex items-center justify-center gap-2 justify-self-center mt-2 w-full max-w-lg">
                    <button className="flex justify-center gap-1 items-center w-2/4 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print All
                    </button>
                    <button className="flex justify-center gap-1 items-center w-2/4 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export All
                    </button>
                </div>
            </div>
        </div>
    )
}