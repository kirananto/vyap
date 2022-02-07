import React, { useCallback } from 'react'
import type { IProduct } from 'src/types/product'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'
import { hapticFeedback } from 'src/utils/vibrate'
import { useLongPress, LongPressDetectEvents } from 'use-long-press'

export default function ProductCard({
    item,
    onClicked,
    onMore,
    isChecked,
    longPresEnabled,
    setLongPressEnabled
}: {
  item: IProduct;
  onClicked: (item: IProduct) => void;
  onMore: (item?: IProduct | undefined) => void;
  isChecked: boolean;
  longPresEnabled: boolean;
  setLongPressEnabled: React.Dispatch<React.SetStateAction<boolean>>

}) {

    const callback = useCallback(() => {
        //alert('Long pressed!')
        onClicked(item)     
        setLongPressEnabled(false)   
    }, [])
    const bind = useLongPress(longPresEnabled ? callback : null, {
        //onStart: () => console.log('Press started'),
        //onFinish: () => console.log('Long press finished'),
        //onCancel: () => console.log('Press cancelled'),
        //onMove: () => console.log("Detected mouse or touch movement"),
        threshold: 500,
        captureEvent: true,
        cancelOnMovement: false,
        detect: LongPressDetectEvents.BOTH
    })

    const onItemClick = () => {
        if(!longPresEnabled)
            onClicked(item)     
    }

    return (
        <div 
            {...bind} 
            className={`flex justify-between w-full bg-white dark:bg-slate-900 px-5 py-4 border-b border-gray-300 dark:border-gray-800 ${isChecked && 'bg-blue-100 dark:bg-slate-700'}`}
            onClick={onItemClick}
        >
            {/* <div className="text-center place-self-center px-5 pr-6 ">
                <input
                    type="checkbox"
                    className="w-5 h-5 bg-red-200 active:bg-red-400"
                    onChange={() => onClicked(item)}
                    checked={isChecked}
                />
            </div> */}

            <div className="basis-3/12 w-full h-full text-center border border-gray-300 relative aspect-square rounded-lg overflow-hidden bg-cover bg-center empty_image_background">
                {item?.thumbnailImage && (
                    <img
                        src={getImageURL(
                            item?.thumbnailImage,
                            IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                        )}
                        alt="Avatar"
                        className="object-cover w-full h-full"
                    />
                )}
                {item.outOfStock && (
                    <div className="absolute w-full py-1 bottom-0 inset-x-0 bg-red-200 text-red-500 font-bold text-xs text-center leading-4">
                Out of stock
                    </div>
                )}
            </div>

            <div className="basis-7/12 max-w-[60%]  self-center px-5">
                <div className="font-semibold text-md dark:text-gray-200 truncate">
                    {item?.aliasName ? `${item?.aliasName}` : ''} {item?.aliasName ? `(${item?.centralCatalogue?.name})` : item?.centralCatalogue?.name}
                </div>

                <div>
                    {/* <p className="text-sm font-semibold text-gray-400 dark:text-gray-300 ">
              #{item.id?.split("-")[0]}
            </p> */}
                </div>
                <div className="grid grid-cols-2">
                    <div className="text-sm font-semibold text-gray-500  dark:text-gray-400">
                        <p>
                MRP
                        </p>
                        <p className="font-semibold">
                ₹{item?.mrpPrice}
                        </p>
                    </div>
                    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        <p >
                Cost
                        </p>
                        <p className="font-semibold" >
              ₹{item?.rate}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end basis-2/12 text-center place-self-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-500 dark:text-gray-300"
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
    )
}