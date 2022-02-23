import React from 'react'
import format from 'date-fns/format'
import { FormattedMessage } from 'react-intl'
import { selectCredentials } from '../../Login/credentialsSlice'
import { useSelector } from 'react-redux'
import ReactToPrint from 'react-to-print'
import type { IFetchAllPaymentsDataEntity } from 'src/types/fetchAllPayments'
import VyapLogo from 'src/Components/VyapLogo'
import QRCode from 'qrcode.react'
import Button from 'src/Components/Style/Button'
import { paymentMethod } from 'src/API/enum'

interface IProps {
    item?: IFetchAllPaymentsDataEntity;
}

export const PrintOne = ({ item }: IProps) => {
    const componentRef = React.useRef(null)
    const { user } = useSelector(selectCredentials)

    const reactToPrintTrigger = React.useCallback(() => {
        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
        // to the root node of the returned component as it will be overwritten.

        // Bad: the `onClick` here will be overwritten by `react-to-print`
        // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

        // Good
        return (
            <Button
                className="flex print:hidden justify-center gap-1 items-center w-2/4 h-10 text-sm"
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
                            strokeWidth={2}
                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                        />
                    </svg>
                    <FormattedMessage id="action.print" defaultMessage="Print" />
                </>
            </Button>
        )
    }, [])

    return (
        <>
            <ReactToPrint
                content={() => componentRef.current}
                documentTitle={`Vyap - Payment Summary`}
                // onAfterPrint={handleAfterPrint}
                // onBeforeGetContent={handleOnBeforeGetContent}
                // onBeforePrint={handleBeforePrint}
                // removeAfterPrint
                trigger={reactToPrintTrigger}
            />

            <div
                className="divide-y divide-slate-200 hidden print:block grid grid-cols-1 print:absolute w-full top-0"
                id="divContents"
                ref={componentRef}
            >
                    <div className="grid grid-cols-5 gap-1 m-2 border-b-2 border-grey-200 py-4 px-5">
                        <div className="col-start-1 col-span-1  -space-y-3 align-middle">
                            {/* <img height={48} width={48} className="w-12 h-12" alt="vyap-logo" src={vyapLogo} /> */}
                            <VyapLogo />
                            <p className="text-2xl font-bold text-slate-700 "> vyap </p>
                        </div>

                        <div className="col-start-2 col-span-2 align-middle">
                            <h2 className="text-2xl font-bold text-slate-600">
                                Payment Summary
                            </h2>
                        </div>

                    </div>


                    <div>
                    <div className="m-5 mx-10 p-5 border border-slate-200 rounded-md">
                            <h1 className="dark:text-white mb-10"> Payment Details</h1>
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
                                            <div className="my-2 font-semibold text-slate-600 dark:text-slate-200">
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
                    </div>        

                    <div className="flex flex-row flex-wrap justify-end mt-20 pt-2 px-5 border-t border-zinc-200">
                        <div className="item w-1/6 place-self-center">
                            <div className=" -space-y-4 ">
                                <VyapLogo />
                                <p className="text-sm font-bold text-slate-700 ml-4"> vyap </p>
                            </div>
                        </div>
                        <div className="item w-4/6  place-self-center flex justify-center">
                            <p className="text-slate-800 text-sm font-semibold pb-3 pr-3">
                                {' '}
                                Report generated by Vyap &nbsp; | &nbsp; https://vyap.app
                            </p>
                        </div>
                        <div className="item w-1/6 self-center flex justify-end">
                            <QRCode size={100} className="mt-2" value="https://play.google.com/store/apps/details?id=app.vyap.app.twa" />
                        </div>
                    </div>
            </div>
            
        </>
    )
}