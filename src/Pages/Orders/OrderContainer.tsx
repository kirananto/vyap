import React, { useState } from 'react'
import OrderContainerDetail from './OrderContianerDetail'
import format from 'date-fns/format'
import Spinner from 'src/Components/Style/Spinner'

interface IProps {
    orders: any[]
    loading: boolean
}

export default function OrderContainer({
    orders,
    loading
}: IProps) {

    const [isExpanded, setIsExpanded] = useState<any>(undefined)
    
    if (loading) {
        return <div className="p-12 mt-12 text-center dark:text-gray-100 grid">
            <Spinner />
            <div className="mt-4">Loading...</div>
        </div>
    }

    const onMinimize = () => {
        setIsExpanded(undefined);
    }
    return (<>
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
                            <div className="text-gray-400 dark:text-gray-300">#{item?.id?.split('-')[0]} • {item.createdAt ? format(new Date(item.createdAt), 'do MMM yyyy') : ''}</div>
                            <div className="text-gray-600 dark:text-gray-200 my-1">{item.supplier?.name} {'->'} {item?.buyer?.name}</div>
                            <div className="flex w-max bg-green-200 font-bold text-sm text-green-800 px-2 rounded items-center">{item?.orderStatus?.[0]?.note}</div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col">
                            <div className="text-gray-600 text-lg font-extrabold dark:text-gray-200">₹ {(parseFloat(item?.totalAmount) - parseFloat(item?.flatDiscount)).toFixed(2)}</div>
                            <div className="text-gray-400 text-xs font-extrabold mx-auto dark:text-gray-300">({item?.numberOfItems} items)</div>
                        </div>
                        {isExpanded === index ? (<div className="flex text-gray-600 dark:text-gray-300" onClick={() => setIsExpanded(undefined)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                        </div>

                        ) : (<div className="flex text-gray-600 dark:text-gray-300" onClick={() => setIsExpanded(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>)}
                    </div>
                </div>
                {isExpanded === index && <OrderContainerDetail order={item} minimize={onMinimize} />}
            </div>))}
    </>
    )
}