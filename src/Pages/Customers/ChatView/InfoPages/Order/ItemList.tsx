import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchOrderItems } from 'src/API/order.axios'
import type { IOrderItem, orderInterface } from 'src/Pages/Customers/ChatView/Cards/OrderCard'
import Spinner from 'src/Components/Style/Spinner'
import { selectChatList, setOrderItems } from 'src/Pages/Customers/ChatView/chatListSlice'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'

function Items({ order }: { order: orderInterface }) {

    const { id, chatId } = useParams()
    const { token } = useSelector(selectCredentials)
    const [loading, setLoading] = useState(true)
    const chatList = useSelector(selectChatList)
    const thread = chatList[`${chatId}`]?.threads?.find(findItem => findItem?.order?.id === id)
    // const order = thread?.order
    const orderItems = order?.orderItems
    // const [orderItems, setOrderItems] = useState<any[]>([])
    const dispatch = useDispatch()

    useEffect(() => {
        fetchOrderItems({ token, orderId: order.id, limit: 100, offset: 0 }).then((result) => {
            // setOrderItems(result?.data?.data)
            dispatch(setOrderItems({ inboxId: chatId ?? '', threadId: thread?.id, orderItems: result?.data?.data }))
        }).finally(() => setLoading(false))
    }, [token, order.id, dispatch, chatId, thread?.id])

    if(loading && orderItems?.length === 0) {
        return (
            <div className="mt-12 grid p-12 text-center dark:text-gray-100">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {orderItems?.map((item: IOrderItem, index: number) => (
                <div className="flex justify-between py-2" key={`${index}`}>
                    <div className="flex w-full gap-4">
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
                        <div className="flex w-3/5 flex-col">
                            <div className="flex  text-sm font-bold text-gray-800 dark:text-gray-200">
                                {item?.product?.centralCatalogue?.name}
                                {item?.product?.aliasName
                                    ? `(${item?.product?.aliasName})`
                                    : ''}
                            </div>
                            {/* <div className="flex font-bold text-xs text-gray-400">
                                {item?.product?.centralCatalogue?.description}
                            </div> */}
                            <div className="flex font-bold text-xs text-gray-600 dark:text-gray-500">
                Rate: ₹{item?.purchasePrice}
                            </div>
                        </div>
                        {/* <div className="flex-none flex-col h-5 px-2 w-auto font-bold tracking-wide rounded text-xs bg-gray-200 dark:bg-gray-600 dark:text-gray-300 self-center items-center justify-center">
              X {item?.quantity}
                        </div> */}
                    </div>
                    <div className="flex-wrap text-lg ml-4 min-w-[20%] font-bold text-gray-600 dark:text-gray-200 text-right">
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
  order: orderInterface;
  shareON?: boolean;
  shareProceed?: (arg1: string) => void;
}) {
    const [isExpanded, setIsExpanded] = useState(shareON ? true : false)

    useEffect(() => {
        if (shareON === true) {
            setIsExpanded(true)
            shareProceed?.('page')
        }
    }, [shareON, shareProceed])

    return (
        <div className="w-11/12 p-4 bg-white rounded-md shadow border border-purple-900 border-opacity-50 dark:bg-gray-800">
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