import React, { useCallback, useEffect, useRef } from 'react'
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
import { FILTERS, FILTERS_VALUES } from '../types'
import ArrowDownIcon from 'src/Components/Style/Icons/ArrowDownIcon'
import Button from 'src/Components/Style/Button'
import { FormattedMessage } from 'react-intl'
import FilterOptions from '../FilterOptions'
import { format, subDays } from 'date-fns'


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

    const [enableDropDown, setEnableDropDown] = useState(false)
    const [enableCustomDate, setEnableCustomDate] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [filter, setFilter] = useState({
        name : FILTERS.TODAY,
        value : FILTERS_VALUES.TODAY
    })

    const wrapperRef = useRef<HTMLDivElement>(null)

    const handleFetchOrderItems = useCallback(async (orders: orderInterface[]) => {
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
            setLoading(true)
            fetchOrdersAPI({
                token: token,
                orderStatus: undefined,
                ordering: filter.value,
                relatedId: undefined,
                startDate,
                endDate,
                offset: 0,
                limit: 1000,
            }).then((result) => {
                if (result?.data?.total === 0) {
                    setIsEmptyList(true)
                }
                console.log(result.data?.data)
                handleFetchOrderItems(result.data?.data ?? [])
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [handleFetchOrderItems, token, startDate, endDate, filter])

    const handleClickOutside = (event: MouseEvent ) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event?.target as Node)) {
            setEnableDropDown(false)
            setEnableCustomDate(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    function onApplyDateRange(){
        console.log('Start:', startDate)
        console.log('End:', endDate)

        if(startDate && endDate){
            setFilter({
                name : FILTERS.CUSTOM_DATE,
                value : FILTERS_VALUES.CUSTOM_DATE
            })
            setEnableCustomDate(false)
        }

    }

    return (
        <div className="dark:bg-slate-900 min-h-screen print:bg-white dark:print:bg-white">
            {/* header */}
            <div className="w-full pb-3 bg-white drop-shadow-md dark:bg-slate-800 print:hidden  ">
                <Header isSticky={false} onBackClick={() => navigate('/reports')} heading={intl.formatMessage({ id: 'global.productwiseReports' })} />
                <div className="flex justify-center h-10 mt-1 mx-20 font-semibold bg-white dark:bg-slate-700
                dark:text-slate-200 relative border border-slate-300 dark:border-slate-700 z-auto"                           
                ref={wrapperRef}
                >
                    {enableDropDown || enableCustomDate ? 

                        (enableDropDown ?   <FilterOptions setEnableDropDown={setEnableDropDown} setFilter={setFilter} setEnableCustomDate={setEnableCustomDate} /> :
                            
                            <div className="flex flex-col absolute p-2 bg-white dark:bg-slate-700 w-[56vw] z-40">
                                        Custom Date Range
                                <div className="flex flex-col bg-blue-100 dark:bg-slate-700 gap-5 py-2 mt-2 px-1 text-md">
                                    <div>
                                        <span className="font-normal">Start Date:</span>
                                        <br/>
                                        <input 
                                            className='dark:bg-slate-600 px-2 py-1' 
                                            type="date" 
                                            max={format(subDays(new Date(), 1), 'yyyy-MM-dd')} 
                                            id="startDate" 
                                            name="start" 
                                            value={startDate} 
                                            onChange={(e) => setStartDate(e.target.value)} />
                                    </div>
                                    
                                    <div>
                                        <span className="font-normal">End Date:</span>
                                        <input 
                                            className='dark:bg-slate-600 px-2 py-1'  
                                            type="date" 
                                            max={format(new Date, 'yyyy-MM-dd')} 
                                            id="endDate" 
                                            name="end" 
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)} />
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <Button className="flex print:hidden justify-center gap-1 items-center w-2/8 h-8 text-sm"
                                            onClick={() => setEnableCustomDate(false)}>
                                            <>
                                                <FormattedMessage id="action.close" defaultMessage="Close" />
                                            </>
                                        </Button>

                                        <Button className="flex print:hidden justify-center gap-1 items-center w-2/8 h-8 text-sm"
                                            onClick={onApplyDateRange}>
                                            <>
                                                <FormattedMessage id="action.apply" defaultMessage="Apply" />
                                            </>
                                        </Button>
                                    </div>
                                </div>
                            </div> 
                        )
                        :
                        <div className="flex flex-col p-2 bg-white dark:bg-slate-700 w-[50vw]"
                            onClick={() => setEnableDropDown(true)}
                        >
                            <div className="flex justify-between ">
                                <span>{filter.name}</span>
                                <span className="right"> <ArrowDownIcon /></span> 
                            </div>
                            
                        </div>
                    }                  
                </div>

                {(filter.value ===  FILTERS_VALUES.CUSTOM_DATE  && startDate && endDate) &&
                    <div className='flex justify-center py-3 px-2 w-full 
                    dark:text-slate-200 bg-blue-100 mt-0 -mb-3 dark:bg-slate-600'>
                        {format(new Date(startDate), 'dd-MMM-yyyy')} <span className="px-4">to</span> {format(new Date(endDate), 'dd-MMM-yyyy')}
                    </div>
                            
                }  
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
                                  No Items found
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
                                        <div className="flex basis-10/12 text-lg border-b-[3px] border-blue-400 pt-2 px-2 mr-3">Items Sold </div>
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