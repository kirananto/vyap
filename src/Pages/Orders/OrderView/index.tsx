import React, { useState, useEffect, createRef } from 'react'
import { Header } from '../../../Components/Header'
import OrderDetail from './OrderDetails'
import ItemList from './ItemList'
import { useSelector, useDispatch } from 'react-redux'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { useParams } from 'react-router'
import { fetchOrderAPI } from 'src/API/order.axios'
import { format } from 'date-fns'
import { useScreenshot } from 'use-react-screenshot'
import OrderBill from './OrderBill'
import Button from 'src/Components/Style/Button'
import { isNumber } from 'class-validator'
import { selectChatList, setOrderInfo } from 'src/Pages/ChatView/chatListSlice'

export default function OrderDetails() {
    // const [order, setOrder] = useState<any | undefined>()
    const [shareAction, setShareAction] = useState(false)
    const [billActive, setBillActive] = useState(false)

    const { user, token } = useSelector(selectCredentials)
    const { id, chatId } = useParams()
    const dispatch = useDispatch()

    
    
    const chatList = useSelector(selectChatList)
    const thread = chatList[`${chatId}`]?.threads?.find(findItem => findItem?.order?.id === id)
    const order = thread?.order

    const refBill = createRef<HTMLInputElement>()
    const getBill = () => takeScreenshot(refBill.current)

    const ref = createRef<HTMLInputElement>()
    // TODO
    const [, takeScreenshot] = useScreenshot()
    const getImage = () => takeScreenshot(ref.current)

    useEffect(() => {
        fetchOrderAPI({ token, id: id }).then((result) => {
            // setOrder(result.data)
            dispatch(setOrderInfo({ inboxId: chatId ?? '', threadId: thread?.id, order: result.data }))
        })
    }, [chatId, dispatch, id, thread?.id, token])

    // ....Bill Actions....  
    //Show the bill in DOM on Share Click and then Hide after a delay
    useEffect(() => {
        billActive && share('bill')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [billActive])

    function shareBill() {
        setBillActive(true)
    }
    ///...end Bill Actions

    
    const onShare = () => {
        if (shareAction) {
            share('page')
        } else {
            setShareAction(true)
        }
    }

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

    async function share(type: string) {
        await delay(200)
        const getImg = type === 'page' ? await getImage() : await getBill()
        const images = await fetch(getImg)
        const blob: any = await images.blob()
        const file = new File([blob], 'order_summary.png', { type: 'image/png' })
        navigator.share({ text: 'Order Summary', files: [file] } as ShareData)
        await delay(2000)
        setBillActive(false)
    }

    function getCompanyName() {
        const company =
      user?.organizationId === order?.supplierId
          ? order?.buyer
          : order?.supplier
        return company?.name
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 overflow-auto dark:bg-gray-900">
                {/* Header */}
                <div className="w-full py-2 bg-white shadow dark:bg-gray-800">
                    {/* Todo :: Share icon have to be added in the place of contact icon */}
                    <Header
                        isSticky={true}
                        heading="Order details"
                        subHeading={getCompanyName()}
                        shareAction={onShare}
                    />
                </div>
                <span ref={ref}>
                    {/* Body */}
                    <div className="flex flex-col items-center gap-5 py-24">
                        <h1 className="text-6xl font-black text-center text-gray-600 dark:text-gray-300">
              ₹
                            {(order?.totalAmount && isNumber(parseFloat(order?.totalAmount) - parseFloat(order?.flatDiscount))) ?  (
                                parseFloat(order?.totalAmount) - parseFloat(order?.flatDiscount)
                            ).toFixed(2) : ''}
                        </h1>
                        {/* ---------------- */}
                        <div className="flex items-center justify-center gap-3">
                            {/* Tick icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-green-300 "
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                Order completed
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                ●{' '}
                                {order?.updatedAt
                                    ? format(new Date(order?.updatedAt), 'do MMM')
                                    : null}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                ● {order?.numberOfItems} Items
                            </p>
                            {/* ------------------ */}
                        </div>
                        {/* Order Detail card */}
                        <OrderDetail order={order} shareON={shareAction} />
                        {/* Item List */}
                        <ItemList
                            order={order}
                            shareON={shareAction}
                            shareProceed={share}
                        />
                    </div>
                </span>
                <div className="flex justify-center">
                    <Button
                        className="w-40 px-4 mb-64"
                        onClick={() => {
                            shareBill()
                        }}
                    >
                        <div className="flex w-full items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 dark:text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                />
                            </svg>
                            <span className="pl-6">Share Bill</span>
                        </div>
                    </Button>
                </div>

                <div className={billActive ? '' : 'hidden'}>
                    <span ref={refBill}>
                        <OrderBill order={order} />
                    </span>
                </div>
            </div>
        </>
    )
}