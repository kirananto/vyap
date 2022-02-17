import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hapticFeedback } from 'src/utils/vibrate'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { createOrderStatus } from 'src/API/order.axios'
import Completed from 'src/Components/Style/Icons/Completed'
import Processing from 'src/Components/Style/Icons/Processing'
import Pending from 'src/Components/Style/Icons/Pending'
import { OrderStatusEnum } from 'src/Pages/Orders/enum'
import { setOrderStatus } from '../chatListSlice'

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
        <div className="pb-8 pt-2 px-4">
            {/* Heading */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg w-full font-bold text-slate-500 dark:text-slate-200">Update Order Status</h1>
            </div>
            {/* row-1 */}
            <div className="flex flex-col mt-6">
                <button onClick={() => {
                    handleStatusUpdate(200)
                    hapticFeedback()
                    onClose()

                }} className="flex items-center py-3 gap-2 text-md font-semibold text-rose-500 dark:text-rose-300 custom-btn">
                    <Pending />
                    <span>Pending</span>
                </button>
                {/* ---- */}
                <button onClick={() => {
                    handleStatusUpdate(300)
                    hapticFeedback()
                    onClose()
                }} className="flex items-center py-3 gap-2 text-md font-semibold text-orange-500 dark:text-orange-300 custom-btn ">
                    <Processing />
                    <span>Processing</span>
                </button>
                {/* ---- */}
                <button onClick={() => {
                    handleStatusUpdate(400)
                    hapticFeedback()
                    onClose()
                }} className="flex items-center py-3 gap-2 text-md font-semibold text-green-500 dark:text-green-300 custom-btn ">
                    <Completed />
                    <span>Completed</span>
                </button>
            </div>
        </div>
    )
}

export default OrderOptionsPopup