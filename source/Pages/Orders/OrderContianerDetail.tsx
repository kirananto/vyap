import React from 'react'

export default function OrderContainerDetail() {

    const a = [1, 1, 1, 1, 1, 1]

    return (
        <div className="p-4 m-4 border border-gray-300 rounded">
            {a.map((item, index) => (
                <div className={`flex justify-between pb-2 ${index === a.length - 1 ? 'border-b-2 border-dashed border-grey-300 mb-2 pb-2' : ''}`} key={`${index}`}>
                    {/* TODO: Remove this console.log */}
                    {console.log('item', item)}
                    <div className="flex gap-2">
                        <div
                            className="bg-gradient-to-br from-blue-500 to-indigo-900 m-1 rounded-full h-4 w-4"
                        />
                        <div className="flex flex-col">
                            <div className="flex gap-4">
                                <div className="text-gray-600">
                                    Dairy Milk Silk
                                </div>
                                <div className="text-gray-600">
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
                    <div className="flex text-gray-400 text-xs font-extrabold">
                        ₹1500
                    </div>
                </div>
            ))}
            <div className="flex justify-end">
                <div>
                    <div className="flex text-gray-400 text-xs font-extrabold justify-center">
                        Total
                    </div>
                    <div className="text-gray-600 text-lg font-extrabold justify-center">
                        ₹ 5000
                    </div>
                </div>
            </div>
        </div>
    )
}