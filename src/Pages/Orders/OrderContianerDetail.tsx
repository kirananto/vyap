import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchOrderItems } from 'src/API/order.axios'
import Spinner from 'src/Components/Style/Spinner'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/util'
import { selectCredentials } from '../Login/credentialsSlice'

export default function OrderContainerDetail({ order }: { order: any }) {
    const { token } = useSelector(selectCredentials)
    const [orderItems, setOrderItems] = useState<any[]>([])
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetchOrderItems(token!, order.id, 100, 0).then((result: any) => {
            setOrderItems(result?.data?.data)
            setLoading(false)
        })
    }, [token, order.id])

    if (loading) {
        return <div className="p-4 m-4 border border-gray-300 dark:border-gray-500 rounded">
            <div className="p-12 mt-12 text-center dark:text-gray-100 grid">
                <Spinner />
                <div className="mt-4">Loading...</div>
            </div>
        </div>
    }
    return (
        <div className="p-4 m-4 border border-gray-300 dark:border-gray-500 rounded">
            {orderItems.map((item, index) => (
                <div className={`flex justify-between pb-4 mb-2 ${index === orderItems.length - 1 ? 'border-b-2 border-dashed border-gray-300 dark:border-gray-600 mb-2 pb-2' : ''}`} key={`${index}`}>
                    <div className="flex gap-2">
                        <div
                            className="bg-gradient-to-br from-blue-500 to-indigo-900 m-1 rounded-full h-8 w-8"
                            style={item?.product?.thumbnailImage ? { backgroundImage: `url(${getImageURL(item?.product?.thumbnailImage, IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE)}`, backgroundSize: 'contain' } : {}}
                        />
                        <div className="flex flex-col">
                            <div className="flex gap-4">
                                <div className="text-gray-600 dark:text-gray-200">
                                    {item?.product?.centralCatalogue?.name}{item?.product?.aliasName ? `(${item?.product?.aliasName})` : ''}
                                </div>
                                <div className="text-gray-600 dark:text-gray-300">
                                    x  {item?.quantity}
                                </div>
                            </div>
                            <div className="flex gap-4 text-xs font-bold">
                                <div className="text-gray-400 dark:text-gray-400">
                                    Purchase Price: ₹{item?.purchasePrice}
                                </div>
                                <div className="text-gray-400 dark:text-gray-400">
                                    MRP: ₹{item?.product?.mrpPrice}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex text-gray-400 text-xs font-extrabold dark:text-gray-300 self-center">
                        ₹{item?.quantity * parseFloat(`${item?.purchasePrice}`)}
                    </div>
                </div>
            ))}
            {orderItems?.length === 0 && <div className="mt-2 text-center text-gray-600 dark:text-gray-200 mb-4"> Order items are not available </div>}
            <div className="flex justify-end">
                <div>
                    <div className="text-gray-600 dark:text-gray-200 text-lg font-extrabold text-right">
                        <span className="text-sm font-normal">Total:</span> ₹{(parseFloat(order?.totalAmount)).toFixed(2)}
                    </div>
                    <div className="text-gray-600 dark:text-gray-200 text-lg font-extrabold text-right">
                        <span className="text-sm font-normal">Discount:</span> ₹{parseFloat(order?.flatDiscount).toFixed(2)}
                    </div>
                    <div className="text-gray-600 dark:text-gray-200 text-lg font-extrabold text-right">
                        <span className="text-sm font-normal">Final Amount:</span> ₹{(parseFloat(order?.totalAmount) - parseFloat(order?.flatDiscount)).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    )
}