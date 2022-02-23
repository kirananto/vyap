import React from 'react'
import { FormattedMessage } from 'react-intl'
import { selectCredentials } from '../../Login/credentialsSlice'
import { useSelector } from 'react-redux'
import ReactToPrint from 'react-to-print'
import type { IOrderItem, orderInterface } from 'src/Pages/Customers/ChatView/Cards/OrderCard'
import VyapLogo from 'src/Components/VyapLogo'
import QRCode from 'qrcode.react'
import Button from 'src/Components/Style/Button'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'

interface IProps {
    orderItems?: IOrderItem[];
    order?: orderInterface;    
}

export const PrintOne = ({  orderItems, order}: IProps) => {
    const componentRef = React.useRef(null)

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
                            <VyapLogo />
                            <p className="text-2xl font-bold text-slate-700 "> vyap </p>
                        </div>

                        <div className="col-start-2 col-span-2 self-center">
                            <h2 className="text-2xl font-bold text-slate-600">
                                Order Summary
                            </h2>
                        </div>
                    </div>

                    <div>
                        <div className="m-5 mx-10 p-5 border border-slate-200 rounded-md">
                                <h2 className="dark:text-slate-300 font-bold  mb-7"> Order items </h2>
                        <div className={`flex w-full justify-between mt-1 pb-2 `}>       
                        </div>
                        {orderItems?.map((item, index) => (
                            <div
                                className={`flex justify-between pb-2 ${
                                    index === orderItems.length - 1
                                        ? 'border-b-2 border-dashed border-slate-300 dark:border-slate-600 mb-2 pb-4'
                                        : ''
                                }`}
                                key={`${index}`}
                            >
                                <div className="flex gap-2">
                                    <div className="flex-none mt-2 text-slate-400 text-xs dark:text-slate-400">{item?.quantity} X </div>
                                    <div
                                        className="flex-none bg-gradient-to-br from-blue-500 to-indigo-900 m-1 rounded-full h-6 w-6"
                                        style={
                                            item?.product?.thumbnailImage
                                                ? {
                                                    backgroundImage: `url(${getImageURL(
                                                        item?.product?.thumbnailImage,
                                                        IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                                                    )}`,
                                                    backgroundSize: 'contain',
                                                }
                                                : {}
                                        }
                                    />
                                    <div className="text-slate-600 pr-4 self-center text-xs font-semibold md:text-md dark:text-slate-200">
                                        {item?.product?.centralCatalogue?.name}
                                        {item?.product?.aliasName
                                            ? `(${item?.product?.aliasName})`
                                            : ''}
                                    </div>

                                </div>
                                <div className="flex text-slate-400 text-xs font-extrabold dark:text-slate-300 self-center">
                                    {parseFloat(item?.purchasePrice).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                </div>
                            </div>
                        ))}
                        {orderItems?.length === 0 && (
                            <div className="mt-2 text-center text-slate-600 dark:text-slate-200 mb-4">
                                {' '}
                        Order items are not available{' '}
                            </div>
                        )}
                        <div className="flex justify-end">
                            <div>
                                <div className="text-slate-600 dark:text-slate-200 text-lg font-extrabold text-right">
                                    <span className="text-sm font-normal">Total:</span> 
                                    {parseFloat(order?.totalAmount ? order?.totalAmount : '0' ).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                </div>
                                <div className="text-slate-600 dark:text-slate-200 text-lg font-extrabold text-right">
                                    <span className="text-sm font-normal">Discount:</span>
                                    {parseFloat(order?.flatDiscount ? order?.flatDiscount : '0').toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                </div>
                                <div className="text-slate-600 dark:text-slate-200 text-lg font-extrabold text-right">
                                    <span className="text-sm font-normal">Final Amount:</span> 
                                    {(
                                        parseFloat(order?.totalAmount ? order?.totalAmount : '0' ) - parseFloat(order?.flatDiscount ? order?.flatDiscount : '0')
                                    ).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                </div>
                            </div>
                        </div>
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