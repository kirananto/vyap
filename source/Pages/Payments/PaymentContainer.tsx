import React from 'react'

interface IProps {
    payments: any[]
}

export default function PaymentContainer({
    payments
}: IProps) {

    return (
        <div className="bg-gray-100 p-4">
            <div className="overflow-y-auto bg-white rounded p-4" style={{ height: 'calc(100vh - 15rem)' }}>
                {payments.map((item, index) => (
                    <div className={`${index === payments.length - 1 ? '' : 'border-b border-gray-300'}`} key={`${index}`}>
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
                                    <div className="flex w-max bg-green-200 font-bold text-sm text-green-800 px-2 rounded items-center">CASH</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-gray-600 text-lg font-extrabold">₹ 5000</div>
                            </div>
                        </div>
                    </div>))}
            </div>
        </div>
    )
}