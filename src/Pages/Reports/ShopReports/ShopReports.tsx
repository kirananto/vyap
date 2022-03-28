import React, { useCallback, useEffect, useRef } from 'react'
import Header from 'src/Components/Header/Header'
import { useIntl } from 'react-intl'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCredentials } from '../../Login/credentialsSlice'
import { useNavigate } from 'react-router'
import type { orderInterface } from 'src/Pages/Customers/ChatView/Cards/OrderCard'
import { fetchOrdersAPI } from 'src/API/order.axios'
import { PrintAll } from './PrintAll'
import Spinner from 'src/Components/Style/Spinner'
import NoDataImg from '../assets/no_data.svg'
import OrderContainer from 'src/Pages/Orders/OrderContainerBox'
import { FILTERS, FILTERS_VALUES } from '../types'
import ArrowDownIcon from 'src/Components/Style/Icons/ArrowDownIcon'

const ShopReports = () => {
    const { token } = useSelector(selectCredentials)
    const [loading, setLoading] = useState(true)
    const intl = useIntl()
    const navigate = useNavigate()
    const [orders, setOrders] = useState<orderInterface[]>([])
    const [orderCount, setOrderCount] = useState(0)
    const [totalSaleAmount, setTotalSaleAmount] = useState(0)

    const [enableDropDown, setEnableDropDown] = useState(false)
    const [filter, setFilter] = useState(FILTERS.TODAY)
    const [filterValue, setFilterValue] = useState(FILTERS_VALUES.TODAY)
    const wrapperRef = useRef(null)

    const getTotalAmount = useCallback((orders) => {
        let _orderTotal = 0
        orders?.forEach?.((item : orderInterface) => {
            const finalAmount = (
                parseFloat(item?.totalAmount) - parseFloat(item?.flatDiscount)
            )
            _orderTotal = _orderTotal + finalAmount
        })
        setTotalSaleAmount(_orderTotal)
    }, [])

    useEffect(() => {
        if (token) {
            setLoading(true)
            fetchOrdersAPI({
                token: token,
                orderStatus: undefined,
                ordering: filterValue,
                relatedId: undefined,
                offset: 0,
                limit: 1000,
            }).then((result) => {
                setOrders(result?.data?.data ?? [])
                setOrderCount(result?.data?.total)
                getTotalAmount(result.data?.data ?? [])
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [token, getTotalAmount, filterValue])


    // const handleClickOutside = (event) => {
    //     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
    //         setEnableDropDown(false)
    //     }
    // }

    // useEffect(() => {
    //     document.addEventListener('click', handleClickOutside, true)
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside, true)
    //     }
    // }, [])


    return (
        <div className="dark:bg-slate-900 print:bg-white dark:print:bg-white ">
            {/* header */}
            <div className="w-full pb-3 bg-white drop-shadow-md dark:bg-slate-800 print:hidden  fixed">
                <Header isSticky={false} onBackClick={() => navigate('/reports')} heading={intl.formatMessage({ id: 'global.shopwiseReports' })} />

                <div className="flex justify-center h-10 mt-1 mx-20 font-semibold bg-white dark:bg-slate-700
                dark:text-slate-200 relative border border-slate-300 dark:border-slate-700"                           
                ref={wrapperRef}
                >
                    {enableDropDown ? 
                        <div className="flex absolute p-2 bg-white dark:bg-slate-700 w-[50vw]">
                            <ul className="">
                                <li className='mb-1 bg-blue-100 px-5 dark:bg-slate-600 p-2'
                                    onClick={() => {
                                        setFilter(FILTERS.TODAY)
                                        setFilterValue(FILTERS_VALUES.TODAY)
                                        setEnableDropDown(false)
                                    }}
                                > 
                                    {FILTERS.TODAY}   
                                </li>
                                <li className='mb-1 bg-blue-100 px-5 dark:bg-slate-600 p-2'
                                    onClick={() => {
                                        setFilter(FILTERS.YESTERDAY)
                                        setFilterValue(FILTERS_VALUES.YESTERDAY)
                                        setEnableDropDown(false)
                                    }}
                                > 
                                    {FILTERS.YESTERDAY}   
                                </li>
                                <li className='mb-1 bg-blue-100 px-5 dark:bg-slate-600 p-2'
                                    onClick={() => {
                                        setFilter(FILTERS.THIS_MONTH)
                                        setFilterValue(FILTERS_VALUES.THIS_MONTH)
                                        setEnableDropDown(false)
                                    }}
                                > 
                                    {FILTERS.THIS_MONTH}   
                                </li>
                                <li className='mb-1 bg-blue-100 px-5 dark:bg-slate-600 p-2'
                                    onClick={() => {
                                        setFilter(FILTERS.THIS_YEAR)
                                        setFilterValue(FILTERS_VALUES.THIS_YEAR)
                                        setEnableDropDown(false)
                                    }}
                                > 
                                    {FILTERS.THIS_YEAR}   
                                </li>
                                <li className='mb-1 bg-blue-100 px-5 dark:bg-slate-600 p-2'
                                    onClick={() => {
                                        setFilter(FILTERS.LAST_7_DAYS)
                                        setFilterValue(FILTERS_VALUES.LAST_7_DAYS)
                                        setEnableDropDown(false)
                                    }}
                                > 
                                    {FILTERS.LAST_7_DAYS}   
                                </li>
                                <li className='mb-1 bg-blue-100 px-5 dark:bg-slate-600 p-2'
                                    onClick={() => {
                                        setFilter(FILTERS.LAST_30_DAYS)
                                        setFilterValue(FILTERS_VALUES.LAST_30_DAYS)
                                        setEnableDropDown(false)
                                    }}
                                > 
                                    {FILTERS.LAST_30_DAYS}   
                                </li>
                                <li className='mb-1 bg-blue-100 px-5 dark:bg-slate-600 p-2'
                                    onClick={() => {
                                        setFilter(FILTERS.LAST_90_DAYS)
                                        setFilterValue(FILTERS_VALUES.LAST_90_DAYS)
                                        setEnableDropDown(false)
                                    }}
                                > 
                                    {FILTERS.LAST_90_DAYS}   
                                </li>
                                <li className='mb-1 bg-blue-100 px-5 dark:bg-slate-600 p-2'
                                    onClick={() => {
                                        setFilter(FILTERS.CUSTOM_DATE)
                                        setFilterValue(FILTERS_VALUES.CUSTOM_DATE)
                                        setEnableDropDown(false)
                                    }}
                                > 
                                    {FILTERS.CUSTOM_DATE}   
                                </li>
                            </ul>
                        </div>
                            
                        :

                        <div className="flex justify-between  p-2 bg-white dark:bg-slate-700 w-[50vw]"
                            onClick={() => setEnableDropDown(true)}
                        >
                            <span>{filter}</span>

                            <span className="right"> <ArrowDownIcon /></span>   
                        </div>

                    }

                            
                </div>
            </div>
            {/* body */}           

            { loading

                ? <div className="p-12 pt-60 text-center dark:text-slate-100 grid">
                    <Spinner />
                </div>

                : orderCount ? (<>
                    <div className="bg-slate-100 p-4 dark:bg-slate-900 print:hidden pt-[130px]">
                        <div className='flex justify-center bold text-center mb-5 font-semibold dark:text-slate-200'>
                            <p className='text-right basis-1/2'>No. of Orders :</p>
                            <p className='text-left pl-5 basis-1/2'>{orderCount} Orders</p>
                        </div>
                        <div className='flex justify-center bold text-center mb-5 font-semibold dark:text-slate-200'>
                            <p className='text-right basis-1/2'>Total Amount :</p>
                            <p className='text-left pl-5 basis-1/2'>{totalSaleAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
                        </div>
                        <div
                            className="bg-white pb-24 dark:bg-slate-800 rounded p-4 max-h-[80vh] overflow-y-scroll"
                        >
                            <OrderContainer orders={orders} expanded={true} loading={false} />
                        </div>
                    </div>
                    {/* Footer */}

                    <div 
                        style={{ boxShadow: '0px -2px 8px #0000002e' }}
                        className="fixed print:static bottom-0 w-full h-20 bg-white dark:bg-slate-800 print:bg-white dark:print:bg-white drop-shadow-xl px-8 grid">
                        <div className="flex items-center justify-center gap-2 justify-self-center mt-2 w-full max-w-lg">
                            <PrintAll apiData={orders} />
                        </div>
                    </div>
                </>) : <div className="p-12 pt-[20vh] text-center dark:text-slate-100 grid">
                    <img className="m-auto mt-12 h-64 p-12" src={NoDataImg} />
                    <div className="m-auto w-2/3 px-6 text-center dark:text-slate-200">
                        No Orders
                    </div>
                </div>

            }
        </div>
    )
    
}

export default ShopReports