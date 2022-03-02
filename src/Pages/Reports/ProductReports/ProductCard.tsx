import React from 'react'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'

interface IProduct {
    productID?: string;
    productName?: string;
    productImage?: string | null;
    productQty?: number;
}

const ProductCard = ({item} : {item: IProduct}) => {
    
    return (       
        <div
            className={`flex justify-between w-full bg-white dark:bg-slate-900 px-1 border-b border-slate-100 dark:border-slate-800 `}
        >
            <div className="flex py-4 basis-10/12 pl-2 ">

                <div className="basis-3/12 print:basis-1/12  md:basis-1/12 lg:basis-1/12 w-15 h-full text-center border border-slate-200  dark:border-slate-600 relative aspect-square rounded-lg overflow-hidden bg-cover bg-center empty_image_background">
                    {item?.productImage && (
                        <img
                            loading="lazy"
                            src={getImageURL(
                                item?.productImage,
                                IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                            )}
                            alt="Avatar"
                            className="object-cover w-full h-full"
                        />
                    )}

                </div>

                <div className="basis-8/12 max-w-[48vw] self-center px-3">
                    <div className="font-semibold text-md dark:text-slate-200 truncate">
                        {/* {item?.aliasName ? `${item?.aliasName}` : ''} {item?.aliasName ? `(${item?.centralCatalogue?.name})` : item?.centralCatalogue?.name} */}
                        {item?.productName}
                    </div>
                </div>

            </div>

            <div className="flex justify-end basis-2/12 py-9 pr-3 dark:text-slate-200">
                <p className="text-right"> {item?.productQty}</p> 
            </div>
        </div>
    )
}

export default ProductCard