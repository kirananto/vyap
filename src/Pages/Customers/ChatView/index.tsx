import React, { useState } from 'react'
import './payment.css'
import { Header, PaymentBottomHeader } from '../../../Components/Header'
import ChatList from './ChatList'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectCredentials } from '../../Login/credentialsSlice'
import AddPaymentModal from './Popups/AddPaymentModal'
import { setOrgId, clearAll } from './PlaceOrder/placeOrderSlice'
import useQueryParam from 'src/utils/useQueryParams'
import { fetchInboxAction, selectChatList } from './chatListSlice'
import { hapticFeedback } from 'src/utils/vibrate'
import ModalViewer from 'src/Components/Style/ModalViewer'
import OrderOptionsPopup from './Popups/OrderOptionsPopup'

export const Payment = () => {
    const { token } = useSelector(selectCredentials)
    const [paymentModalVisible, setPaymentModalVisible] = useQueryParam<boolean>(
        'paymentModalVisible'
    )
    const [currentOrderId, setCurrentOrderId] = useState<string>('')
    const [orderOptionModalVisible, setorderOptionModalVisible] = useState<boolean>(false)

    const [updatingOrderId, setUpdatingOrderId] = useState<string>()
    const [newStatus, setNewStatus] = useState<number>()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const chatList = useSelector(selectChatList)

    const { id } = useParams()
    const inbox = chatList[`${id}`]

    useEffect(() => {
        dispatch(clearAll())
    }, [dispatch])

    useEffect(() => {
        console.log('------------------------changed-----------')
        if (token) {
            dispatch(fetchInboxAction({ token: token, id: id }))
        }
    }, [paymentModalVisible, id, token, dispatch])

    useEffect(() => {
        localStorage?.setItem('inboxId', inbox?.id)
    }, [inbox?.id])

    useEffect(() => {
        localStorage.setItem('isSupplier', `${inbox?.isSupplier}`)
    }, [inbox?.isSupplier])
    return (
        <div className="overflow-y-auto dark:bg-gray-900">
            {/* header */}
            <div className="fixed w-full z-10 pb-3 bg-white drop-shadow-md dark:bg-gray-800">
                <Header
                    isSticky={false}
                    onBackClick={() => navigate('/home')}
                    heading="Transactions"
                    subHeading={inbox?.recipient?.name}
                    phoneNumber={inbox?.recipient?.officeNumber}
                />
                <PaymentBottomHeader
                    amount={inbox?.outstandingAmount}
                    isLoading={inbox?.recipient?.name !== undefined ? false : inbox?.isLoading === true}
                />
            </div>
            {/* body */}
            <ChatList 
                setorderOptionModalVisible={setorderOptionModalVisible}
                setCurrentOrderId={setCurrentOrderId}
                inboxHash={inbox?.inboxHash} 
                toRefresh={paymentModalVisible ?? false} 
                updatingOrderId={updatingOrderId}
                newStatus={newStatus}
            />
            {/* Footer */}
            <div
                className="fixed bottom-0 flex items-center justify-center w-full h-20 gap-4 bg-white dark:bg-gray-800"
                style={{ boxShadow: '0px -6px 28px #0000002e' }}
            >
                {inbox?.isSupplier ? (
                    <button
                        onClick={() => {
                            hapticFeedback()
                            setPaymentModalVisible(true)
                        }}
                        className="w-2/5 text-white rounded-full h-12 bg-gradient-to-br from-blue-500 to-indigo-700 "
                    >
            Add Payment
                    </button>
                ) : null}
                <button
                    onClick={() => {
                        hapticFeedback()
                        dispatch(setOrgId(inbox?.recipient?.id))
                        navigate('/place-order/add-item')
                    }}
                    className="w-2/5 text-white rounded-full h-12 bg-gradient-to-br from-blue-500 to-indigo-700 "
                >
          Place Order
                </button>
            </div>
            {paymentModalVisible && (
                <AddPaymentModal
                    isVisible={paymentModalVisible}
                    toggleVisibility={setPaymentModalVisible}
                    receiverId={inbox?.recipient.id}
                />
            )}

            <ModalViewer
                body={
                    <OrderOptionsPopup
                        onClose={() => {
                            setorderOptionModalVisible(false)
                        }}
                        currentOrderId={currentOrderId}
                        setUpdatingOrderId={setUpdatingOrderId}
                        setNewStatus={setNewStatus}

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