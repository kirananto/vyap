import { isNumber } from 'class-validator'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ToggleButton from '../../../../Components/ToggleButton'
import {
    selectAddProductInfo,
    setGstPercentage,
    setMrpPrice,
    setSalesPrice,
    setTaxEnabled
} from '../redux/addProductSlice'
import HSNmodal from './HSNmodal'
import { PAGE_ACTION } from './types'
import { isValidGST, isValidHSN, isValidMRP, isValidSalePrice } from './validations'


interface Props {
  action?: PAGE_ACTION
  saveAttempt: number
}

function PricingTab({ action, saveAttempt }: Props) {
    const [modal, setModal] = useState(false)
    const addProductInfo = useSelector(selectAddProductInfo)

    const dispatch = useDispatch()

    const handleModal = () => {
        setModal(true)
    }

    const handleGstPercentage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const tempVal = Number(event.target.value)
        if (tempVal <= 100) {
            dispatch(setGstPercentage(tempVal))
        }
    }

    const resetSalesToZero = () => dispatch(setSalesPrice(parseInt(`${addProductInfo.pricing?.salesPrice ?? 0}`, 10) ?? 0))

    const resetMRPToZero = () => dispatch(setMrpPrice(parseInt(`${addProductInfo.pricing?.mrpPrice ?? 0}`, 10) ?? 0 ))

    useEffect(() => {
        if (saveAttempt) {
            resetSalesToZero()
            resetMRPToZero()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saveAttempt])

    return (
        <div
            className="flex flex-col gap-5 mt-2 pb-24 overflow-auto"
            style={{ height: 'calc(100vh - 22rem)' }}
        >

            {/* MRP Price */}

            <div>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-300">MRP</p>
                <input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch(setMrpPrice(Number(event.target.value)))
                    }}
                    onBlur={resetMRPToZero}
                    value={addProductInfo.pricing?.mrpPrice}
                    type="number"
                    min="0"
                    placeholder="Enter price"
                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-100 border border-transparent border-slate-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                />

                <span
                    className={
                        'flex items-center font-medium tracking-wide text-rose-500 text-xs mt-1 ml-1 ' +
            (addProductInfo.pricing?.mrpPrice === undefined || isValidMRP(addProductInfo.pricing?.mrpPrice) ? 'hidden' : '')
                    }
                >
          * Enter Valid MRP price !
                </span>
            </div>

            {/* Sale Price */}

            <div>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-300">Sales Price</p>
                <input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch(setSalesPrice(Number(event.target.value)))
                    }}
                    onBlur={resetSalesToZero}
                    value={addProductInfo.pricing?.salesPrice}
                    type="number"
                    min="0"
                    placeholder="Enter price"
                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-100 border border-transparent border-slate-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                />
                <span
                    className={
                        'flex items-center font-medium tracking-wide text-rose-500 text-xs mt-1 ml-1 ' +
            (addProductInfo.pricing?.salesPrice === undefined || isValidSalePrice(addProductInfo.pricing?.salesPrice) ? 'hidden' : '')
                    }
                >
          * Enter valid Sales price !
                </span>
            </div>

            {/* Tax-info */}

            {action === PAGE_ACTION.ADD &&
        <div className="mt-2">
            <div className="text-sm font-bold text-slate-500 dark:text-slate-300">Tax Info</div>
            <ToggleButton
                className="mt-4"
                onChange={() => {
                    dispatch(setTaxEnabled(!addProductInfo.pricing?.taxEnabled))
                }}
                value={addProductInfo.pricing?.taxEnabled}
            />
        </div>
            }

            {/* ---------- */}
            {!addProductInfo?.centralCatalogue?.id &&
        addProductInfo.pricing?.taxEnabled && (
                <div>
                    {/* HSN section */}
                    <div>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-300">HSN Number</p>
                        <div className="des-modal-btn">
                            <div className="w-full h-10 px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-100 border border-transparent border-slate-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600">
                                {addProductInfo.pricing?.hsn?.hsn}
                            </div>

                            {/* Modal handle btn */}
                            <button
                                className="modal-btn dark:text-slate-300 -mt-2"
                                onClick={handleModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            {/* Modal */}

                            <span
                                className={
                                    'flex items-center font-medium tracking-wide text-rose-500 text-xs mt-1 ml-1 ' +
                    (isValidHSN(addProductInfo.pricing?.taxEnabled, !!addProductInfo?.centralCatalogue?.id, addProductInfo.pricing?.hsn?.hsn) ? 'hidden' : '')
                                }
                            >
                  * Enter valid HSN !
                            </span>
                            <div>
                                <HSNmodal trigger={modal} setModal={setModal} />
                            </div>
                        </div>
                    </div>
                    {/* GST section */}
                    <div>
                        <p className="mt-4 text-sm font-bold text-slate-500 dark:text-slate-300">GST Percentage</p>
                        <div className="flex">
                            <input
                                onChange={handleGstPercentage}
                                onBlur={() => isNumber(addProductInfo.pricing?.hsn?.gstPercentage ??
                    addProductInfo.pricing?.gstPercentage) ? null : dispatch(setGstPercentage(0))}

                                value={
                                    addProductInfo.pricing?.hsn?.gstPercentage ??
                    addProductInfo.pricing?.gstPercentage
                                }
                                type="number"
                                max={100}
                                min={0}
                                className="w-3/12 px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-100 border border-transparent border-slate-200 rounded-lg rounded-tr-none rounded-br-none opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                            />
                            <div className="flex items-center justify-center w-1/12 px-5 mt-2 font-bold text-blue-500 bg-blue-200 rounded-lg rounded-tl-none rounded-bl-none">
                  %
                            </div>
                            <span
                                className={
                                    'flex items-center font-medium tracking-wide text-rose-500 text-xs mt-1 ml-1 ' +
                    (isValidGST(addProductInfo.pricing?.taxEnabled, !!addProductInfo?.centralCatalogue?.id, addProductInfo.pricing?.hsn?.gstPercentage ??
                      addProductInfo.pricing?.gstPercentage) ? 'hidden' : '')
                                }
                            >
                  * Enter valid GST !
                            </span>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default PricingTab