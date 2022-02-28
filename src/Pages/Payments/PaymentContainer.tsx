import format from 'date-fns/format'
import React, { useState } from 'react'
import { paymentMethod } from 'src/API/enum'
import Spinner from 'src/Components/Style/Spinner'
import ModalViewer from 'src/Components/Style/ModalViewer'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { selectCredentials } from '../Login/credentialsSlice'
import type { IFetchAllPaymentsDataEntity } from 'src/types/fetchAllPayments'
import ChatImg from '../Product/assets/no_data.svg'
import Lozenge from 'src/Components/Lozenge'
import { PrintOne } from './Options/PrintOne'
import Button from 'src/Components/Style/Button'

interface IProps {
    payments?: IFetchAllPaymentsDataEntity[];
    loading: boolean;
}

export default function PaymentContainer({ payments, loading }: IProps) {
    const { user } = useSelector(selectCredentials)
    const [paymentSummaryOpen, setPaymentSummaryOpen] = useState<boolean>(false)
    const [itemClicked, setItemClicked] = useState<IFetchAllPaymentsDataEntity>()

    const openPaymentSummary = (item: IFetchAllPaymentsDataEntity) => {
        setPaymentSummaryOpen(true)
        setItemClicked(item)
    }

    function paymentSummary() {
        const item: IFetchAllPaymentsDataEntity | undefined = itemClicked
        return (
            <>
                <div
                    className="m-3 mt-6 rounded border border-slate-300 p-3 dark:border-slate-500"
                >
                    <h1 className="dark:text-white"> Payment Summary</h1>
                    {item ? (
                        <div className={`mt-2 flex w-full justify-between pb-2`}>
                            <div className="flex gap-2">
                                <div className="flex flex-col">
                                    <div className="text-xs text-slate-500 dark:text-slate-300">
                                        #{item?.id?.split('-')[0]} •{' '}
                                        {item.createdAt
                                            ? format(new Date(item.createdAt), 'do MMM yyyy')
                                            : ''}
                                    </div>
                                    <div className="my-1 font-semibold text-slate-600 dark:text-slate-200">
                                        {user?.organizationId === item?.senderOrgId
                                            ? item.receiver?.name
                                            : item.senderOrg?.name}
                                    </div>
                                    <div className="flex w-max items-center print:border print:border-1 print:border-green-800 rounded bg-green-200 px-2 text-sm font-bold text-green-800">
                                        {paymentMethod[item.method]}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-lg font-extrabold text-slate-600 dark:text-slate-200">
                                    ₹ {item.amount}
                                </div>
                            </div>
                        </div>
                    ) : (
                        ' Something went wrong..!'
                    )}
                </div>

                <div className="mx-3 mt-2 mb-16 flex justify-between space-x-3">
                    <PrintOne item={item}/>
                    <Button
                        onClick={() => setPaymentSummaryOpen(false)}
                        className="flex w-2/4 items-center justify-center gap-1"
                    >
                        <>
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
                        </>
                    </Button>
                </div>
            </>
        )
    }

    if (loading) {
        return (
            <div className="mt-12 grid p-12 text-center dark:text-slate-100">
                <Spinner />
            </div>
        )
    }

    if (payments?.length === 0) {
        return <div>
            <img className="m-auto mt-12 h-64 p-12" src={ChatImg} />
            <div className="m-auto w-2/3 px-6 text-center dark:text-slate-200">
                {' '}
                You don{`'`}t have any transactions. Please do some transactions and visit here later.{' '}
            </div>
        </div>
    }

    return (
        <>
            {payments?.map((item, index) => (
                <div
                    className={`${index === payments.length - 1 ? '' : 'border-b border-slate-200 dark:border-slate-700'}`}
                    key={`${index}`}
                >
                    <div className="mt-2 mb-3 flex flex-row">
                        <div className="">
                            <div className="item mr-2  w-4 flex-grow-0">
                                <input
                                    className="cursor-pointer rounded border-slate-300 text-blue-800"
                                    type="checkbox"
                                />
                            </div>
                        </div>

                        <div className="w-full" onClick={() => openPaymentSummary(item)}>
                            <div className="grid grid-rows-3 content-start">
                                <div className="row-span-3 grid auto-cols-max grid-flow-col gap-1">

                                </div>
                                <div className="text-slate-500 mt-1 text-xs dark:text-slate-300">
                                    {item.createdAt
                                        ? format(new Date(item.createdAt), 'do MMM yyyy')
                                        : ''}
                                </div>
                                <div className="m-auto flex w-full justify-between">
                                    
                                    <div className="basis-7/12 text-sm md:text-md text-slate-600 font-semibold  dark:text-slate-200">
                                        {user?.organizationId === item?.senderOrgId
                                            ? item.receiver?.name
                                            : item.senderOrg?.name}
                                    </div>
                                    <div className="flex basis-5/12 justify-end self-center text-sm md:text-lg font-extrabold text-slate-600 dark:text-slate-200">
                                        {parseFloat(item.amount)?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                    </div>
                                </div>
                                <div className="flex gap-1 mt-2">
                                    <Lozenge content={paymentMethod[item.method]} square={true} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <ModalViewer
                body={itemClicked ? paymentSummary() : null}
                isOpen={!!paymentSummaryOpen}
                onClose={() => setPaymentSummaryOpen(false)}
            />
        </>
    )
}