import React, { useCallback, useEffect } from 'react'
import Header from 'src/Components/Header/Header'
import { useIntl } from 'react-intl'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCredentials } from '../../Login/credentialsSlice'
import { useNavigate } from 'react-router'
import { fetchOrdersAPI } from 'src/API/order.axios'
import type { orderInterface } from 'src/Pages/Customers/ChatView/Cards/OrderCard'
import { fetchOrderItems } from 'src/API/order.axios'
import ProductCard from './ProductCard'
import Spinner from 'src/Components/Style/Spinner'
import { PrintAll } from './PrintAll'
import NoDataImg from '../assets/no_data.svg'
interface IProduct {
    orderID: string,
    productID: string;
    productName: string;
    productImage: string | null;
    productQty: number;
    aliasName: string;
}

const ProductReports = () => {
    const { token } = useSelector(selectCredentials)
    const [loading, setLoading] = useState(true)
    const intl = useIntl()
    const navigate = useNavigate()
    const [productData, setProductData] = useState<IProduct[]>([])
    const [isEmptyList, setIsEmptyList] = useState(false)

    const handleFetchOrderItems = useCallback(async (orders) => {
        try {
            const result = await Promise.all(orders?.map?.((order: orderInterface) => {
                return fetchOrderItems({ token, orderId: order.id, limit: 100, offset: 0 })
            }))
            const list = result.map(resultItem => resultItem?.data?.data)
            const orderItems = list.flat()
            orderItems.length && setIsEmptyList(false)
            const _productData: IProduct[] = []
            orderItems?.forEach?.((item) => {
                const index = _productData.findIndex(e => e?.productID === item?.product?.id)
                if (index === -1) {
                    _productData.push({
                        orderID: item?.orderId,
                        productID: item?.product?.id,
                        productName: item?.product?.centralCatalogue?.name,
                        productImage: item?.product?.thumbnailImage,
                        productQty: item?.quantity,
                        aliasName: item?.aliasName
                    })
                } else {
                    _productData[index].productQty = _productData[index].productQty + item?.quantity
                }
            })
            setProductData(_productData.sort?.((a, b) => b?.productQty - a?.productQty))
        } catch (error) {
            console.log(error)
        }
    }, [token])

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
                if (result?.data?.total === 0) {
                    setIsEmptyList(true)
                }
                handleFetchOrderItems(result.data?.data ?? [])
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [handleFetchOrderItems, token])


    return (
        <div className="dark:bg-slate-900 min-h-screen print:bg-white dark:print:bg-white">
            {/* header */}
            <div className="w-full pb-3 bg-white drop-shadow-md dark:bg-slate-800 print:hidden  ">
                <Header isSticky={false} onBackClick={() => navigate('/reports')} heading={intl.formatMessage({ id: 'global.productwiseReports' })} />
            </div>

            {loading

                ? <div className="p-12 pt-60 text-center dark:text-slate-100 grid">
                    <Spinner />
                </div>
                :
                <>
                    {isEmptyList
                        ?
                        <div className="p-12 pt-[10vh] text-center dark:text-slate-100 grid">
                            <img className="m-auto mt-12 h-64 p-12" src={NoDataImg} />
                            <div className="m-auto w-2/3 px-6 text-center dark:text-slate-200">
                                  No Items Sold Today
                            </div>
                        </div>
                        :
                        <>
                            <div className="bg-slate-100 p-4 dark:bg-slate-900 print:hidden">
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
                            <div
                                style={{ boxShadow: '0px -2px 8px #0000002e' }}
                                className="fixed print:static bottom-0 w-full h-20 bg-white dark:bg-slate-800 print:bg-white dark:print:bg-white drop-shadow-xl px-8 grid">
                                <div className="flex items-center justify-center gap-2 justify-self-center mt-2 w-full max-w-lg">
                                    <PrintAll productData={productData} />
                                </div>
                            </div> </>
                    }

                </>
            }

        </div>
    )
}

export default ProductReports