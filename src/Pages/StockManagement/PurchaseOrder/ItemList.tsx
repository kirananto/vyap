import React from 'react'
import { useNavigate } from 'react-router-dom'
import { hapticFeedback } from 'src/utils/vibrate'

interface IProps {
    id: string
}

export default function ItemList({
    id
}: IProps) {

    const navigate = useNavigate()

    const a = [1, 1, 1, 1, 1, 1]

    return (
        <div className="p-4">
            <div className="flex justify-end">
                <div
                    className="flex w-max border border-gray-300 rounded items-center pr-2 cursor-pointer dark:border-gray-400"
                    onClick={() => {
                        hapticFeedback()
                        navigate(`/purchase-order/${id}`)
                    }}
                >
                    <div className="bg-white rounded-full w-min p-2 text-gray-600 dark:text-gray-400 dark:bg-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </div>
                    <div className="text-gray-600 text-sm dark:text-gray-400">
                        Edit purchase order
                    </div>
                </div>
            </div>
            <div className="p-4 border border-gray-300 rounded mt-2 dark:border-gray-500">
                <div>
                    <div className="text-gray-600 text-sm dark:text-gray-200">
                        GST Number
                    </div>
                    <div className="text-gray-400 text-sm dark:text-gray-400">
                        12312312312312
                    </div>
                </div>
                <div className="text-gray-600 text-sm pt-2 my-2 border-t-2 border-dashed border-gray-300 dark:border-gray-500 dark:text-gray-300">
                    Items list
                </div>
                {a.map((item, index) => (
                    <div key={`${index}`}>
                        <div className={`flex justify-between pb-2 ${index === a.length - 1 ? 'border-b-2 border-dashed border-grey-300 mb-2 pb-2 dark:border-gray-500' : ''}`}>
                            {/* TODO: Remove this console.log */}
                            {console.log('item', item)}
                            <div className="flex gap-2">
                                <div
                                    className="bg-gradient-to-br from-blue-500 to-indigo-900 m-1 rounded-full h-4 w-4"
                                />
                                <div className="flex flex-col">
                                    <div className="flex gap-4">
                                        <div className="text-gray-600 dark:text-gray-300">
                                            Dairy Milk Silk
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-300">
                                            x  15
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-xs font-bold">
                                        <div className="text-gray-400">
                                            MRP: 40
                                        </div>
                                        <div className="text-gray-400">
                                            Rate: 35
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex text-gray-400 dark:text-gray-300 text-xs font-extrabold">
                                ₹1500
                            </div>
                        </div>
                    </div>
                ))}
                <div className="flex justify-end">
                    <div>
                        <div className="flex text-gray-400 text-xs font-extrabold justify-center">
                            Total
                        </div>
                        <div className="text-gray-600 text-lg font-extrabold justify-center dark:text-gray-300">
                            ₹ 5000
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}