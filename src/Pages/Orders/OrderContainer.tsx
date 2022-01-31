import React, { useState } from 'react'
import OrderContainerDetail from './OrderContianerDetail'
import format from 'date-fns/format'
import Spinner from 'src/Components/Style/Spinner'

interface IProps {
  orders: any[];
  loading: boolean;
}

export default function OrderContainer({ orders, loading }: IProps) {
    const [isExpanded, setIsExpanded] = useState<any>(undefined)

    if (loading) {
        return (
            <div className="p-12 mt-12 text-center dark:text-gray-100 grid">
                <Spinner />
                <div className="mt-4">Loading...</div>
            </div>
        )
    }

    const onMinimize = () => {
        setIsExpanded(undefined)
    }
    return (
        <>
            {orders.map((item, index) => (
                <div
                    className={`${
                        index === orders.length - 1 ? '' : 'border-b border-gray-300 dark:border-gray-700'
                    }`}
                    key={`${index}`}
                >
                    <div className="flex flex-row mt-2 mb-3">
                        <div>
                            <div className="item w-4  flex-grow-0 mr-2">
                                <input
                                    className="cursor-pointer rounded border-gray-300 text-blue-800"
                                    type="checkbox"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="grid grid-rows-3 content-start">
                                <div className="grid grid-flow-col  gap-1 row-span-3">
                                    
                                    <div className="text-gray-500 dark:text-gray-300">
                                        {item.createdAt
                                            ? format(new Date(item.createdAt), 'do MMM yyyy')
                                            : ''}
                                    </div>

                                    {isExpanded === index ? (
                                        <div
                                            className="col-start-12 text-gray-600 dark:text-gray-300"
                                            onClick={() => setIsExpanded(undefined)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 cursor-pointer"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 15l7-7 7 7"
                                                />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div
                                            className=" text-gray-600 dark:text-gray-300 col-start-12"
                                            onClick={() => setIsExpanded(index)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 cursor-pointer"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="text-gray-600 dark:text-gray-200 my-1">
                                    {item.supplier?.name} {'->'} {item?.buyer?.name}
                                </div>

                                <div className="grid grid-flow-col">
                                    <div className="col-start-1 w-max  items-center mt-3">
                                        <span className="bg-green-200 font-bold text-sm text-green-800 px-2 py-1 rounded">
                                            {item?.orderStatus?.[0]?.note}
                                        </span>
                                    </div>

                                    <div className="text-center col-end-12 self-center text-gray-600 dark:text-gray-200 text-lg font-extrabold">
                                        <div className="text-gray-600 text-lg font-extrabold dark:text-gray-200">
                      ₹{' '}
                                            {(
                                                parseFloat(item?.totalAmount) -
                        parseFloat(item?.flatDiscount)
                                            ).toFixed(2)}
                                        </div>
                                        <div className="text-gray-400 text-xs font-extrabold mx-auto dark:text-gray-300">
                      ({item?.numberOfItems} {item?.numberOfItems > 1 ? 'items' : 'item'})
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isExpanded === index && (
                        <OrderContainerDetail order={item} minimize={onMinimize} />
                    )}
                </div>
            ))}
        </>
    )
}