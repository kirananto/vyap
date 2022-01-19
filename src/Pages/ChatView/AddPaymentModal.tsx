import { paymentMethod, paymentStatus } from '../../API/enum'
import React, { useState } from 'react'
import { createPayment } from 'src/API/payment.axios'
import { useSelector } from 'react-redux'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import Success from '../Home/AddCustomerModal/Success'
import { Min, validate } from 'class-validator'
import { hapticFeedback } from 'src/utils/vibrate'
import { BUTTON_ACTION } from './PlaceOrder/types'

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
  placeOrder?: () => void
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
    const [method, setMethod] = useState<paymentMethod>(paymentMethod.CASH)
    const [amount, setAmount] = useState<number | undefined>((btnAction === BUTTON_ACTION.PLACE_ORDER ) ? orderAmount! : undefined)

    const [isSuccess, setIsSuccess] = useState(false)
    const [note, setNote] = useState('')

    const [isFullPay, setIsFullPay] = useState<boolean>(true)
    const [customAmount, setCustomAmount] = useState<number | undefined>(undefined)

    const [isValidAmount, setIsValidAmount] = useState<boolean>(true)

    const onValidate = (action: string, value: number, handle: () => void) => {
     
        const post = new PostAmount()
        post.amount = Number(value)

        validate(post).then((errors) => {
            if (errors.length > 0) {
                console.log('validation failed. errors: ', errors)
                setIsValidAmount(false)
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

    const handleSubmit = () => {
    // DO validations before making API call
        createPayment(token!, {
            amount: (btnAction === BUTTON_ACTION.PLACE_ORDER && !isFullPay) ? customAmount! : amount!,
            note,
            method,
            status: paymentStatus.SUCCESS,
            receiverId: user?.organizationId!,
            senderOrgId: receiverId!,
        })
            .then(() => {
                setIsSuccess(true)
                if(btnAction === BUTTON_ACTION.PLACE_ORDER){
                    placeOrder && placeOrder()
                }
            })
            .catch(() => {
                // Do feedback for error
            })
    }

    return (
        <div>
            <div
                onClick={() => {
                    hapticFeedback()
                    toggleVisibility(false)
                }}
                className={`fixed pin top-0 z-10 ${
                    isVisible ? 'show' : 'hidden'
                } overflow-auto bg-gray-900 h-screen w-screen opacity-50 flex transition animate__animated animate__faster`}
            />
            <div
                className={`popup ${
                    isVisible ? 'show' : ''
                }
                ${
        btnAction === BUTTON_ACTION.PLACE_ORDER ? 'mb-[-200px]' : ''
        }
                 animate__animated animate__fadeInUpBig animate__faster bg-white dark:bg-gray-700`}
            >
                {isSuccess ? (
                    <Success
                        text="successfully created payment record"
                        toggleVisibility={() => toggleVisibility(false)}
                    />
                ) : (
                    <>
                        <h2 className="text-left p-2 text-2xl mt-2 text-gray-700 dark:text-gray-200">
                            {btnAction === BUTTON_ACTION.PLACE_ORDER
                                ? 'Payment Details'
                                : 'Add Payment you recieved.'}
                        </h2>

                        {btnAction === BUTTON_ACTION.PLACE_ORDER ? (
                            <>
                                <div className='text-left pl-3 my-5'>
                                    <span className="font-bold">
                                        <span className="pr-3">Order Total:</span>  ₹ {orderAmount}
                                    </span>
                                </div>

                                <div
                                    className={
                                        `p-2 mt-4 ${isFullPay
                                            ? 'border-2 rounded-lg border-blue-600  dark:border-gray-700'
                                            : 'border-2 rounded-lg border-gray-200 dark:border-gray-700'}
                                            
                                    `}
                                    onClick={() => setIsFullPay(true)}
                                >
                                    <label className="inline-flex items-center mt-3 mb-2">
                                        <input
                                            type="radio"
                                            className="form-radio h-5 w-5 text-orange-600"
                                            defaultChecked={isFullPay}
                                        />
                                        <span className="ml-2 text-gray-700"> Full Payment</span>
                                    </label>
                                </div> 

                                <div
                                    className={
                                        `p-2 pb-4 mt-4 ${isFullPay
                                            ? ' border-2 rounded-lg  border-gray-300  dark:border-gray-700'
                                            : 'border-2 rounded-lg border-blue-600  dark:border-gray-700'}
                                    `}
                                    onClick={() => setIsFullPay(false)}
                                >
                                    <label className="inline-flex items-center mt-3">
                                        <input
                                            type="radio"
                                            className="form-radio h-5 w-5 text-orange-600"
                                            defaultChecked={!isFullPay}
                                        />
                                        <span className="ml-2 text-gray-700"> Partial Payment</span>
                                    </label>{' '}
                                    <br />
                                    {!isFullPay && (<>
                                        <label className="flex mt-5 place-self-center">
                                            <span className="ml-2 text-gray-700 mr-5 self-center"> Amount:</span>
                                            
                                            <input
                                                value={customAmount}
                                                onChange={(event) => {
                                                    setCustomAmount(
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
                                                className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform 
                                                border-transparent rounded-lg bg-gray-200 opacity-75 
                                                focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 
                                                dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
                                                inputMode="numeric"
                                                type="number"
                                            />
                                           
                                        </label>

                                        <span
                                            className={
                                                `flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 pl-24 ${isValidAmount ? 'hidden' : ''}`
                                            }
                                        >
Please enter a valid amount !
                                        </span>
                                        
                                    </>


                                        
                                    )}
                                </div>

                                <div className='text-left pl-3 my-7'>
                                    <span className="font-bold">
                                        <span className="">Confirm Place Order by receiving </span>{isFullPay ? 'the full payment of ₹'+orderAmount : 'a partial payment of ₹'+customAmount}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* <!-- Payment Mode Dropdown --> */}
                                <div className="p-2">
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
                                <div className="p-2">
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
                                <div className="p-2">
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
                                    hapticFeedback()
                                    onValidate('submit', Number(((btnAction === BUTTON_ACTION.PLACE_ORDER && !isFullPay ) ? customAmount! : amount!)), handleSubmit)
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