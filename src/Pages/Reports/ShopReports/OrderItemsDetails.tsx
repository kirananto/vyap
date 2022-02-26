import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchOrderItems } from 'src/API/order.axios'
import Spinner from 'src/Components/Style/Spinner'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'
import { selectCredentials } from '../../Login/credentialsSlice'
import type { IOrderItem, orderInterface } from 'src/Pages/Customers/ChatView/Cards/OrderCard'

export default function OrderItemsDetails({
    order,
}: {
  order: orderInterface;
}) {
    const { token } = useSelector(selectCredentials)
    const [orderItems, setOrderItems] = useState<IOrderItem[]>([])
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        fetchOrderItems({ token, orderId: order.id, limit: 100, offset: 0 }).then((result) => {
            setOrderItems(result?.data?.data)
            setLoading(false)
        })
    }, [token, order.id])

    if (loading) {
        return (
            <div className="p-4 m-4 border border-slate-300 dark:border-slate-500 rounded">
                <div className="p-12 mt-12 text-center dark:text-slate-100 grid">
                    <Spinner />
                </div>
            </div>
        )
    }
    return (
        <div>
            <div
                className="p-4 m-4 mt-2 border border-slate-300 dark:border-slate-500 rounded"
                id="print"
            >
                <h2 className="dark:text-slate-300 font-bold"> Order items </h2>

                <div className={`flex w-full justify-between mt-1 pb-2 `}>
                </div>

                {orderItems.map((item, index) => (
                    <div
                        className={`flex justify-between pb-2 ${
                            index === orderItems.length - 1
                                ? 'border-b-2 border-dashed border-slate-300 dark:border-slate-600 mb-2 pb-4'
                                : ''
                        }`}
                        key={`${index}`}
                    >
                        <div className="flex gap-2">
                            <div className="flex-none mt-2 text-slate-400 text-xs dark:text-slate-400">{item?.quantity} X </div>
                            <div
                                className="flex-none bg-gradient-to-br from-blue-500 to-indigo-900 m-1 rounded-full h-6 w-6"
                                style={
                                    item?.product?.thumbnailImage
                                        ? {
                                            backgroundImage: `url(${getImageURL(
                                                item?.product?.thumbnailImage,
                                                IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                                            )}`,
                                            backgroundSize: 'contain',
                                        }
                                        : {}
                                }
                            />
                            <div className="text-slate-600 pr-4 self-center text-xs font-semibold md:text-md dark:text-slate-200">
                                {item?.product?.centralCatalogue?.name}
                                {item?.product?.aliasName
                                    ? `(${item?.product?.aliasName})`
                                    : ''}
                            </div>

                        </div>
                        <div className="flex text-slate-400 text-xs font-extrabold dark:text-slate-300 self-center">
                            {/* ₹{item?.quantity * parseFloat(`${item?.purchasePrice}`)} */}
                            {parseFloat(item?.purchasePrice).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                        </div>
                    </div>
                ))}
                {orderItems?.length === 0 && (
                    <div className="mt-2 text-center text-slate-600 dark:text-slate-200 mb-4">
                        {' '}
            Order items are not available{' '}
                    </div>
                )}
                <div className="flex justify-end">
                    <div>
                        <div className="text-slate-600 dark:text-slate-200 text-lg font-extrabold text-right">
                            <span className="text-sm font-normal">Total:</span> 
                            {parseFloat(order?.totalAmount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                        </div>
                        <div className="text-slate-600 dark:text-slate-200 text-lg font-extrabold text-right">
                            <span className="text-sm font-normal">Discount:</span>
                            {parseFloat(order?.flatDiscount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                        </div>
                        <div className="text-slate-600 dark:text-slate-200 text-lg font-extrabold text-right">
                            <span className="text-sm font-normal">Final Amount:</span> 
                            {(
                                parseFloat(order?.totalAmount) - parseFloat(order?.flatDiscount)
                            ).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}