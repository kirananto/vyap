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
import Button from 'src/Components/Style/Button'
import { FormattedMessage } from 'react-intl'
import FilterOptions from '../FilterOptions'


const ShopReports = () => {
    const { token } = useSelector(selectCredentials)
    const [loading, setLoading] = useState(true)
    const intl = useIntl()
    const navigate = useNavigate()
    const [orders, setOrders] = useState<orderInterface[]>([])
    const [orderCount, setOrderCount] = useState(0)
    const [totalSaleAmount, setTotalSaleAmount] = useState(0)

    const [enableDropDown, setEnableDropDown] = useState(false)
    const [enableCustomDate, setEnableCustomDate] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [filter, setFilter] = useState({
        name : FILTERS.TODAY,
        value : FILTERS_VALUES.TODAY
    })

    const wrapperRef = useRef<HTMLDivElement>(null)

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
                ordering: filter.value,
                relatedId: undefined,
                startDate,
                endDate,
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
    }, [token, getTotalAmount, startDate, endDate, filter])


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

    function maxDate(){
        return new Date().toISOString().split('T')[0]
    }

    function formatDate(date : string){
        const inpDate = new Date(date)
        const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(inpDate)
        const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(inpDate)
        const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(inpDate)
        console.log(`${day}-${month}-${year}`)
        return (`${day}-${month}-${year}`)
    }

    return (
        <div className="dark:bg-slate-900 print:bg-white dark:print:bg-white ">
            {/* header */}
            <div className="w-full pb-3 bg-white drop-shadow-md dark:bg-slate-800 print:hidden fixed">
                <Header isSticky={false} onBackClick={() => navigate('/reports')} heading={intl.formatMessage({ id: 'global.shopwiseReports' })} />

                <div className="flex justify-center h-10 mt-1 mx-20 font-semibold bg-white dark:bg-slate-700
                dark:text-slate-200 relative border border-slate-300 dark:border-slate-700"                           
                ref={wrapperRef}
                >
                    {enableDropDown || enableCustomDate ? 

                        (enableDropDown ?  <FilterOptions setEnableDropDown={setEnableDropDown} setFilter={setFilter} setEnableCustomDate={setEnableCustomDate} /> :
                            
                            <div className="flex flex-col absolute p-2 bg-white dark:bg-slate-700 w-[56vw] ">
                                        Custom Date Range
                                <div className="flex flex-col bg-blue-100 dark:bg-slate-700 gap-5 py-2 mt-2 px-1 text-md">
                                    <div>
                                        <span className="font-normal">Start Date:</span>
                                        <br/>
                                        <input className='dark:bg-slate-600 px-2 py-1' type="date" max={maxDate()} id="startDate" name="start" value={startDate} onChange={(e) => setStartDate(e.target.value)}></input>
                                    </div>
                                    
                                    <div>
                                        <span className="font-normal">End Date:</span>
                                        <input className='dark:bg-slate-600 px-2 py-1'  type="date" max={maxDate()} id="endDate" name="end" value={endDate} onChange={(e) => setEndDate(e.target.value)}></input>
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
                        {formatDate(startDate)}  <span className="px-4">to</span>  {formatDate(endDate)}
                    </div>                           
                }  
            </div>
            {/* body */}           

            { loading

                ? <div className="p-12 pt-60 text-center dark:text-slate-100 grid">
                    <Spinner />
                </div>

                : orderCount ? (<>
                    <div className={`bg-slate-100 p-4 dark:bg-slate-900 print:hidden 
                        ${(filter.value ===  FILTERS_VALUES.CUSTOM_DATE  && startDate && endDate) ? 'pt-[170px]' :'pt-[130px]'    }
                    
                    `}>
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