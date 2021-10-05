import format from 'date-fns/format'
import React from 'react'
import { paymentMethod } from 'src/API/enum'

interface IProps {
    payments: any[]
}

export default function PaymentContainer({
    payments
}: IProps) {

    return (
        <div className="bg-gray-100 p-4 dark:bg-gray-900">
            <div className="overflow-y-auto bg-white dark:bg-gray-800 rounded p-4" style={{ height: 'calc(100vh - 15rem)' }}>
                {payments.map((item, index) => (
                    <div className={`${index === payments.length - 1 ? '' : 'border-b border-gray-300'}`} key={`${index}`}>
                        <div className={`flex w-full justify-between mt-2 pb-2`}>
                            {/* TODO: Remove this console.log */}
                            <div className="flex gap-2">
                                <div className="flex">
                                    <div className="flex pt-1">
                                        <input className="cursor-pointer rounded border-gray-300 text-blue-800" type="checkbox" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-gray-400 dark:text-gray-300">#{item?.id?.split('-')[0]} •  {item.createdAt ? format(new Date(item.createdAt), 'do MMM yyyy' ) : ''}</div>
                                    <div className="text-gray-600 dark:text-gray-200 my-1">{item.receiver?.name}</div>
                                    <div className="flex w-max bg-green-200 font-bold text-sm text-green-800 px-2 rounded items-center">{paymentMethod[item.method]}</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-gray-600 dark:text-gray-200 text-lg font-extrabold">₹ {item.amount}</div>
                            </div>
                        </div>
                    </div>))}
            </div>
        </div>
    )
}