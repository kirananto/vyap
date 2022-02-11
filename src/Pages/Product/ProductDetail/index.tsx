import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from 'src/Components/Header'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { fetchCentralProduct, fetchProductById } from 'src/API/products.axios'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'
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
                if(dispatch(setSingleProduct(res.data))){
                    fetchCentralProduct({ token: token, id: product?.centralCatalogueId }).then((result: any) => {
                        if (result?.data) {
                            dispatch(setSingleCentralData(result?.data))
                        }
                    })
                }                     
            }).catch((error : any) => {
                console.log('fetch product error', error)
            })
        
    }, [dispatch, id, token, product?.centralCatalogueId], )

    return <div className='bg-white dark:bg-slate-900'>
        <div className="w-full bg-white pb-3 dark:bg-gray-800 pb-3 drop-shadow-md z-10">
            <Header
                isSticky={false}
                onBackClick={() => navigate('/my-products')}
                heading={'Product Details'}
            />
        </div>
        
        <div 
            className={`max-h-[91vh] overflow-y-scroll mt-2 flex flex-col justify-center w-full bg-white dark:bg-slate-900 px-5 py-4 border-b border-gray-100 dark:border-gray-800`}
        >
            <div className="flex flex-nowrap flex-shrink-0 h-[45vh] mt-24 w-full gap-3 overflow-x-scroll">

                {
                    //x.centralData.images[0].imageName
                    product?.centralData?.images?.map((img) => {
                        <div className={`flex-shrink-0 w-[80vw] h-full text-center p-2 border border-gray-200 dark:border-gray-600 relative rounded-lg bg-cover bg-center
                         ${img?.imageName ? '' : 'empty_image_background'}`}>
                            {console.log(img.imageName)}
                            {img?.imageName && (
                                <img
                                    src={getImageURL(
                                        img?.imageName,
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
                    })
                    
                }
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
                        <div className="basis-1/2 text-gray-700 dark:text-gray-400">{product?.centralData?.brand?.name}</div>
                    </div>

                    <div className="flex border-b border-gray-100 dark:border-gray-800 py-2">
                        <div className="basis-1/2 text-gray-400 dark:text-gray-500">Category:</div>
                        <div className="basis-1/2 text-gray-700 dark:text-gray-400">....</div>
                    </div>
                    <div className="flex border-b border-gray-100 dark:border-gray-800 py-2">
                        <div className="basis-1/2 text-gray-400 dark:text-gray-500">Tags:</div>
                        <div className="basis-1/2 text-gray-700 dark:text-gray-400">{product?.organizationCatalogueCategory?.name}</div>
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