import format from 'date-fns/format'
import React, { useState } from 'react'
import { paymentMethod } from 'src/API/enum'
import Spinner from 'src/Components/Style/Spinner'
import ModalViewer from 'src/Components/Style/ModalViewer'
import { FormattedMessage } from 'react-intl'
import ReactToPrint from 'react-to-print'
import { useSelector } from 'react-redux'
import { selectCredentials } from '../Login/credentialsSlice'

interface IProps {
  payments: any[];
  loading: boolean;
}

export default function PaymentContainer({ payments, loading }: IProps) {
    const { user, token } = useSelector(selectCredentials)
    const [paymentSummaryOpen, setPaymentSummaryOpen] = useState<boolean>(false)
    const [itemClicked, setItemClicked] = useState()
    const componentRef = React.useRef<HTMLDivElement>(null)

    const reactToPrintContent = React.useCallback(() => {
        return componentRef.current
    }, [componentRef.current])

    const reactToPrintTrigger = React.useCallback(() => {
        return (
            <button className="flex h-10 w-2/4 items-center justify-center gap-1 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 font-bold text-white">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                </svg>
                <FormattedMessage id="action.print" defaultMessage="Print" />
            </button>
        )
    }, [])

    const openPaymentSummary = (item: any) => {
        setPaymentSummaryOpen(true)
        setItemClicked(item)
    }

    function paymentSummary() {
        const item: any = itemClicked
        return (
            <>
                <div
                    ref={componentRef}
                    className="m-3 mt-6 rounded border border-gray-300 p-3 dark:border-gray-500"
                >
                    <h1 className="dark:text-white"> Payment Summary:</h1>
                    {item ? (
                        <div className={`mt-2 flex w-full justify-between pb-2`}>
                            <div className="flex gap-2">
                                <div className="flex flex-col">
                                    <div className="text-gray-500 dark:text-gray-300">

                                        {item.createdAt
                                            ? format(new Date(item.createdAt), 'do MMM yyyy')
                                            : ''}
                                    </div>
                                    <div className="my-1 text-gray-600 dark:text-gray-200">
                                        {user?.organizationId === item?.senderOrgId
                                            ? item.receiver?.name
                                            : item.senderOrg?.name}
                                    </div>
                                    <div className="flex w-max items-center rounded bg-green-200 px-2 text-sm font-bold text-green-800">
                                        {paymentMethod[item.method]}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-lg font-extrabold text-gray-600 dark:text-gray-200">
                  ₹ {item.amount}
                                </div>
                            </div>
                        </div>
                    ) : (
                        ' Something went wrong..!'
                    )}
                </div>

                <div className="mx-3 mt-2 mb-8 flex justify-between space-x-3">
                    <ReactToPrint
                        content={reactToPrintContent}
                        documentTitle={`Vyap All Orders`}
                        // onAfterPrint={handleAfterPrint}
                        // onBeforeGetContent={handleOnBeforeGetContent}
                        // onBeforePrint={handleBeforePrint}
                        removeAfterPrint
                        trigger={reactToPrintTrigger}
                    />
                    <button
                        onClick={() => setPaymentSummaryOpen(false)}
                        className="flex h-10 w-2/4 items-center justify-center gap-1 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 font-bold text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        <FormattedMessage id="action.close" defaultMessage="Close" />
                    </button>
                </div>
            </>
        )
    }

    if (loading) {
        return (
            <div className="mt-12 grid p-12 text-center dark:text-gray-100">
                <Spinner />
                <div className="mt-4">Loading...</div>
            </div>
        )
    }
    return (
        <>
            {payments.map((item, index) => (
                <div
                    className={`${index === payments.length - 1 ? '' : 'border-b border-gray-300'
                    }`}
                    key={`${index}`}
                >
                    <div className="mt-2 mb-3 flex flex-row">
                        <div className="">
                            <div className="item mr-2  w-4 flex-grow-0">
                                <input
                                    className="cursor-pointer rounded border-gray-300 text-blue-800"
                                    type="checkbox"
                                />
                            </div>
                        </div>

                        <div className="w-full" onClick={() => openPaymentSummary(item)}>
                            <div className="grid grid-rows-3 content-start">
                                <div className="row-span-3 grid auto-cols-max grid-flow-col gap-1">
                                    <div className="text-gray-500 dark:text-gray-300">
                    #{item?.id?.split('-')[0]} •
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-300">
                                        {item.createdAt
                                            ? format(new Date(item.createdAt), 'do MMM yyyy')
                                            : ''}
                                    </div>
                                </div>

                                <div className="m-auto flex w-full justify-between">
                                    <div className="basis-7/12 text-gray-600 dark:text-gray-200">
                                        {user?.organizationId === item?.senderOrgId
                                            ? item.receiver?.name
                                            : item.senderOrg?.name}
                                    </div>
                                    <div className="flex basis-5/12 justify-end self-center text-lg font-extrabold text-gray-600 dark:text-gray-200">
                    ₹ {item.amount}
                                    </div>
                                </div>

                                <div className=" w-max items-center rounded bg-green-200 px-2 text-sm font-bold text-green-800">
                                    {paymentMethod[item.method]}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <ModalViewer
                body={itemClicked ? paymentSummary() : null}
                isOpen={paymentSummaryOpen!}
                onClose={() => setPaymentSummaryOpen(false)}
            />
        </>
    )
}