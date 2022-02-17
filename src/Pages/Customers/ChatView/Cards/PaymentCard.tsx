import React, { useEffect } from 'react'
import { format } from 'date-fns'
import { fetchPaymentById } from '../../../../API/payment.axios'
import { useDispatch, useSelector } from 'react-redux'
import { Organization, selectCredentials } from '../../../Login/credentialsSlice'
import { NavLink  } from 'react-router-dom'
import { setPaymentInfo, ThreadInterface } from 'src/Pages/Customers/ChatView/chatListSlice'
import { useParams } from 'react-router'
import { hapticFeedback } from 'src/utils/vibrate'

export interface paymentObject {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  amount: string;
  note: string;
  method: number;
  status: number;
  initiatedByUserId: string;
  initiatedByOrgId: string;
  senderOrgId?: string
  receiverId?: string
  receiver?: Organization
  senderOrg?: Organization
}

export default function PaymentCard({ className, thread }: { className: string, thread: ThreadInterface }) {
    const { token } = useSelector(selectCredentials)

    const { id } = useParams()

    const payment = thread.payment
    const dispatch = useDispatch()

    useEffect(() => {
        fetchPaymentById({ token, id: thread.meta }).then(result => {
            dispatch(setPaymentInfo({ inboxId: id, threadId: thread?.id, payment: result.data }))
        })
    }, [dispatch, id, payment?.id, thread?.id, thread.meta, token])

    return (
        <div className={`flex ${className} w-full `}>
            <NavLink to={`/chat/${id}/payment/${thread.meta}`} onClick={hapticFeedback} className={`flex flex-col w-11/12  sm:w-10/12 max-w-md gap-1 p-4 bg-white rounded-lg shadow hover:bg-gray-50 border border-yellow-900 border-opacity-50 dark:bg-gray-800 dark:hover:bg-gray-600 ${payment?.amount === undefined ? 'animate-pulse' : ''}`}>
                <div className="p-1 px-4 text-xs bg-yellow-100 text-yellow-900 rounded-full max-w-max">
          Payment
                </div>
                <div className={`text-3xl mt-1 text-gray-700 font-bold dark:text-gray-200 truncate ${payment?.amount === undefined ? 'h-12 bg-gray-200 dark:bg-gray-700 rounded' : ''}`}>{payment?.amount !== undefined ? `₹${parseInt(payment?.amount, 10)}` : null}</div>
                {payment?.note && payment.note?.length > 1 ? <div className="border border-1 border-gray-300 dark:border-gray-600 p-1 px-4 pl-3 mt-2 mb-4 bg-gray-100 dark:bg-gray-700 w-fit text-xs text-gray-700 dark:text-gray-300 rounded break-all line-clamp-2 ">{payment?.note}</div> : ''}
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
                        <p className="text-xs text-gray-500 dark:text-gray-300">Completed</p>
                    </div>
                    {/* col-2 */}
                    <div className="flex justify-left w-7/12 gap-1">
                        <p className="text-xs text-gray-500 dark:text-gray-300">● {format(
                            new Date(thread.updatedAt),
                            'do MMM'
                        )}</p>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}