import React, { useEffect } from 'react'
import { NavLink  } from 'react-router-dom'
import { format } from 'date-fns'
import { useDispatch, useSelector,  } from 'react-redux'
import { useParams } from 'react-router'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { fetchOrderAPI } from 'src/API/order.axios'
import { setOrderInfo, ThreadInterface } from 'src/Pages/ChatView/chatListSlice'
import { hapticFeedback } from 'src/utils/vibrate'
import { useLongPress } from 'use-long-press'
import  { OrderStatusEnum } from 'src/Pages/Orders/enum'

export interface orderInterface {
  totalAmount: string
  flatDiscount: string
  numberOfItems: number
  id: string
  orderStatus:[{id: string, status: string}]
}

interface iProps { 
    className: string,
    thread: ThreadInterface,
    setorderOptionModalVisible: React.Dispatch<React.SetStateAction<boolean>> 
    setcurrentOrderStatusId: React.Dispatch<React.SetStateAction<string>>
}

export default function OrderCard({ 
    className,
    thread,
    setorderOptionModalVisible,
    setcurrentOrderStatusId
}
    : iProps) {
    const { token } = useSelector(selectCredentials)

    const { id } = useParams()

    const order = thread.order
    const dispatch = useDispatch()

    
    const bind = useLongPress(() => {
        // console.log('Long pressed!')
        setorderOptionModalVisible(true)
        // console.log('this order id:', order?.orderStatus[0].id)
        // console.log('this order:', order?.orderStatus[0]?.status)
        if(order?.orderStatus[0].id)
            setcurrentOrderStatusId(order?.orderStatus[0].id)
    })

    useEffect(() => {
        fetchOrderAPI(token!, thread.meta).then(result => {
            dispatch(setOrderInfo({ inboxId: id!, threadId: thread?.id, order: result.data }))
        })
    }, [order?.id])


    const orderStatusTxt = () => {
        const status = Number(order?.orderStatus[0]?.status)
        let statusTxt  = ''

        switch (status) {
            case OrderStatusEnum.PENDING: statusTxt = 'Pending'
                return statusTxt

            case OrderStatusEnum.PROCESSING: statusTxt = 'Processing'
                return statusTxt

            case OrderStatusEnum.COMPLETE: statusTxt = 'Completed'
                return statusTxt  
                                
            default:
                return statusTxt                  
        }
    }

    return (
        <div  {...bind} className={`flex ${className} w-full`}>
            <NavLink to={`/order/${thread.meta}`} onClick={hapticFeedback} className={`flex flex-col  w-11/12  sm:w-10/12 max-w-md gap-1 p-4 bg-white rounded-lg hover:bg-gray-50 shadow border border-purple-900 border-opacity-50 dark:bg-gray-800 dark:hover:bg-gray-600  ${order?.totalAmount === undefined ? 'animate-pulse' : ''}`}>
                <div className="p-1 px-4 text-xs bg-purple-200 text-purple-900 rounded-full max-w-max">
          Order
                </div>
                <div className={`text-4xl mt-1 text-gray-700 font-bold dark:text-gray-200 ${order?.totalAmount === undefined ? 'h-12 bg-gray-200 dark:bg-gray-700 rounded' : ''}`}>{order?.totalAmount !== undefined ? `₹ ${(parseFloat(order?.totalAmount) - parseFloat(order?.flatDiscount)).toFixed(2)}` : null }</div>

                {/* bottom  */}
                <div className="flex items-center w-full">
                    {/* col-1 */}
                    <div className="flex items-center w-24 gap-1">
                        {/* Tick icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-green-500 "
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                            {orderStatusTxt()}
                        </p>
                    </div>
                    {/* col-2 */}
                    <div className="flex justify-left w-7/12 gap-2">
                        <p className="text-xs text-gray-500 dark:text-gray-300">● {
                            format(
                                new Date(thread.updatedAt),
                                'do MMM'
                            )}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-300">  ● {order?.numberOfItems} items</p>
                    </div>

                    {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="justify-end w-5 h-5 text-gray-500 dark:text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg> */}
                </div>
            </NavLink>
        </div>
    )
}