import React from 'react'
import format from 'date-fns/format'
import { FormattedMessage } from 'react-intl'
import { selectCredentials } from '../../Login/credentialsSlice'
import { useSelector } from 'react-redux'

import ReactToPrint from 'react-to-print'
import VyapLogo from 'src/Components/VyapLogo'
import QRCode from 'qrcode.react'
import Button from 'src/Components/Style/Button'
import ProductCard from './ProductCard'

interface IProduct {
    orderID?: string,
    productID?: string;
    productName?: string;
    productImage?: string | null;
    productQty?: number;
    aliasName?: string;
}

interface IProps {
    productData: IProduct[]
}

export const PrintAll = ({ productData }: IProps) => {
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


    return (
        <>
            <ReactToPrint
                content={() => componentRef.current}
                documentTitle={`Vyap - Product Report`}
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

                    <div className="col-start-2 col-span-3  flex flex-col align-middle self-center">
                        <h2 className="text-2xl font-bold text-slate-600">
                                Productwise Report
                        </h2>
                        <p className="text-slate-400 font-bold">{ format(new Date(), 'do MMM yyyy') }</p>
                    </div>

                    <div className="col-end-7 col-span-1 justify-end flex flex-row align-middle border border-slate-200 p-3">
                        <div className="flex flex-col">
                            <p className="text-xl font-bold text-slate-600">
                                {' '}
                                {user?.organization?.name}{' '}
                            </p>
                            <p className="text-slate-500">Today&apos;s  Report</p>
                        </div>
                    </div>
                </div>


                <div
                    className="bg-white pb-24 dark:bg-slate-800 rounded p-4 max-h-[80vh] overflow-y-scroll"
                >
                    <div
                        className="overflow-y-auto bg-white pb-24 dark:bg-slate-800 rounded p-4"
                        
                    > 
                        <div className='flex justify-between mb-1 pb-4 dark:text-slate-200'>
                            <div className="flex basis-10/12 text-lg border-b-[1px] border-slate-100 py-2 px-3">Items Sold</div>
                            <div className="flex text-lg border-b-[1px] border-slate-100 py-2 px-2">Units</div>         
                        </div>

                        {
                            productData?.map?.((item) => {
                                return <ProductCard
                                    key={`${item.productID} ${item.orderID}`}
                                    item={item}
                                />
                            })

                        }
                    
                    </div>
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