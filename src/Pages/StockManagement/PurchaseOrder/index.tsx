import { SimpleHeader } from '../../../Components/Header'
import React, { useState } from 'react'
import ItemList from './ItemList'
import { useHistory } from 'react-router-dom'

export default function PurchaseOrder() {

    const payments = [1,1,1,1,1,1,1,1,1]

    const [isExpanded, setIsExpanded] = useState<any>(undefined)

    const history = useHistory()

    return (
        <div className="mobile-main h-screen">
            {/* header */}
            <div className="w-full mb-2 bg-white shadow">
                <SimpleHeader heading=" Purchase Orders " />
            </div>
            {/* body */}
            <div className="p-2">
                <div className="overflow-y-auto bg-white rounded p-4" style={{ height: 'calc(100vh - 10rem)' }}>
                    {payments.map((item, index) => (
                        <div className={'border-b border-gray-300'} key={`${index}`}>
                            <div className={`flex w-full justify-between mt-2 pb-2`}>
                                {/* TODO: Remove this console.log */}
                                {console.log('item', item)}
                                <div className="flex">
                                    <div className="flex flex-col">
                                        <div className="text-gray-400">#234234 • 25th March 2021</div>
                                        <div className="text-gray-600 my-1">K & K Automobiles, Kochi</div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex flex-col">
                                        <div className="text-gray-600 text-lg font-extrabold">₹ 5000</div>
                                        <div className="text-gray-400 text-xs font-extrabold mx-auto">(5 items)</div>
                                    </div>
                                    {isExpanded === index ? (<div className="flex text-gray-600" onClick={() => setIsExpanded(undefined)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                    </div>

                                    ) : (<div className="flex text-gray-600" onClick={() => setIsExpanded(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>)}
                                </div>
                            </div>
                            {isExpanded === index && <ItemList id={`${index}`} />}
                        </div>))}
                </div>
            </div>

            {/* Footer */}

            <div className="fixed bottom-0 flex items-center justify-center w-full h-16 bg-white shadow">
                <button 
                    className="w-2/4 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
                    onClick={() => history.push('/purchase-order/new')}
                >Add Purchase Order</button>
            </div>
        </div>
    )
}