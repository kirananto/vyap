import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { IProduct } from 'src/types/product'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'
import { hapticFeedback } from 'src/utils/vibrate'
import { useLongPress } from 'use-long-press'

export default function ProductCard({
    item,
    onClicked,
    onMore,
    isChecked,
    longPresEnabled,
    setLongPressEnabled,
    isScrolling
}: {
    item: IProduct;
    onClicked: (item: IProduct) => void;
    onMore: (item?: IProduct | undefined) => void;
    isChecked: boolean;
    longPresEnabled: boolean;
    setLongPressEnabled: React.Dispatch<React.SetStateAction<boolean>>
    isScrolling: boolean
}) {

    const navigate = useNavigate()
    const callback = useCallback(() => {
        //alert('Long pressed!')
        if (longPresEnabled)
            onClicked(item)
        setLongPressEnabled(false)
    }, [item, onClicked, setLongPressEnabled, longPresEnabled])

    //@ts-ignore
    const bind = useLongPress(!isScrolling ? callback : null, {
        threshold: 300,
        captureEvent: true,
        cancelOnMovement: true,
        detect: 'both'
    })

    const onItemClick = () => {
        if (!longPresEnabled)
            onClicked(item)
        else {
            navigate(`/product/${item.id}`)
        }
    }

    return (
        <div className="md:w-1/2 md:p-2">
            <div
                {...bind}
                className={`flex md:bg-slate-100 md:rounded dark:md:bg-slate-700 justify-left w-full bg-white dark:bg-slate-900 px-5 border-b border-slate-100 dark:border-slate-800 ${isChecked && 'bg-blue-100 dark:bg-slate-700 md:border md:border-2 md:border-indigo-200 md:dark:border-indigo-300 md:shadow-lg md:shadow-indigo-300/20 md:dark:shadow-indigo-900/50'}`}
            >

                <div className="flex flex-grow py-4" onClick={onItemClick}>

                    <div className="w-20 h-full text-center border border-slate-200 dark:border-slate-600 relative aspect-square rounded overflow-hidden bg-cover bg-center empty_image_background">
                        {item?.thumbnailImage && (
                            <img
                                loading="lazy"
                                src={getImageURL(
                                    item?.thumbnailImage,
                                    IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                                )}
                                alt="Avatar"
                                className="object-cover w-full h-full"
                            />
                        )}
                        {item.outOfStock && (
                            <div className="absolute w-full py-1 bottom-0 inset-x-0 bg-rose-100 text-rose-700 font-bold text-xs text-center leading-4">
                                Out of stock
                            </div>
                        )}
                    </div>

                    <div className="max-w-[65vw] w-full  self-center px-5">
                        <div className="font-semibold text-md dark:text-slate-200 md:w-52 truncate">
                            {item?.aliasName ? `${item?.aliasName}` : ''} {item?.aliasName ? `(${item?.centralCatalogue?.name})` : item?.centralCatalogue?.name} {item.variant?.name ? `- ${item.variant?.name}` : ''}
                        </div>
                        <div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="text-sm text-slate-500  dark:text-slate-400">
                                <p>
                                    MRP
                                </p>
                                <p className="font-semibold">
                                    {parseFloat(item?.mrpPrice)?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                </p>
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                <p >
                                    Sales Price
                                </p>
                                <p className="font-semibold" >
                                    {parseFloat(item?.rate)?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex flex-none justify-end w-5 text-center place-self-center py-9">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-slate-500 dark:text-slate-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={() => {
                            hapticFeedback()
                            onMore(item)
                        }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                    </svg>

                </div>
            </div>
        </div>
    )
}