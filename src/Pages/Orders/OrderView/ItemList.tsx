import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchOrderItems } from 'src/API/order.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'

function Items({ order }: { order: any }) {
    console.log('order', order?.id)
    const { token } = useSelector(selectCredentials)
    const [orderItems, setOrderItems] = useState<any[]>([])

    useEffect(() => {
        fetchOrderItems(token!, order.id, 100, 0).then((result: any) => {
            setOrderItems(result?.data?.data)
        })
    }, [token, order.id])

    return (
        <div>
            {orderItems?.map((item: any, index: number) => (
                <div className="flex justify-between" key={`${index}`}>
                    <div className="flex pt-4 gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-cover bg-center bg-gradient-to-br from-blue-100 to-indigo-100">
                            {item?.product?.thumbnailImage && (
                                <img
                                    src={getImageURL(
                                        item?.product?.thumbnailImage,
                                        IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                                    )}
                                    alt="Avatar"
                                    className="object-cover w-full h-full"
                                />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex text-sm font-bold text-gray-800 dark:text-gray-200">
                                {item?.product?.centralCatalogue?.name}
                                {item?.product?.aliasName
                                    ? `(${item?.product?.aliasName})`
                                    : ''}
                            </div>
                            <div className="flex font-bold text-xs text-gray-400">
                                {item?.product?.centralCatalogue?.description}
                            </div>
                            <div className="flex font-bold text-xs text-gray-600 dark:text-gray-300">
                Rate: ₹{item?.purchasePrice}
                            </div>
                        </div>
                        <div className="flex h-5 w-10 rounded text-xs bg-gray-200 self-center items-center justify-center">
              X {item?.quantity}
                        </div>
                    </div>
                    <div className="flex text-lg font-bold text-gray-600 items-center dark:text-gray-200">
            ₹{item?.quantity * parseFloat(`${item?.purchasePrice}`)}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function ItemList({
    order,
    shareON,
    shareProceed,
}: {
  order: any;
  shareON?: boolean;
  shareProceed?: (arg1: string) => void;
}) {
    const [isExpanded, setIsExpanded] = useState(shareON ? true : false)

    useEffect(() => {
        if (shareON == true) {
            setIsExpanded(true)
            shareProceed && shareProceed('page')
        }
    }, [shareON])

    return (
        <div className="w-11/12 p-8 bg-white rounded-md shadow border border-purple-900 border-opacity-50 dark:bg-gray-800">
            <div
                className={`flex ${
                    isExpanded ? 'mb-4' : ''
                } items-center justify-between`}
            >
                <div className="flex flex-col text-xl font-semibold text-gray-800 dark:text-gray-200">
          Items
                </div>
                <div>
                    {isExpanded ? (
                        <div
                            className="flex text-gray-600 dark:text-gray-200"
                            onClick={() => setIsExpanded(false)}
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
                            className="flex text-gray-600 dark:text-gray-200"
                            onClick={() => setIsExpanded(true)}
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
            </div>
            {isExpanded && <Items order={order} />}
        </div>
    )
}