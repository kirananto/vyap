import React from 'react'
import format from 'date-fns/format'
import { FormattedMessage } from 'react-intl'
import vyapLogo from 'src/assets/new_logo.svg'
import { selectCredentials } from '../../Login/credentialsSlice'
import { useSelector } from 'react-redux'
import ReactToPrint from 'react-to-print'
import type { IFetchAllPaymentsDataEntity } from 'src/types/fetchAllPayments'

interface IProps {
  apiData?: IFetchAllPaymentsDataEntity[];
}

interface IPaymentsProps {
    DATE: string
    BUYER: string
    SELLER: string
    DEBIT: string
}

let txnCount: number

export const PrintAll = ({ apiData }: IProps) => {
    const componentRef = React.useRef(null)
    const { user } = useSelector(selectCredentials)

    const payments: IPaymentsProps[] | undefined = apiData?.map((item) => {
        const credit: boolean = user?.organization?.name === item.receiver?.name
        txnCount = apiData.length
        return {
            DATE: item.createdAt
                ? format(new Date(item.createdAt), 'dd/MM/yyyy')
                : '',
            BUYER: item.senderOrg?.name,
            SELLER: item.receiver?.name,
            CREDIT: credit ? item.amount : ' ',
            DEBIT: credit ? ' ' : item.amount,
        }
    })

    const reactToPrintTrigger = React.useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

        // Bad: the `onClick` here will be overwritten by `react-to-print`
        // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

        // Good
        return (
            <button
                className="flex justify-center gap-1 items-center w-2/4 h-10 text-sm font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
                // onClick={onPrint}
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
                        strokeWidth={2}
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                </svg>
                <FormattedMessage id="action.printAll" defaultMessage="Print All" />
            </button>
        )
    }, [])

    return (
        <>
            <ReactToPrint
                content={() => componentRef.current}
                documentTitle={`Vyap All Payments`}
                // onAfterPrint={handleAfterPrint}
                // onBeforeGetContent={handleOnBeforeGetContent}
                // onBeforePrint={handleBeforePrint}
                removeAfterPrint
                trigger={reactToPrintTrigger}
            />
            <div className="hidden">
                <div
                    className="divide-y divide-gray-200  showinprint grid grid-cols-1"
                    id="divContents"
                    ref={componentRef}
                >
                    <div className="grid grid-cols-5 gap-4 m-2 border-b-2 border-grey-200 py-4 px-5">
                        <div className="col-start-1 col-span-1  -space-y-3 align-middle">
                            <img height={48} width={48} className="w-12 h-12" alt="vyap-logo" src={vyapLogo} />
                            <p className="text-2xl font-bold text-gray-700 "> vyap </p>
                        </div>

                        <div className="col-start-2 col-span-3 space-y-3 flex flex-col align-middle">
                            <h2 className="text-2xl font-bold text-gray-600">
                                {' '}
                Payment Statement
                            </h2>
                            <p className="text-gray-300 font-bold">12/02/22 - 01/11/22</p>
                        </div>

                        <div className="col-end-7 col-span-1 justify-end flex flex-row align-middle border border-gray-200 p-3">
                            <img height={48} width={48} className="w-12 h-12" alt="vyap-logo" src={vyapLogo} />
                            <div className="flex flex-col">
                                <p className="text-xl font-bold text-gray-600">
                                    {' '}
                                    {user?.organization?.name}
                                </p>
                                <p className="text-gray-300">{txnCount} Transactions</p>
                            </div>
                        </div>
                    </div>

                    <div className="m-5 mx-10 p-5 border border-gray-200 rounded-md">
                        <table className="min-w-full">
                            <thead className="text-gray-300 font-bold">
                                <tr className="p-5">
                                    <td>Date</td>
                                    <td>Buyer</td>
                                    <td>Seller</td>
                                    <td>Credit</td>
                                    <td>Debit</td>
                                </tr>
                            </thead>
                            <tbody className="text-gray-500">
                                {payments?.map((item, index) => (
                                    <tr key={index} className="text-left">
                                        {Object.values(item).map((val: string) => (
                                            <td key={val} className="px-1 py-2 whitespace-nowrap">
                                                {val}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}