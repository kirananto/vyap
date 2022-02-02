import { paymentMethod, paymentStatus } from '../../API/enum'
import React, { useState } from 'react'
import { createPayment } from 'src/API/payment.axios'
import { useSelector } from 'react-redux'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import Success from '../Home/AddCustomerModal/Success'
import { Min, validate } from 'class-validator'
import { hapticFeedback } from 'src/utils/vibrate'
import { BUTTON_ACTION, PAYMENT_OPTIONS } from './PlaceOrder/types'
import { useNavigate } from 'react-router-dom'
import './payment.css'

export class PostAmount {
    @Min(1)
        amount!: number
}

interface IProps {
    isVisible: boolean;
    toggleVisibility: any;
    receiverId?: string;
    orderAmount?: number;
    btnAction?: string;
    placeOrder?: () => any
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
    const [amount, setAmount] = useState<number | undefined>((btnAction === BUTTON_ACTION.PLACE_ORDER) ? orderAmount! : undefined)
    const [paymentOption, setPaymentOption] = useState<string>(PAYMENT_OPTIONS.PAY_LATER)
    const [isSuccess, setIsSuccess] = useState(false)
    const [note, setNote] = useState('')

    const [customAmount, setCustomAmount] = useState<number | undefined>(amount)
    const [isValidAmount, setIsValidAmount] = useState<boolean>(true)

    const parsedcustomAmount = parseInt(`${customAmount}`, 10) ? parseInt(`${customAmount}`, 10) : 0

    const onValidate = (action: string, value: number, handle: () => void) => {

        const post = new PostAmount()
        post.amount = Number(value)

        validate(post).then((errors) => {
            if (errors.length > 0) {
                if (btnAction === BUTTON_ACTION.PLACE_ORDER && paymentOption === PAYMENT_OPTIONS.PAY_LATER) {
                    console.log('validation ignored')
                    setIsValidAmount(true)
                    handle()
                }
                else {
                    console.log('validation failed. errors: ', errors)
                    setIsValidAmount(false)
                }
            }
            else {
                setIsValidAmount(true)
                console.log('validation succeed')
                if (action === 'submit') {
                    handle()
                }
            }
        })
    }

    function getNoteText(order: any) {
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
            createPayment(token!, {
                amount: (btnAction === BUTTON_ACTION.PLACE_ORDER && paymentOption !== PAYMENT_OPTIONS.FULL_PAYMENT) ? parsedcustomAmount! : amount!,
                note: order ? getNoteText(order) : note,
                method,
                status: paymentStatus.SUCCESS,
                receiverId: user?.organizationId!,
                senderOrgId: receiverId!,
            })
                .then(() => {
                    setIsSuccess(true)
                    if (btnAction === BUTTON_ACTION.PLACE_ORDER) {
                        navigate(`/chat/${localStorage?.getItem('inboxId')}`)
                    }
                })
                .catch(() => {
                    // TODO feedback for error
                })
        }
        else {
            navigate(`/chat/${localStorage?.getItem('inboxId')}`)
        }
    }

    //.....Confirm Order Button Action
    function onConfirmOrder() {
        hapticFeedback()
        let validateAmount = 0
        if (btnAction === BUTTON_ACTION.PLACE_ORDER) {
            switch (paymentOption) {
                case PAYMENT_OPTIONS.FULL_PAYMENT:
                    validateAmount = amount!
                    break
                case PAYMENT_OPTIONS.PARTIAL_PAYMENT:
                    validateAmount = parsedcustomAmount!
                    break
                case PAYMENT_OPTIONS.PAY_LATER:
                    validateAmount = parsedcustomAmount!
                    break
                default:
                    validateAmount = 0
                    break
            }
        }
        else {
            validateAmount = amount!
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
                } overflow-auto bg-gray-900 h-screen w-screen opacity-50 flex transition animate__animated animate__faster`}
            />
            <div
                className={`popup ${isVisible ? 'show' : ''
                }
                
                 animate__animated animate__fadeInUpBig animate__faster bg-white dark:bg-gray-700`}
            >
                {isSuccess ? (
                    <Success
                        text="Successfully updated the payment"
                        toggleVisibility={() => toggleVisibility(false)}
                    />
                ) : (
                    <>
                        <h2 className="text-left p-2 pl-0 text-2xl mt-2 text-gray-700 dark:text-gray-200">
                            {btnAction === BUTTON_ACTION.PLACE_ORDER
                                ? 'Payment Details'
                                : 'Add Payment you recieved.'}
                        </h2>

                        {btnAction === BUTTON_ACTION.PLACE_ORDER ? (
                            <>
                                <div className='text-left dark:text-gray-200 pl-0 mt-6 mb-4'>
                                    <span className="font-semibold">
                                        <span className="text-gray-500 pr-3 text-xl dark:text-gray-200">Order Total:</span>  <span className="font-bold">₹{orderAmount}</span>
                                    </span>
                                </div>

                                {/* ------- pay later button ---------*/}

                                <div
                                    className={
                                        `p-2 mt-4 text-left ${(paymentOption === PAYMENT_OPTIONS.PAY_LATER)
                                            ? 'border-2 rounded-lg border-blue-600  dark:border-blue-400'
                                            : 'border-2 rounded-lg border-gray-200 dark:border-gray-600'}
            
    `}
                                    onClick={() => setPaymentOption(PAYMENT_OPTIONS.PAY_LATER)}
                                >
                                    <label className="inline-flex font-bold mt-2 mb-2 ml-4">
                                        <span className={` ${paymentOption === PAYMENT_OPTIONS.PAY_LATER ? 'text-blue-700 dark:text-blue-300' :  'text-gray-700 dark:text-gray-300'}`}> Pay Later</span>
                                    </label>
                                </div>

                                <div
                                    className={
                                        `p-2 mt-4 text-left ${paymentOption === PAYMENT_OPTIONS.FULL_PAYMENT
                                            ? 'border-2 rounded-lg border-blue-600  dark:border-blue-400'
                                            : 'border-2 rounded-lg border-gray-200 dark:border-gray-600'}
                                            
                                    `}
                                    onClick={() => setPaymentOption(PAYMENT_OPTIONS.FULL_PAYMENT)}
                                >
                                    <label className="inline-flex  font-bold mt-2 mb-2 ml-4">
                                        <span className={` ${paymentOption === PAYMENT_OPTIONS.FULL_PAYMENT ? 'text-blue-700 dark:text-blue-300' :  'text-gray-700 dark:text-gray-300'}`}> Full Payment</span>
                                    </label>
                                </div>

                                <div
                                    className={
                                        `p-2 pb-4 mt-4 text-left ${!(paymentOption === PAYMENT_OPTIONS.PARTIAL_PAYMENT)
                                            ? ' border-2 rounded-lg  border-gray-300  dark:border-gray-600'
                                            : 'border-2 rounded-lg border-blue-600  dark:border-blue-400'}
                                    `}
                                    onClick={() => setPaymentOption(PAYMENT_OPTIONS.PARTIAL_PAYMENT)}
                                >
                                    <label className="inline-flex mt-2 font-bold ml-4">
                                        <span className={` ${paymentOption === PAYMENT_OPTIONS.PARTIAL_PAYMENT ? 'text-blue-700 dark:text-blue-300' :  'text-gray-700 dark:text-gray-300'}`}> Partial Payment</span>
                                    </label>{' '}
                                    <br />
                                    {(paymentOption === PAYMENT_OPTIONS.PARTIAL_PAYMENT) && (<>
                                        <label className="mt-5 place-self-center">
                                            <div className="ml-4 mt-4 text-gray-700 mr-5 self-center dark:text-gray-300"> Amount:</div>

                                            <input
                                                value={customAmount}
                                                onChange={(event) => {
                                                    setCustomAmount(event?.target.value as any)
                                                    onValidate(
                                                        'change',
                                                        event?.target.value as any, () => console.log('data')
                                                    )
                                                }}
                                                className="p-4 m-2 w-auto text-base text-black transition duration-500 ease-in-out transform 
                                                border-transparent rounded-lg bg-gray-200 opacity-75 
                                                focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 
                                                dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
                                                inputMode="numeric"
                                                type="number"
                                            />

                                        </label>

                                        <span
                                            className={
                                                `flex items-center font-medium tracking-wide text-red-500 dark:text-red-400 text-xs mt-1 ml-1 pl-2 ${isValidAmount ? 'hidden' : ''}`
                                            }
                                        >
                                            Please enter a valid amount !
                                        </span>

                                    </>



                                    )}
                                </div>




                                <div className='text-left text-gray-500 italic dark:text-gray-200 pl-2 my-7'>
                                    {orderConfirmText()}
                                </div>
                            </>
                        ) : (
                            <>
                                {/* <!-- Payment Mode Dropdown --> */}
                                <div className="p-2 pl-0">
                                    <span className="float-left mb-2 text-sm text-gray-500 dark:text-gray-300">
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
                                        className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
                                        name="payment"
                                        id="payment"
                                    >
                                        <option value={paymentMethod.CASH}>CASH</option>
                                        <option value={paymentMethod.CHEQUE}>CHEQUE</option>
                                    </select>
                                </div>
                                {/* <!-- Amount --> */}
                                <div className="p-2 pl-0">
                                    <span className="float-left mb-2 text-sm text-gray-500 dark:text-gray-300">
                                        AMOUNT
                                    </span>
                                    <input
                                        value={amount}
                                        onChange={(event) => {
                                            setAmount(
                                                parseFloat(event?.target.value as any) > 0
                                                    ? parseFloat(event?.target.value as any)
                                                    : 0
                                            )
                                            onValidate(
                                                'change',
                                                parseFloat(event?.target.value as any) > 0
                                                    ? parseFloat(event?.target.value as any)
                                                    : 0,
                                                () => {
                                                    console.log('validate')
                                                }
                                            )
                                        }}
                                        className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
                                        inputMode="numeric"
                                        type="number"
                                    />

                                    <span
                                        className={
                                            'flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 ' +
                                            (isValidAmount ? 'hidden' : '')
                                        }
                                    >
                                        Please enter a valid amount !
                                    </span>
                                </div>
                                {/* <!-- Remarks Textarea --> */}
                                <div className="p-2 pl-0">
                                    <span className="float-left mb-2 text-sm text-gray-500 dark:text-gray-300">
                                        REMARKS
                                    </span>
                                    <textarea
                                        value={note}
                                        onChange={(event) => setNote(event.target.value as any)}
                                        className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
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
                                    onConfirmOrder()
                                }}
                                className="save-btn p-3 w-full text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
                            >
                                {btnAction === BUTTON_ACTION.PLACE_ORDER
                                    ? 'Confirm Order'
                                    : 'Save Payment'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}