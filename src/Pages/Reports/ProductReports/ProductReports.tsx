import React, { useEffect } from 'react'
import Header from 'src/Components/Header/Header'
import { useIntl } from 'react-intl'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCredentials } from '../../Login/credentialsSlice'
import { useNavigate } from 'react-router'
import { fetchOrdersAPI } from 'src/API/order.axios'
import type { orderInterface, IOrderItem } from 'src/Pages/Customers/ChatView/Cards/OrderCard'
import { fetchOrderItems } from 'src/API/order.axios'
import ProductCard from './ProductCard'
import Spinner from 'src/Components/Style/Spinner'
import { PrintAll } from './PrintAll'
interface IProduct {
    orderID?: string,
    productID?: string;
    productName?: string;
    productImage?: string | null;
    productQty?: number;
    aliasName?: string;
}

const ProductReports = () => {
    const { token } = useSelector(selectCredentials)
    const [loading, setLoading] = useState(true)
    const intl = useIntl()
    const navigate = useNavigate()
    const [orders, setOrders] = useState<orderInterface[]>([])
    const [orderItems, setOrderItems] = useState<IOrderItem[]>([])
    const [productData, setProductData] = useState<IProduct[]>([])

    useEffect(() => {
        if (token) {
            fetchOrdersAPI({
                token: token,
                orderStatus: undefined,
                ordering: 'today',
                relatedId: undefined,
                offset: 0,
                limit: 1000,
            }).then((result) => {
                setOrders(result?.data?.data ?? [])
            })
        }
    }, [token])

    useEffect(() => {
        setOrderItems([])
        setProductData([])
        getOrderItems()
    }, [orders])


    useEffect(() => {
        getProductWiseData()
    }, [orderItems])

    const getOrderItems = () => {
        orders?.map?.((order : orderInterface) => {
            fetchOrderItems({ token, orderId: order.id, limit: 100, offset: 0 }).then((result) => {
                const newList = result?.data?.data
                setOrderItems((prevState => ([...prevState, ...newList])))
                setLoading(false)
            })
        })
    }

    const getProductWiseData = () => {
        orderItems?.map?.((item)=> {
            const product : IProduct  = {
                'orderID': item?.orderId,
                'productID': item?.product?.id,
                'productName': item?.product?.centralCatalogue?.name,
                'productImage': item?.product?.thumbnailImage,
                'productQty': item?.quantity,
                'aliasName': item?.aliasName
            }

            if(productData){
                if (productData?.filter(e => e.productID === item?.product?.id).length === 0) {
                    setProductData((prevState => ([...prevState, product])))
                }else{
                    console.log('duplicate found')

                    if (productData?.filter(e => e?.orderID === item?.orderId).length === 0) {
                                
                        const addQty = product.productQty
                        const pid = product.productID

                        setProductData((prevState => {
                            const updatedProduct = prevState.map(pdt => {
                                if (pdt.productID === pid && pdt.productQty && addQty) {
                                    const newQty = pdt.productQty + addQty
                                    return {...pdt, productQty: newQty}
                                }
                                return pdt
                            })

                            const sortedList = updatedProduct?.sort?.((a, b) => b.productQty - a.productQty)

                            // const sortedList = updatedProduct?.sort?.((a, b) => {
                            //     const k1 = a.productQty === undefined ? 0 : 1
                            //     const k2 = b.productQty === undefined ? 0 : 2
                            //     return k2- k1
                            // })
                            return [...sortedList]
                        }))
                    }
                }
            }
        })
        return null
    }

    return (
        <div className="dark:bg-slate-900 print:bg-white dark:print:bg-white">
            {/* header */}
            <div className="w-full pb-3 bg-white drop-shadow-md dark:bg-slate-800 print:hidden  ">
                <Header isSticky={false} onBackClick={() => navigate('/reports')} heading={intl.formatMessage({ id: 'global.productwiseReports' })} />
            </div>

            { loading

                ? <div className="p-12 pt-60 text-center dark:text-slate-100 grid">
                    <Spinner />
                </div>

                :            <div className="bg-slate-100 p-4 dark:bg-slate-900 print:hidden">
                    <div
                        className="overflow-y-auto bg-white pb-24 dark:bg-slate-800 rounded p-4"
                        style={{ height: 'calc(100vh - 12rem)' }}
                    > 
                        <div className='flex justify-between mb-1 pb-2 dark:text-slate-200'>
                            <div className="flex basis-10/12 text-lg border-b-[3px] border-blue-400 pt-2 px-2 mr-3">Items Sold (Today)</div>
                            <div className="flex text-lg border-b-[3px] border-blue-400 pt-2 px-2">Units</div>         
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
            }
            <div 
                style={{ boxShadow: '0px -2px 8px #0000002e' }}
                className="fixed print:static bottom-0 w-full h-20 bg-white dark:bg-slate-800 print:bg-white dark:print:bg-white drop-shadow-xl px-8 grid">
                <div className="flex items-center justify-center gap-2 justify-self-center mt-2 w-full max-w-lg">
                    <PrintAll productData={productData} />
                </div>
            </div>
        </div>
    )
}

export default ProductReports