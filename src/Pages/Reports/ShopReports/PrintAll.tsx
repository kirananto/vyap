import React from 'react'
import format from 'date-fns/format'
import { FormattedMessage } from 'react-intl'
import { selectCredentials } from '../../Login/credentialsSlice'
import { useSelector } from 'react-redux'

import ReactToPrint from 'react-to-print'
import type { orderInterface } from 'src/Pages/Customers/ChatView/Cards/OrderCard'
import VyapLogo from 'src/Components/VyapLogo'
import QRCode from 'qrcode.react'
import Button from 'src/Components/Style/Button'
import OrderContainerDetail from './OrderItemsDetails'
import ReturnStatusTile from 'src/Pages/Orders/OrderStatusTag'


interface IProps {
    apiData: orderInterface[];
}

let txnCount: number
let today : string

export const PrintAll = ({ apiData }: IProps) => {
    const { user } = useSelector(selectCredentials)
    const componentRef = React.useRef<HTMLDivElement>(null)


    const reactToPrintTrigger = React.useCallback(() => {
        return (
            <Button className="flex print:hidden justify-center gap-1 items-center w-2/4 h-10 text-sm">
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
                    <FormattedMessage id="action.printAll" defaultMessage="Print All" />
                </>
            </Button>
        )
    }, [])

    const orders = apiData.map((item) => {
        txnCount = apiData.length
        today = item.createdAt  ? format(new Date(item.createdAt), 'dd/MM/yyyy')
            : ''
        return {
            ORDER_ID: '#' + item?.id?.split('-')[0],
            DATE: item.createdAt
                ? format(new Date(item.createdAt), 'dd/MM/yyyy')
                : '',
            SUPPLIER: item?.supplier?.name,
            BUYER: item?.buyer?.name,
            AMOUNT: (
                parseFloat(item?.totalAmount) - parseFloat(item?.flatDiscount)
            ).toLocaleString('en-IN'),
        }
    })

    return (
        <>
            <ReactToPrint
                content={() => componentRef.current}
                documentTitle={`Vyap - Orders Today`}
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
                <div className="grid grid-cols-5 gap-4 m-2 border-b-2 border-grey-200 py-4 px-5">
                    <div className="col-start-1 col-span-1  -space-y-3 align-middle">
                        <VyapLogo />
                        <p className="text-2xl font-bold text-slate-700 "> vyap </p>
                    </div>

                    <div className="col-start-2 col-span-3 space-y-3 flex flex-col align-middle">
                        <h2 className="text-2xl font-bold text-slate-600">
                            {' '}
                                Shopwise Order Report (Today)
                        </h2>
                        <p className="text-slate-500 font-bold">{today}</p>
                    </div>

                    <div className="col-end-7 col-span-1 justify-end flex flex-row align-middle border border-slate-200 p-3">
                        <div className="flex flex-col">
                            <p className="text-xl font-bold text-slate-600">
                                {' '}
                                {user?.organization?.name}{' '}
                            </p>
                            <p className="text-slate-500">{txnCount} Orders</p>
                        </div>
                    </div>
                </div>


                <div
                    className="bg-white pb-24 dark:bg-slate-800 rounded p-4 max-h-[80vh] overflow-y-scroll"
                >
                    {apiData.map((item, index) => (
                        <div
                            className={`${index === orders.length - 1 ? '' : 'border-b border-slate-300 dark:border-slate-700'
                            }`}
                            key={`${item.id}`}
                        >
                            <div className="flex flex-row mt-2 mb-3">
                                <div>
                                    <div className="item w-4  flex-grow-0 mr-2">
                                        <input
                                            className="cursor-pointer rounded border-slate-300 text-blue-800"
                                            type="checkbox"
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="grid grid-rows-3 content-start">
                                        <div className="grid grid-flow-col  gap-1 row-span-3">

                                            <div className="text-slate-500 mt-1 text-xs dark:text-slate-300">
                                                {item.createdAt
                                                    ? format(new Date(item.createdAt), 'do MMM yyyy')
                                                    : ''}
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-slate-600 text-sm md:text-md font-semibold dark:text-slate-200  mb-1">
                                            {item?.buyer?.name}

                                            <div className="text-slate-600  text-sm md:text-lg font-extrabold dark:text-slate-200">
                                                {' '}
                                                {(
                                                    parseFloat(item?.totalAmount) -
                                                    parseFloat(item?.flatDiscount)
                                                ).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                            </div>
                                        </div>
                                        <div className="grid grid-flow-col">
                                            <div className="col-start-1 w-max  items-center mt-1">
                                                <ReturnStatusTile status={item?.orderStatus?.[0]?.status} />
                                            </div>

                                            <div className="text-center col-end-12 self-center text-slate-600 dark:text-slate-200 text-lg font-extrabold">
                                            
                                                <div className="text-slate-400 text-xs font-extrabold mx-auto dark:text-slate-300">
                                                ({item?.numberOfItems} {item?.numberOfItems > 1 ? 'items' : 'item'})
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <OrderContainerDetail order={item} />

                        </div>
                    ))}
                </div>

                <div className="flex flex-row flex-wrap justify-end pt-1 mt-6 pt-2 px-5 border-t border-zinc-200">
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
                        <QRCode  size={100} className="mt-2" value="https://play.google.com/store/apps/details?id=app.vyap.app.twa" />
                    </div>
                </div>
            </div>
        </>
    )
}