import React from 'react'
import type { IProduct } from 'src/types/product'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'
import transparentImg from 'src/assets/img/transparent.png'
import { hapticFeedback } from 'src/utils/vibrate'
import type { AddItemProductInterface } from '.'
import VariantBoxAddItem from './VariantBox'

interface IProps {
    item: IProduct
    selectedItems: AddItemProductInterface[]
    handleAddItem: any
    handleRemoveItemItem: any
    setSelectedItems: any
    updateItem: any
    handleVariantChange: any
}

export default function AddItemCard({
    item,
    selectedItems,
    handleAddItem,
    handleRemoveItemItem,
    setSelectedItems,
    updateItem,
    handleVariantChange
}: IProps) {
    return (<div
        className={`flex flex-wrap  
        ${selectedItems?.find(
            (findItem) => findItem.id === item.id
        ) ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white-200'
            } 
        mt-2 border-b-2 border-slate-100 dark:border-slate-800 py-4`}
    >
        <div className="relative self-center w-1/5 h-20  overflow-hidden">
            <img
                loading="lazy"
                src={item?.thumbnailImage ? getImageURL(
                    item?.thumbnailImage,
                    IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                ) : transparentImg}
                alt=""
                className="object-cover aspect-square rounded overflow-hidden h-full w-auto bg-cover bg-center empty_image_background"
            />
            {/* )} */}
        </div>
        <div className="w-4/5 pl-4 ">
            <div className=" text-lg font-bold mb-1 text-slate-600 dark:text-slate-200">
                {item?.aliasName ?? ''}{item?.aliasName ? <i className="ml-1">({item?.centralCatalogue?.name})</i> : item?.centralCatalogue?.name}
            </div>
            <div className="inline-grid grid-cols-2 w-full gap-3 grid-flow-row-dense">
                <div className="flex flex-col">
                    <div className="flex gap-2 mt-1">
                        <div className="text-xs font-semibold text-slate-500  dark:text-slate-400">
                            <p>MRP:</p>
                            <p>{parseFloat(item?.mrpPrice)?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
                        </div>
                        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            <p>SP:</p>
                            <p>{parseFloat(item?.rate)?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
                        </div>
                    </div>
                </div>


                <div className="flex gap-2 col-span-2 sm:col-span-1">
                    <div className="flex text-blue-600 dark:text-blue-400 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => {
                                hapticFeedback()
                                handleRemoveItemItem(item, 1)
                            }}
                            className="h-6 w-6 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div className="flex items-center dark:text-slate-200">
                        <form autoComplete="off">
                            <input
                                className="w-16 rounded border-dashed border px-2 border-indigo-300 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                                type="number"
                                name="qty"
                                id="qty"
                                onChange={(e) => {
                                    updateItem(item, parseInt(e.target.value.toString()))
                                }}
                                onBlur={() => {
                                    setSelectedItems(selectedItems?.filter((filterItem) => filterItem.quantity > 0))
                                }}
                                value={
                                    selectedItems?.find(
                                        (findItem) => findItem.id === item.id
                                    )?.quantity ?? 0
                                }
                            />
                        </form>
                    </div>

                    <div className="flex text-blue-600 dark:text-blue-400 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => {
                                hapticFeedback()
                                handleAddItem(item, 1)
                            }}
                            className="h-6 w-6 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
                <div className="w-full">
                    {(item.centralCatalogue.variants ?? []).length > 1 ?
                        <div className="flex w-full flex-row flex-wrap pt-2 text-sm text-slate-400 -ml-2">
                            {item?.centralCatalogue.variants?.map(mapItem => {
                                const isSelected = item.variant?.id === mapItem.id
                                return <VariantBoxAddItem product={item} key={mapItem.id} item={mapItem} handleVariantChange={handleVariantChange} isSelected={isSelected} />
                            })}
                        </div> : undefined}
                </div>
        </div>
    </div>)
}