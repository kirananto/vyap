import { SimpleHeader } from '../../../Components/Header'
import React, { useState } from 'react'
import ItemList from './ItemList'
import { useNavigate } from 'react-router-dom'
import { hapticFeedback } from 'src/utils/vibrate'

export default function PurchaseOrder() {

    const payments = [1, 1, 1, 1, 1, 1, 1, 1, 1]

    const [isExpanded, setIsExpanded] = useState<number | undefined>(undefined)

    const navigate = useNavigate()

    return (
        <div className="h-screen dark:bg-slate-900">
            {/* header */}
            <div className="w-full mb-2 bg-white drop-shadow-md dark:bg-slate-800">
                <SimpleHeader heading=" Purchase Orders " />
            </div>
            {/* body */}
            <div className="p-2 pt-14">
                <div className="overflow-y-auto bg-white rounded p-4 dark:bg-slate-800" style={{ height: 'calc(100vh - 10rem)' }}>
                    {payments.map((item, index) => (
                        <div className={'border-b border-slate-300 dark:border-slate-600'} key={`${index}`}>
                            <div className={`flex w-full justify-between mt-2 pb-2`}>
                                {/* TODO: Remove this console.log */}
                                {console.log('item', item)}
                                <div className="flex">
                                    <div className="flex flex-col">
                                        <div className="text-slate-400 dark:text-slate-200">#234234 • 25th March 2021</div>
                                        <div className="text-slate-600 my-1 dark:text-slate-300">K & K Automobiles, Kochi</div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex flex-col">
                                        <div className="text-slate-600 text-lg font-extrabold dark:text-slate-300">₹ 5000</div>
                                        <div className="text-slate-400 text-xs font-extrabold mx-auto dark:text-slate-200">(5 items)</div>
                                    </div>
                                    {isExpanded === index ? (<div className="flex text-slate-600" onClick={() => {
                                        hapticFeedback()
                                        setIsExpanded(undefined)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                    </div>

                                    ) : (<div className="flex text-slate-600"
                                        onClick={() => {
                                            hapticFeedback()
                                            setIsExpanded(index)
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

            <div className="fixed bottom-0 flex items-center justify-center w-full h-20 bg-white drop-shadow-md dark:bg-slate-700">
                <button
                    className="w-2/4 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
                    onClick={() => {
                        hapticFeedback()
                        navigate('/purchase-order/new')
                    }}
                >Add Purchase Order</button>
            </div>
        </div>
    )
}