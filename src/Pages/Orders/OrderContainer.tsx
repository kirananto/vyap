import React, { useState } from 'react'
import OrderContainerDetail from './OrderContianerDetail'

interface IProps {
    orders: any[]
}

export default function OrderContainer({
    orders
}: IProps) {

    const [isExpanded, setIsExpanded] = useState<any>(undefined)

    return (
        <div className="bg-gray-100 p-4">
            <div className="overflow-y-auto bg-white rounded p-4" style={{ height: 'calc(100vh - 15rem)' }}>
                {orders.map((item, index) => (
                    <div className={`${index === orders.length - 1 ? '' : 'border-b border-gray-300'}`} key={`${index}`}>
                        <div className={`flex w-full justify-between mt-2 pb-2`}>
                            {/* TODO: Remove this console.log */}
                            {console.log('item', item)}
                            <div className="flex gap-2">
                                <div className="flex">
                                    <div className="flex pt-1">
                                        <input className="cursor-pointer rounded border-gray-300 text-blue-800" type="checkbox" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-gray-400">#234234 • 25th March 2021</div>
                                    <div className="text-gray-600 my-1">K & K Automobiles, Kochi</div>
                                    <div className="flex w-max bg-green-200 font-bold text-sm text-green-800 px-2 rounded items-center">Order completed</div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex flex-col">
                                    <div className="text-gray-600 text-lg font-extrabold">₹ {(parseFloat(item?.totalAmount) - parseFloat(item?.flatDiscount)).toFixed(2)}</div>
                                    <div className="text-gray-400 text-xs font-extrabold mx-auto">({item?.numberOfItems} items)</div>
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
                        {isExpanded === index && <OrderContainerDetail />}
                    </div>))}
            </div>
        </div>
    )
}