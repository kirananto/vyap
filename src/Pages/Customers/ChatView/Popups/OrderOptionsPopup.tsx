import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hapticFeedback } from 'src/utils/vibrate'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { createOrderStatus } from 'src/API/order.axios'
import Completed from 'src/Components/Style/Icons/Completed'
import Processing from 'src/Components/Style/Icons/Processing'
import Pending from 'src/Components/Style/Icons/Pending'
import { OrderStatusEnum } from 'src/Pages/Orders/enum'
import { setOrderStatus } from '../chatListSlice'
import { STATUS_OPTIONS } from './types'

interface iProps {
    onClose: () => void,
    orderId?: string
    threadId?: string
    inboxId?: string
}

const OrderOptionsPopup = ({ onClose, orderId, threadId, inboxId }
    : iProps
) => {

    const dispatch = useDispatch()
    const { token } = useSelector(selectCredentials)

    const [statusOption, setStatusOption] = useState<STATUS_OPTIONS | undefined>(undefined)




    const handleStatusUpdate = async (statusCode: number) => {
        if (orderId && token) {
            createOrderStatus({ token: token, orderId: orderId, status: statusCode, note: `Updating status to ${OrderStatusEnum[statusCode]}` })
                .then((response) => {
                    //console.log('response', response)
                    if (response.data.status && response.data.orderId) {
                        dispatch(setOrderStatus({ inboxId: inboxId ?? '', threadId: threadId, orderStatus: [response.data]}))
                    }
                })
                .catch((error) => {
                    console.log('Edit product error', error)
                })
        }

    }

    return (
        <div className="pb-8 pt-2 px-2">
            {/* Heading */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg w-full font-bold text-slate-500 dark:text-slate-200">Update Order Status</h1>
            </div>
            {/* row-1 */}
            <div className="flex flex-col mt-6">

                    <div
                        className={
                            `flex items-center gap-2 p-2 mt-4 text-left ${statusOption === STATUS_OPTIONS.PENDING
                                ? 'border-2 rounded border-blue-600  dark:border-blue-400'
                                : 'border-2 rounded border-slate-200 dark:border-slate-600'}
                                
                        `}
                        onClick={() => { setStatusOption(STATUS_OPTIONS.PENDING)
                            // handleStatusUpdate(200)
                            // hapticFeedback()
                            // onClose()       
                        }}
                    >
                        <span className='text-yellow-500 dark:text-yellow-300'> <Pending /> </span>
                        <span className={` ${statusOption === STATUS_OPTIONS.PENDING ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`}>Pending</span>


                    </div>

                    <div
                        className={
                            `flex items-center gap-2 p-2 mt-4 text-left ${statusOption === STATUS_OPTIONS.PROCESSING
                                ? 'border-2 rounded border-blue-600  dark:border-blue-400'
                                : 'border-2 rounded border-slate-200 dark:border-slate-600'}
                                
                        `}
                        onClick={() => {    setStatusOption(STATUS_OPTIONS.PROCESSING)
                            // handleStatusUpdate(300)
                            // hapticFeedback()
                            // onClose()     
                        }}
                    >

                        <span className='text-blue-500 dark:text-blue-300'> <Processing /> </span>
                        <span className={` ${statusOption === STATUS_OPTIONS.PROCESSING ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`} >Processing</span>


                    </div>


                    <div
                        className={
                            `flex items-center gap-2 p-2 mt-4 text-left ${statusOption === STATUS_OPTIONS.COMPLETED
                                ? 'border-2 rounded border-blue-600  dark:border-blue-400'
                                : 'border-2 rounded border-slate-200 dark:border-slate-600'}
                                
                        `}
                        onClick={() => {  setStatusOption(STATUS_OPTIONS.COMPLETED)
                            // handleStatusUpdate(400)
                            // hapticFeedback()
                            // onClose()  
                        }}
                    >

                        <span className='text-green-500 dark:text-green-300'> <Completed /> </span>
                        <span className={` ${statusOption === STATUS_OPTIONS.COMPLETED ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`} > Completed</span>


                    </div>


            </div>


            <div className="flex mt-4 pt-4 gap-2">
                            <button
                                onClick={() => {
                                    hapticFeedback()
                                    //toggleVisibility(false)
                                }}
                                className="active:scale-95 p-3 w-full text-indigo-700 rounded-full border border-indigo-700 dark:border-indigo-200 dark:text-indigo-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    // if (!loading) {
                                    //     onConfirmOrder()
                                    // }
                                }}
                                className="active:scale-95 p-3 w-full text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
                            >
                                UPDATE
                            </button>
                        </div>
        </div>
    )
}

export default OrderOptionsPopup