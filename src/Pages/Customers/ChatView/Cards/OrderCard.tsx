import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { format } from 'date-fns'
import { useDispatch, useSelector, } from 'react-redux'
import { useParams } from 'react-router'
import { Organization, selectCredentials, User } from 'src/Pages/Login/credentialsSlice'
import { fetchOrderAPI } from 'src/API/order.axios'
import { setOrderInfo, ThreadInterface } from 'src/Pages/Customers/ChatView/chatListSlice'
import { hapticFeedback } from 'src/utils/vibrate'
import { useLongPress } from 'use-long-press'
import { OrderStatusEnum } from 'src/Pages/Orders/enum'
import Completed from '../../../../Components/Style/Icons/Completed'
import Pending from '../../../../Components/Style/Icons/Pending'
import Processing from '../../../../Components/Style/Icons/Processing'
import type { IProduct } from 'src/types/product'
import ModalViewer from 'src/Components/Style/ModalViewer'
import OrderOptionsPopup from '../Popups/OrderOptionsPopup'
import { FormattedMessage } from 'react-intl'

export interface IOrderItem {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    orderId: string;
    quantity: number;
    purchasePrice: string;
    mrpPrice: string;
    aliasName: string;
    productId: string;
    product: IProduct;
    rate?: number
}

export interface orderInterface {
    totalAmount: string
    flatDiscount: string
    numberOfItems: number
    id: string
    updatedAt: Date
    createdAt: Date
    supplierId: string
    buyer: Organization
    supplier: Organization
    orderItems?: IOrderItem[]
    initiatedBy?: User
    description?: string
    orderStatus: [{ id: string, status: OrderStatusEnum, note?: string }]
}

interface iProps {
    className: string,
    thread: ThreadInterface,
    isScrolling: boolean
}

export default function OrderCard({
    className,
    thread,
    isScrolling
}
    : iProps) {
    const { token } = useSelector(selectCredentials)
    const { id } = useParams()
    const order = thread.order
    const dispatch = useDispatch()


    const status = Number(order?.orderStatus[order?.orderStatus?.length - 1]?.status)

    const [orderOptionModalVisible, setorderOptionModalVisible] = useState<boolean>(false)

    // useEffect(() => {
    //     if (newStatus && updatingOrderId === order?.id)
    //         setStatus(newStatus)
    // }, [newStatus, updatingOrderId, order?.id])

    const bind = useLongPress(() => {
        !isScrolling && setorderOptionModalVisible(true)
    })

    useEffect(() => {
        if (!order?.id) {
            id && fetchOrderAPI({ token, id: thread.meta }).then(result => {
                dispatch(setOrderInfo({ inboxId: id, threadId: thread?.id, order: result.data }))
            })
        }
    }, [dispatch, id, order?.id, thread?.id, thread.meta, token])


    const orderStatusTxt = () => {
        switch (status) {
            case OrderStatusEnum.PENDING:
                return {
                    statusTxt: 'Pending',
                    statusIcon: <span className='text-yellow-400'><Pending /></span>
                }
            case OrderStatusEnum.PROCESSING:
                return {
                    statusTxt: 'Processing',
                    statusIcon: <span className='text-blue-800'><Processing /></span>
                }

            case OrderStatusEnum.COMPLETE:
                return {
                    statusTxt: 'Completed',
                    statusIcon: <span className='text-green-400'><Completed /></span>
                }

            default:
                return {
                    statusTxt: '...',
                    statusIcon: <></>
                }
        }
    }

    const stats = orderStatusTxt()
    return (
        <div  {...bind} className={`flex ${className} w-full`}>
            <NavLink to={`/chat/${id}/order/${thread.meta}`} onClick={hapticFeedback} className={`flex flex-col  w-11/12  sm:w-10/12 max-w-md gap-1 p-4 bg-white rounded-lg hover:bg-slate-50 shadow border border-purple-900 border-opacity-50 dark:bg-slate-800 dark:hover:bg-slate-600  ${order?.totalAmount === undefined ? 'animate-pulse' : ''}`}>
                <div className="p-1 px-4 text-xs bg-purple-200 text-purple-900 rounded-full max-w-max">
                    <FormattedMessage
                        id="global.order"
                        defaultMessage="Order"
                    />
                </div>
                <div className={`text-3xl mt-1 text-slate-700 font-bold dark:text-slate-200 truncate ${order?.totalAmount === undefined ? 'h-12 bg-slate-200 dark:bg-slate-700 rounded' : ''}`}>{order?.totalAmount !== undefined ? `₹ ${(parseFloat(order?.totalAmount) - parseFloat(order?.flatDiscount)).toLocaleString('en-IN')}.00` : null}</div>

                {/* bottom  */}
                <div className="flex items-center w-full">
                    {/* col-1 */}
                    <div className="flex items-center w-24 gap-1">
                        {/* Tick icon */}
                        {stats.statusIcon}

                        <p className="text-xs text-slate-500 dark:text-slate-300">
                            {stats.statusTxt}
                        </p>
                    </div>
                    {/* col-2 */}
                    <div className="flex justify-left w-7/12 gap-2">
                        <p className="text-xs text-slate-500 dark:text-slate-300">● {
                            format(
                                new Date(thread.updatedAt),
                                'do MMM'
                            )}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-300">  ● {order?.numberOfItems} item{(order?.numberOfItems ?? 0) > 1 ? 's' : ''}</p>
                    </div>
                </div>

            </NavLink>
            <ModalViewer
                body={
                    <OrderOptionsPopup
                        onClose={() => {
                            setorderOptionModalVisible(false)
                        }}
                        orderId={order?.id}
                        threadId={thread?.id}
                        inboxId={id}

                    />
                }
                isOpen={!!orderOptionModalVisible}
                onClose={() => {
                    setorderOptionModalVisible(false)
                }}
            />
        </div>
    )
}