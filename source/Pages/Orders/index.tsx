import { Header } from '../../Components/Header'
import React from 'react'
import AppliedFilters from './AppliedFilters'
import OrderContainer from './OrderContainer'

export default function Orders() {
    const orders = [1,1,1,1,1,1,1,1,1,1,1,1]
    return (
        <div className="mobile-main">
            {/* header */}
            <div className="w-full pb-3 bg-white shadow ">
                <Header heading="All Orders" />
                <AppliedFilters />
            </div>
            {/* body */}
            <OrderContainer orders={orders} />
        </div>
    )
}