import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from 'src/Components/Header'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { fetchCentralProduct, fetchProductById } from 'src/API/products.axios'
import { getProductImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'
import { selectProductsInfo, setSingleCentralData, setSingleProduct } from '../productsSlice'

const ProductDetail = () => {

    const { id } = useParams()
    const { token } = useSelector(selectCredentials)
    const navigate = useNavigate()
    const { products } = useSelector(selectProductsInfo)
    const dispatch = useDispatch()

    const product = products.find(findItem => findItem.id === id)

    useEffect(() => {
        const productId = id
        fetchProductById({ token: token, id: productId })
            .then((res) => {
                console.log('response product:', res.data)
                if (dispatch(setSingleProduct(res.data))) {
                    fetchCentralProduct({ token: token, id: product?.centralCatalogueId }).then((result) => {
                        if (result?.data) {
                            dispatch(setSingleCentralData(result?.data))
                        }
                    })
                }
            }).catch((error) => {
                console.log('fetch product error', error)
            })

    }, [dispatch, id, token, product?.centralCatalogueId])

    return <div className='min-h-screen'>
        <div className="w-full bg-white pb-3 drop-shadow-md dark:bg-slate-800">
            <Header
                isSticky={false}
                onBackClick={() => navigate('/my-products')}
                heading={'Product Details'}
            />
        </div>

        <div
            className={`min-h-screen overflow-y-scroll flex flex-col w-full bg-white dark:bg-slate-900 px-5 py-4 border-b border-gray-100 dark:border-gray-800`}
        >
            <div className="flex flex-nowrap flex-shrink-0 h-[45vh] w-full gap-3 overflow-x-scroll empty_image_background">
                {(product?.centralData?.images?.length ?? 0) > 0 && <>

                    {product?.centralData?.images?.map((img) => {
                        return (
                            <div 
                                key={'key-' + Math.random()} 
                                className={`flex-shrink-0 w-full h-full min-h-[250px] text-center 
                            border overflow-hidden border-gray-200 dark:border-gray-700 relative rounded-lg bg-cover bg-center
                         ${img?.imageName ? '' : 'empty_image_background'}`}>
                                {img?.imageName && (
                                    <img
                                        src={getProductImageURL(
                                            img?.imageName,
                                            IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                                        )}
                                        alt="Avatar"
                                        className="object-cover w-full h-full"
                                    />
                                )}
                                {product?.outOfStock && (
                                    <div className="absolute w-full py-1 bottom-0 inset-x-0 bg-rose-200 text-rose-500 font-bold text-xs text-center leading-4">
                                    Out of stock
                                    </div>
                                )}
                            </div>
                        )
                    })

                    }
                </>}
            </div>

            <div className=" w-full self-center px-1 py-3">
                <div className="font-semibold text-lg dark:text-slate-300 truncate">
                    {/* {product?.aliasName ? `${product?.aliasName}` : ''} {product?.aliasName ? `(${product?.centralCatalogue?.name})` : product?.centralCatalogue?.name} */}
                    {product?.aliasName ? `${product?.aliasName}` : ''} {product?.aliasName ? `(${product?.centralCatalogue?.name})` : product?.centralCatalogue?.name}
                </div>

                <div className="grid grid-cols-2 py-3">
                    <div className="font-semibold text-slate-400  dark:text-slate-400">
                        <p className="text-sm ">
                            MRP
                        </p>
                        <p className=" text-md font-semibold text-slate-600 dark:text-slate-300">
                            ₹{product?.mrpPrice}
                        </p>
                    </div>
                    <div className="font-semibold text-slate-400 dark:text-slate-400">
                        <p className="text-sm">
                            Sales Price
                        </p>
                        <p className="text-md font-semibold text-slate-600 dark:text-slate-300" >
                            ₹{product?.rate}
                        </p>
                    </div>
                </div>
            </div>


            <div className="flex flex-col mb-8 px-1">
                <div className="text-sm text-slate-400 dark:text-slate-400">
                    Description
                </div>

                <div className="pt-1 text-sm text-slate-600 dark:text-slate-300">
                    {product?.centralCatalogue?.description  ?? '--'}
                </div>
            </div>


            <div className="flex flex-col text-slate-500   mb-5 px-1">
                <div className="text-sm text-slate-500 font-bold dark:text-slate-400">
                    Other Details
                </div>

                <div className="flex flex-col pt-2 text-sm text-slate-400">

                    <div className="flex border-b border-gray-100 dark:border-gray-800 py-2">
                        <div className="basis-1/2 text-slate-400 dark:text-slate-500">Brand:</div>
                        <div className="basis-1/2 text-slate-700 dark:text-slate-300">{product?.centralData?.brand?.name ?? '--'}</div>
                    </div>

                    <div className="flex border-b border-gray-100 dark:border-gray-800 py-2">
                        <div className="basis-1/2 text-slate-400 dark:text-slate-500">Category:</div>
                        <div className="basis-1/2 text-slate-700 dark:text-slate-300">{product?.centralData?.categories?.[0]?.name ?? '--'}</div>
                    </div>
                    <div className="flex border-b border-gray-100 dark:border-gray-800 py-2">
                        <div className="basis-1/2 text-slate-400 dark:text-slate-500">Tags:</div>
                        <div className="basis-1/2 text-slate-700 dark:text-slate-300">{product?.organizationCatalogueCategory?.name ?? '--'}</div>
                    </div>
                    <div className="flex border-b border-gray-100 dark:border-gray-800 py-2">
                        <div className="basis-1/2 text-slate-400 dark:text-slate-500">Item Code (SKU):</div>
                        <div className="basis-1/2 text-slate-700 dark:text-slate-300">{product?.itemSKUCode ?? '--'}</div>
                    </div>
                </div>
            </div>

        </div>

    </div>
}

export default ProductDetail