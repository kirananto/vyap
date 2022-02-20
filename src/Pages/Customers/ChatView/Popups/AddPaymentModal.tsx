import { paymentMethod, paymentStatus } from '../../../../API/enum'
import React, { useState } from 'react'
import { createPayment } from 'src/API/payment.axios'
import { useSelector } from 'react-redux'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { Min, validate } from 'class-validator'
import { hapticFeedback } from 'src/utils/vibrate'
import { BUTTON_ACTION, PAYMENT_OPTIONS } from '../PlaceOrder/types'
import { useNavigate } from 'react-router-dom'
import '../payment.css'
import type { orderInterface } from 'src/Pages/Customers/ChatView/Cards/OrderCard'
import Success from 'src/Pages/Customers/AddCustomerModal/Success'

export class PostAmount {
    @Min(1)
        amount!: number
}

interface IProps {
    isVisible: boolean;
    toggleVisibility: (value: boolean) => void;
    receiverId?: string;
    orderAmount?: number;
    btnAction?: string;
    placeOrder?: () => Promise<orderInterface>
}
export default function AddPaymentModal({
    isVisible,
    toggleVisibility,
    receiverId,
    orderAmount,
    btnAction,
    placeOrder
}: IProps) {
    const { token, user } = useSelector(selectCredentials)
    const navigate = useNavigate()
    const [method, setMethod] = useState<paymentMethod>(paymentMethod.CASH)
    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState<number | undefined>((btnAction === BUTTON_ACTION.PLACE_ORDER) ? orderAmount : undefined)
    const [paymentOption, setPaymentOption] = useState<PAYMENT_OPTIONS>(PAYMENT_OPTIONS.PAY_LATER)
    const [isSuccess, setIsSuccess] = useState(false)
    const [note, setNote] = useState('')

    const [customAmount, setCustomAmount] = useState<number | undefined>(amount)
    const [isValidAmount, setIsValidAmount] = useState<boolean>(true)

    const parsedcustomAmount = parseInt(`${customAmount}`, 10) ? parseInt(`${customAmount}`, 10) : 0

    console.log('parsedcustomAmount', parsedcustomAmount)

    const onValidate = (action: string, value: number, handle: () => void) => {

        const post = new PostAmount()
        post.amount = Number(value)

        validate(post).then((errors) => {
            if (errors.length > 0) {
                if (btnAction === BUTTON_ACTION.PLACE_ORDER && (paymentOption === PAYMENT_OPTIONS.PARTIAL_PAYMENT && orderAmount ? (parsedcustomAmount < orderAmount) : paymentOption === PAYMENT_OPTIONS.PAY_LATER)) {
                    console.log('validation ignored')
                    setIsValidAmount(true)
                    handle()
                } else {
                    console.log('validation failed. errors: ', errors)
                    setIsValidAmount(false)
                    setLoading(false)
                }
            } else {
                if (paymentOption === PAYMENT_OPTIONS.PARTIAL_PAYMENT && orderAmount !== undefined ? (parsedcustomAmount > orderAmount) : false) {
                    setIsValidAmount(false)
                    setLoading(false)
                } else {
                    setIsValidAmount(true)
                    console.log('validation succeed')
                    if (action === 'submit') {
                        handle()
                    }
                }
            }
        })
    }

    function getNoteText(order: orderInterface) {
        return `Payment recieved for order #${order.id?.split('-')[0]}`
    }

    const handleSubmit = async () => {
        let order = undefined
        if (btnAction === BUTTON_ACTION.PLACE_ORDER && placeOrder) {
            order = await placeOrder()
        }
        console.log('order', order)
        if (btnAction === BUTTON_ACTION.PLACE_ORDER ? paymentOption !== PAYMENT_OPTIONS.PAY_LATER : true) {
            // TODO validations before making API call
            createPayment({
                token, data: {
                    amount: (btnAction === BUTTON_ACTION.PLACE_ORDER && paymentOption !== PAYMENT_OPTIONS.FULL_PAYMENT) ? parsedcustomAmount : (amount ?? 0),
                    note: order ? getNoteText(order) : note,
                    method,
                    status: paymentStatus.SUCCESS,
                    receiverId: user?.organizationId,
                    senderOrgId: receiverId,
                }
            })
                .then(() => {
                    setLoading(false)
                    setIsSuccess(true)
                    if (btnAction === BUTTON_ACTION.PLACE_ORDER) {
                        navigate(`/chat/${localStorage?.getItem('inboxId')}`)
                    }
                })
                .catch(() => {
                    setLoading(false)
                    // TODO feedback for error
                })
        } else {
            setLoading(false)
            navigate(`/chat/${localStorage?.getItem('inboxId')}`)
        }
    }

    //.....Confirm Order Button Action
    function onConfirmOrder() {
        setLoading(true)
        hapticFeedback()
        let validateAmount = 0
        if (btnAction === BUTTON_ACTION.PLACE_ORDER) {
            switch (paymentOption) {
                case PAYMENT_OPTIONS.FULL_PAYMENT:
                    validateAmount = amount ?? 0
                    break
                case PAYMENT_OPTIONS.PARTIAL_PAYMENT:
                    validateAmount = parsedcustomAmount
                    break
                case PAYMENT_OPTIONS.PAY_LATER:
                    validateAmount = parsedcustomAmount
                    break
                default:
                    validateAmount = 0
                    break
            }
        } else {
            validateAmount = amount ?? 0
        }
        onValidate(
            'submit',
            Number(validateAmount),
            handleSubmit)
    }


    //.....Order Confirmation message
    function orderConfirmText() {
        const orderTextStart = 'Confirm Place Order '
        let orderTextMid = '...'
        let orderTextEnd = '...'

        if (btnAction === BUTTON_ACTION.PLACE_ORDER) {
            switch (paymentOption) {
                case PAYMENT_OPTIONS.FULL_PAYMENT:
                    orderTextMid = ' by receiving the full payment of ₹'
                    orderTextEnd = '' + orderAmount
                    break
                case PAYMENT_OPTIONS.PARTIAL_PAYMENT:
                    orderTextMid = ' by receiving a partial payment of ₹'
                    orderTextEnd = '' + parsedcustomAmount
                    break
                case PAYMENT_OPTIONS.PAY_LATER:
                    orderTextMid = 'by PAYING LATER'
                    orderTextEnd = ''
                    break
                default:
                    orderTextMid = '...error'
                    break
            }
        }
        return <span className="font-bold">
            {orderTextStart + orderTextMid + orderTextEnd}
        </span>
    }

    return (
        <div>
            <div
                onClick={() => {
                    hapticFeedback()
                    toggleVisibility(false)
                }}
                className={`fixed pin top-0 z-10 ${isVisible ? 'show' : 'hidden'
                } overflow-auto bg-slate-900 h-screen w-screen opacity-50 flex transition animate__animated animate__faster`}
            />
            <div
                className={`popup ${isVisible ? 'show' : ''
                }
                
                 animate__animated animate__fadeInUpBig animate__faster bg-white dark:bg-slate-700`}
            >
                {isSuccess ? (
                    <Success
                        text="Successfully updated the payment"
                        toggleVisibility={() => toggleVisibility(false)}
                    />
                ) : (
                    <>
                        <h2 className="text-left p-2 pl-0 text-2xl mt-2 text-slate-700 dark:text-slate-200">
                            {btnAction === BUTTON_ACTION.PLACE_ORDER
                                ? 'Payment Details'
                                : 'Add Payment you recieved.'}
                        </h2>

                        {btnAction === BUTTON_ACTION.PLACE_ORDER ? (
                            <>
                                <div className='text-left dark:text-slate-200 pl-0 mt-6 mb-4'>
                                    <span className="font-semibold">
                                        <span className="text-slate-500 pr-3 text-xl dark:text-slate-200">Order Total:</span>  <span className="font-bold">₹{orderAmount}</span>
                                    </span>
                                </div>

                                {/* ------- pay later button ---------*/}

                                <div
                                    className={
                                        `p-2 mt-4 text-left ${(paymentOption === PAYMENT_OPTIONS.PAY_LATER)
                                            ? 'border-2 rounded-lg border-blue-600  dark:border-blue-400'
                                            : 'border-2 rounded-lg border-slate-200 dark:border-slate-600'}
            
    `}
                                    onClick={() => setPaymentOption(PAYMENT_OPTIONS.PAY_LATER)}
                                >
                                    <label className="inline-flex font-bold mt-2 mb-2 ml-4">
                                        <span className={` ${paymentOption === PAYMENT_OPTIONS.PAY_LATER ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`}> Pay Later</span>
                                    </label>
                                </div>

                                <div
                                    className={
                                        `p-2 mt-4 text-left ${paymentOption === PAYMENT_OPTIONS.FULL_PAYMENT
                                            ? 'border-2 rounded-lg border-blue-600  dark:border-blue-400'
                                            : 'border-2 rounded-lg border-slate-200 dark:border-slate-600'}
                                            
                                    `}
                                    onClick={() => setPaymentOption(PAYMENT_OPTIONS.FULL_PAYMENT)}
                                >
                                    <label className="inline-flex  font-bold mt-2 mb-2 ml-4">
                                        <span className={` ${paymentOption === PAYMENT_OPTIONS.FULL_PAYMENT ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`}> Full Payment</span>
                                    </label>
                                </div>

                                <div
                                    className={
                                        `p-2 pb-4 mt-4 text-left ${!(paymentOption === PAYMENT_OPTIONS.PARTIAL_PAYMENT)
                                            ? ' border-2 rounded-lg  border-slate-300  dark:border-slate-600'
                                            : 'border-2 rounded-lg border-blue-600  dark:border-blue-400'}
                                    `}
                                    onClick={() => setPaymentOption(PAYMENT_OPTIONS.PARTIAL_PAYMENT)}
                                >
                                    <label className="inline-flex mt-2 font-bold ml-4">
                                        <span className={` ${paymentOption === PAYMENT_OPTIONS.PARTIAL_PAYMENT ? 'text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300'}`}> Partial Payment</span>
                                    </label>{' '}
                                    <br />
                                    {(paymentOption === PAYMENT_OPTIONS.PARTIAL_PAYMENT) && (<>
                                        <label className="mt-5 place-self-center">
                                            <div className="ml-4 mt-4 text-slate-700 mr-5 self-center dark:text-slate-300"> Amount:</div>

                                            <input
                                                value={customAmount}
                                                onChange={(event) => {
                                                    setCustomAmount(event?.target.value as unknown as number)
                                                    onValidate(
                                                        'change',
                                                        event?.target.value as unknown as number, () => console.log('data')
                                                    )
                                                }}
                                                className="p-4 m-2 w-auto text-base text-black transition duration-500 ease-in-out transform 
                                                border-transparent rounded-lg bg-slate-200 opacity-75 
                                                focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 
                                                dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                                                inputMode="numeric"
                                                type="number"
                                            />

                                        </label>

                                        <span
                                            className={
                                                `flex items-center font-medium tracking-wide text-rose-500 dark:text-rose-400 text-xs mt-1 ml-1 pl-2 ${isValidAmount ? 'hidden' : ''}`
                                            }
                                        >
                                            Please enter a valid amount !
                                        </span>

                                    </>



                                    )}
                                </div>




                                <div className='text-left text-slate-500 italic dark:text-slate-200 pl-2 my-7'>
                                    {orderConfirmText()}
                                </div>
                            </>
                        ) : (
                            <>
                                {/* <!-- Payment Mode Dropdown --> */}
                                <div className="p-2 pl-0">
                                    <span className="float-left mb-2 text-sm text-slate-500 dark:text-slate-300">
                                        Payment mode
                                    </span>
                                    <select
                                        value={method}
                                        onChange={(event) =>
                                            setMethod(
                                                parseInt(
                                                    event?.target.value,
                                                    10
                                                ) as unknown as paymentMethod
                                            )
                                        }
                                        className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-slate-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                                        name="payment"
                                        id="payment"
                                    >
                                        <option value={paymentMethod.CASH}>CASH</option>
                                        <option value={paymentMethod.CHEQUE}>CHEQUE</option>
                                    </select>
                                </div>
                                {/* <!-- Amount --> */}
                                <div className="p-2 pl-0">
                                    <span className="float-left mb-2 text-sm text-slate-500 dark:text-slate-300">
                                        AMOUNT
                                    </span>
                                    <input
                                        value={amount}
                                        onChange={(event) => {
                                            setAmount(
                                                parseFloat(event?.target.value) > 0
                                                    ? parseFloat(event?.target.value)
                                                    : 0
                                            )
                                            onValidate(
                                                'change',
                                                parseFloat(event?.target.value) > 0
                                                    ? parseFloat(event?.target.value)
                                                    : 0,
                                                () => {
                                                    console.log('validate')
                                                }
                                            )
                                        }}
                                        className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-slate-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                                        inputMode="numeric"
                                        type="number"
                                    />

                                    <span
                                        className={
                                            'flex items-center font-medium tracking-wide text-rose-500 text-xs mt-1 ml-1 ' +
                                            (isValidAmount ? 'hidden' : '')
                                        }
                                    >
                                        Please enter a valid amount !
                                    </span>
                                </div>
                                {/* <!-- Remarks Textarea --> */}
                                <div className="p-2 pl-0">
                                    <span className="float-left mb-2 text-sm text-slate-500 dark:text-slate-300">
                                        REMARKS
                                    </span>
                                    <textarea
                                        value={note}
                                        onChange={(event) => setNote(event.target.value)}
                                        className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-slate-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                                        id=""
                                    ></textarea>
                                </div>
                            </>
                        )}

                        {/* <!-- btn popup --> */}
                        <div className="flex mt-4 p-2 gap-2">
                            <button
                                onClick={() => {
                                    hapticFeedback()
                                    toggleVisibility(false)
                                }}
                                className="save-btn p-3 w-full text-indigo-700 rounded-full border border-indigo-700 dark:border-indigo-200 dark:text-indigo-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (!loading) {
                                        onConfirmOrder()
                                    }
                                }}
                                className="save-btn p-3 w-full text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
                            >
                                {loading ? <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg> : (btnAction === BUTTON_ACTION.PLACE_ORDER
                                    ? 'Confirm Order'
                                    : 'Save Payment')}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}