import React from 'react'
import { useSelector } from 'react-redux'
import { hapticFeedback } from 'src/utils/vibrate'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { updateOrderStatus } from 'src/API/order.axios'

const OrderOptionsPopup = ({onClose, currentOrderStatusId } : {onClose: any, currentOrderStatusId: string}) => {

    const {token } = useSelector(selectCredentials)
    const handleStatusUpdate = async (statusCode : number) => {
        const orderId: string = currentOrderStatusId!
        const body: any = {
            status: statusCode
        }
        updateOrderStatus({ token: token!, id: orderId, data: body })
            .then((response : any) => {
                console.log('response', response)
                //navigate('/my-products')
            })
            .catch((error : any) => {
                console.log('Edit product error', error)
            })
    }

    return (
        <div className="pb-8 pt-2 px-4">
            {/* Heading */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg w-full font-bold text-gray-500 dark:text-gray-200">Update Order Status :</h1>
            </div>
            {/* row-1 */}
            <div className="flex flex-col mt-6">
                <button onClick={() => {
                    handleStatusUpdate(200)
                    hapticFeedback()
                    onClose()

                }} className="flex items-center py-3 gap-2 text-md font-semibold text-red-500 dark:text-red-300 custom-btn">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Pending</span>
                </button>
                {/* ---- */}
                <button onClick={() => {
                    handleStatusUpdate(300)
                    hapticFeedback()
                    onClose()
                }} className="flex items-center py-3 gap-2 text-md font-semibold text-orange-500 dark:text-orange-300 custom-btn ">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Processing</span>
                </button>
                {/* ---- */}
                <button onClick={() => {
                    handleStatusUpdate(400)
                    hapticFeedback()
                    onClose()
                }} className="flex items-center py-3 gap-2 text-md font-semibold text-green-500 dark:text-green-300 custom-btn ">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span>Completed</span>
                </button>
            </div>
        </div>
    )
}
    
export default OrderOptionsPopup