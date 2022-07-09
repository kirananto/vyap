import React from 'react'
import Header from '../../../Components/Header/Header'
import  PaymentBottomHeader from '../../../Components/Header/PaymentBottomHeader'
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
import Button from 'src/Components/Style/Button'
import { differenceInMilliseconds } from 'date-fns'

export const Payment = () => {
    const { token } = useSelector(selectCredentials)
    const [paymentModalVisible, setPaymentModalVisible] = useQueryParam<boolean>(
        'paymentModalVisible'
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const chatList = useSelector(selectChatList)

    const { id } = useParams()
    const inbox = chatList[`${id}`]
    
    const latestThreadUpdatedAt = inbox?.threads[0]?.updatedAt


    useEffect(() => {
        dispatch(clearAll())
    }, [dispatch])

    useEffect(() => {
        const diffInSec = differenceInMilliseconds(new Date(), new Date(latestThreadUpdatedAt)) / 1000
        // CHeck if difference between two dates is less than 10 seconds
        if (token && (inbox.id ? diffInSec < 15 : true)) {
            // @ts-ignore
            dispatch(fetchInboxAction({ token: token, id: id }))
        }
    }, [paymentModalVisible, id, token, dispatch, inbox.id, inbox.updatedAt, latestThreadUpdatedAt])

    useEffect(() => {
        localStorage?.setItem('inboxId', inbox?.id)
    }, [inbox?.id])

    useEffect(() => {
        localStorage.setItem('isSupplier', `${inbox?.isSupplier}`)
    }, [inbox?.isSupplier])

    return (
        <div className="overflow-y-auto dark:bg-slate-900">
            {/* header */}
            <div className="fixed w-full z-10 pb-3 bg-white drop-shadow-md dark:bg-slate-800">
                <Header
                    isSticky={false}
                    onBackClick={() => navigate('/home')}
                    heading="Transactions"
                    subHeading={inbox?.recipient?.name}
                    phoneNumber={inbox?.recipient?.officeNumber}
                />
                <PaymentBottomHeader
                    amount={inbox?.outstandingAmount}
                    isLoading={inbox?.outstandingAmount === undefined}
                />
            </div>
            {/* body */}
            <ChatList 
                inboxHash={inbox?.inboxHash} 
                isLoading={inbox?.outstandingAmount === undefined}
                toRefresh={paymentModalVisible ?? false}
            />
            {/* Footer */}
            <div
                className="fixed bottom-0 flex items-center justify-center w-full h-20 gap-4 bg-white dark:bg-slate-800"
                style={{ boxShadow: '0px -2px 8px #0000002e' }}
            >
                {inbox?.isSupplier ? (
                    <Button
                        onClick={() => {
                            hapticFeedback()
                            setPaymentModalVisible(true)
                        }}
                        className="w-2/5 h-12 "
                    >
            Add Payment
                    </Button>
                ) : null}
                <Button
                    onClick={() => {
                        hapticFeedback()
                        dispatch(setOrgId(inbox?.recipient?.id))
                        navigate('/place-order/add-item')
                    }}
                    className="w-2/5 h-12"
                >
          Place Order
                </Button>
            </div>
            {paymentModalVisible && (
                <AddPaymentModal
                    isVisible={paymentModalVisible}
                    toggleVisibility={setPaymentModalVisible}
                    receiverId={inbox?.recipient.id}
                />
            )}
        </div>
    )
}