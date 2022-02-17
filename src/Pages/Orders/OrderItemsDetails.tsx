import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchOrderItems } from 'src/API/order.axios'
import Spinner from 'src/Components/Style/Spinner'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'
import { selectCredentials } from '../Login/credentialsSlice'
import { FormattedMessage } from 'react-intl'
import ReactToPrint from 'react-to-print'
import type { IOrderItem, orderInterface } from 'src/Pages/Customers/ChatView/Cards/OrderCard'

export default function OrderItemsDetails({
    order,
    minimize,
}: {
  order: orderInterface;
  minimize: () => void;
}) {
    const { token } = useSelector(selectCredentials)
    const [orderItems, setOrderItems] = useState<IOrderItem[]>([])
    const [loading, setLoading] = React.useState(true)
    const componentRef = React.useRef<HTMLDivElement>(null)

    const reactToPrintTrigger = React.useCallback(() => {
        return (
            <button className="flex justify-center gap-1 items-center w-2/4 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                </svg>
                <FormattedMessage id="action.print" defaultMessage="Print" />
            </button>
        )
    }, [])

    useEffect(() => {
        fetchOrderItems({ token, orderId: order.id, limit: 100, offset: 0 }).then((result) => {
            setOrderItems(result?.data?.data)
            setLoading(false)
        })
    }, [token, order.id])

    if (loading) {
        return (
            <div className="p-4 m-4 border border-gray-300 dark:border-gray-500 rounded">
                <div className="p-12 mt-12 text-center dark:text-gray-100 grid">
                    <Spinner />
                </div>
            </div>
        )
    }
    return (
        <div>
            <div
                className="p-4 m-4 mt-2 border border-gray-300 dark:border-gray-500 rounded"
                id="print"
                ref={componentRef}
            >
                <h2 className="dark:text-gray-300 font-bold"> Order items </h2>

                <div className={`flex w-full justify-between mt-1 pb-2 `}>
                    {/* TODO: Remove this console.log */}
                    {/* {console.log('order', order)} */}
                    {/* <div className="flex gap-2">
                        <div className="flex flex-col">
                            
                            <div className="text-gray-600 font-semibold dark:text-gray-200 my-1">
                                {order.supplier?.name} {'->'} {order?.buyer?.name}
                            </div>
                            <div className="text-gray-400 text-xs  dark:text-gray-300">
                                {order.createdAt
                                    ? format(new Date(order.createdAt), 'do MMM yyyy')
                                    : ''}
                            </div>
                            <div className="flex mt-4 w-max bg-green-200 font-bold text-sm text-green-800 px-2 rounded items-center">
                                {order?.orderStatus?.[0]?.note}
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="flex">
                        <div className="flex flex-col">
                            <div className="text-gray-600 text-lg font-extrabold dark:text-gray-200">
                ₹{' '}
                                {(
                                    parseFloat(order?.totalAmount) -
                  parseFloat(order?.flatDiscount)
                                ).toFixed(2)}
                            </div>
                            <div className="text-gray-400 text-xs font-extrabold mx-auto dark:text-gray-300">
                ({order?.numberOfItems} items)
                            </div>
                        </div>
                    </div> */}
                </div>

                {orderItems.map((item, index) => (
                    <div
                        className={`flex justify-between pb-2 ${
                            index === orderItems.length - 1
                                ? 'border-b-2 border-dashed border-gray-300 dark:border-gray-600 mb-2 pb-4'
                                : ''
                        }`}
                        key={`${index}`}
                    >
                        <div className="flex gap-2">
                            <div className="flex-none mt-2 text-gray-400 text-xs dark:text-gray-400">{item?.quantity} X </div>
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
                            {/* <div className="flex flex-col"> */}
                            {/* <div className="flex gap-4"> */}
                            <div className="text-gray-600 pr-4 self-center text-xs font-semibold md:text-md dark:text-gray-200">
                                {item?.product?.centralCatalogue?.name}
                                {item?.product?.aliasName
                                    ? `(${item?.product?.aliasName})`
                                    : ''}
                            </div>
                            {/* <div className="text-gray-600 dark:text-gray-300  ">
                    x 
                                    </div> */}
                            {/* </div> */}
                            {/* <div className="flex gap-4 text-xs font-bold"> */}
                            {/* <div className="text-gray-400 text-xs dark:text-gray-400">
                                    {item?.quantity} quantity
                                </div> */}
                            {/* <div className="text-gray-400 dark:text-gray-400">
                    MRP: ₹{item?.product?.mrpPrice}
                                    </div> */}
                            {/* </div> */}
                            {/* </div> */}
                        </div>
                        <div className="flex text-gray-400 text-xs font-extrabold dark:text-gray-300 self-center">
                            {/* ₹{item?.quantity * parseFloat(`${item?.purchasePrice}`)} */}
              ₹{item?.purchasePrice}
                        </div>
                    </div>
                ))}
                {orderItems?.length === 0 && (
                    <div className="mt-2 text-center text-gray-600 dark:text-gray-200 mb-4">
                        {' '}
            Order items are not available{' '}
                    </div>
                )}
                <div className="flex justify-end">
                    <div>
                        <div className="text-gray-600 dark:text-gray-200 text-lg font-extrabold text-right">
                            <span className="text-sm font-normal">Total:</span> ₹
                            {parseFloat(order?.totalAmount).toFixed(0)}
                        </div>
                        <div className="text-gray-600 dark:text-gray-200 text-lg font-extrabold text-right">
                            <span className="text-sm font-normal">Discount:</span> ₹
                            {parseFloat(order?.flatDiscount).toFixed(0)}
                        </div>
                        <div className="text-gray-600 dark:text-gray-200 text-lg font-extrabold text-right">
                            <span className="text-sm font-normal">Final Amount:</span> ₹
                            {(
                                parseFloat(order?.totalAmount) - parseFloat(order?.flatDiscount)
                            ).toFixed(0)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row mt-2 mb-10 ml-4 mr-4 gap-2 justify-end">
                <ReactToPrint
                    content={() => componentRef.current}
                    documentTitle={`Vyap All Orders`}
                    // onAfterPrint={handleAfterPrint}
                    // onBeforeGetContent={handleOnBeforeGetContent}
                    // onBeforePrint={handleBeforePrint}
                    removeAfterPrint
                    trigger={reactToPrintTrigger}
                />
                <button
                    onClick={minimize}
                    className="flex justify-center gap-1 items-center w-2/4 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    <FormattedMessage id="action.close" defaultMessage="Close" />
                </button>
            </div>
        </div>
    )
}