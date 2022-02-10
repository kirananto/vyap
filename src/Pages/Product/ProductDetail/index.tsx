import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from 'src/Components/Header'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { fetchProductById } from 'src/API/products.axios'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'

const ProductDetail = () => {

    const { id } = useParams()
    const { token } = useSelector(selectCredentials)
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const productId = id
        fetchProductById({ token: token, id: productId })
            .then((res) => {
                console.log('response product:', res.data)
                setProduct(res.data)               
            })
            .catch((error : any) => {
                console.log('fetch product error', error)
            })
    }, [id, token])

    return <div>
        <div className="w-full bg-white pb-3 dark:bg-gray-800 pb-3 drop-shadow-md z-10">
            <Header
                isSticky={false}
                onBackClick={() => navigate('/my-products')}
                heading={'Product Details'}
            />
        </div>
        
        <div 
            className={`flex flex-col justify-center w-full bg-white dark:bg-slate-900 px-5 py-4 border-b border-gray-100 dark:border-gray-800`}
        >
            <div className="w-50 h-full text-center border border-gray-200 dark:border-gray-600 relative aspect-square rounded-lg overflow-hidden bg-cover bg-center empty_image_background">
                {product?.thumbnailImage && (
                    <img
                        src={getImageURL(
                            product?.thumbnailImage,
                            IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                        )}
                        alt="Avatar"
                        className="object-cover w-full h-full"
                    />
                )}
                {product?.outOfStock && (
                    <div className="absolute w-full py-1 bottom-0 inset-x-0 bg-red-200 text-red-500 font-bold text-xs text-center leading-4">
                Out of stock
                    </div>
                )}
            </div>

            <div className=" w-full self-center px-1 py-5">
                <div className="font-semibold text-xl dark:text-gray-200 truncate">
                    {/* {product?.aliasName ? `${product?.aliasName}` : ''} {product?.aliasName ? `(${product?.centralCatalogue?.name})` : product?.centralCatalogue?.name} */}
                    {product?.aliasName ? `${product?.aliasName}` : ''} {product?.aliasName ? `(${product?.centralCatalogue?.name})` : product?.centralCatalogue?.name}
                </div>

                <div className="grid grid-cols-2 py-5">
                    <div className="font-semibold text-gray-500  dark:text-gray-400">
                        <p className="text-sm">
                MRP
                        </p>
                        <p className=" text-md font-semibold">
                ₹{product?.mrpPrice}
                        </p>
                    </div>
                    <div className="font-semibold text-gray-500 dark:text-gray-400">
                        <p className="text-sm">
                Cost
                        </p>
                        <p className="text-md font-semibold" >
              ₹{product?.rate}
                        </p>
                    </div>
                </div>
            </div>


            <div className="flex flex-col text-gray-500  dark:text-gray-400 mb-8 px-1">
                <div className="text-md text-gray-700 dark:text-gray-200">
                       Description:  
                </div>

                <div className="pt-2 text-sm text-gray-400">
                    {product?.centralCatalogue?.description}
                </div>
            </div>


            <div className="flex flex-col text-gray-500   mb-5 px-1">
                <div className="text-md text-gray-700 dark:text-gray-200">
                       Other Details:  
                </div>

                <div className="flex flex-col pt-2 text-sm text-gray-400">
                    
                    <div className="flex border-b border-gray-100 dark:border-gray-800 py-2">
                        <div className="basis-1/2 text-gray-400 dark:text-gray-500">Brand:</div>
                        <div className="basis-1/2 text-gray-700 dark:text-gray-400">....</div>
                    </div>

                    <div className="flex border-b border-gray-100 dark:border-gray-800 py-2">
                        <div className="basis-1/2 text-gray-400 dark:text-gray-500">Category:</div>
                        <div className="basis-1/2 text-gray-700 dark:text-gray-400">{product?.organizationCatalogueCategory?.name}</div>
                    </div>
                    <div className="flex border-b border-gray-100 dark:border-gray-800 py-2">
                        <div className="basis-1/2 text-gray-400 dark:text-gray-500">Tags:</div>
                        <div className="basis-1/2 text-gray-700 dark:text-gray-400">....</div>
                    </div>
                    <div className="flex border-b border-gray-100 dark:border-gray-800 py-2">
                        <div className="basis-1/2 text-gray-400 dark:text-gray-500">Item Code (SKU):</div>
                        <div className="basis-1/2 text-gray-700 dark:text-gray-400">{product?.itemSKUCode}</div>
                    </div>                                    
                </div>
            </div>

        </div>
        
    </div>
}

export default ProductDetail