import React, { useEffect } from 'react'
import { Header } from 'src/Components/Header'
import { useIntl } from 'react-intl'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import format from 'date-fns/format'
import { selectCredentials } from '../../Login/credentialsSlice'
import { useNavigate } from 'react-router'
import type { orderInterface } from 'src/Pages/Customers/ChatView/Cards/OrderCard'
import { fetchOrdersAPI } from 'src/API/order.axios'
import ReturnStatusTile from 'src/Pages/Orders/OrderStatusTag'
import OrderContainerDetail from './OrderItemsDetails'
import { PrintAll } from './PrintAll'

const ShopReports = () => {

    const { token } = useSelector(selectCredentials)
    // const [loading, setLoading] = useState(true)
    //  const [filterPopupOpen, setfilterPopupOpen] = useState(false)
    const intl = useIntl()
    const navigate = useNavigate()
    const [orders, setOrders] = useState<orderInterface[]>([])
    const [orderCount, setOrderCount] = useState(0)

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
                //setLoading(false)
                setOrders(result?.data?.data ?? [])
                setOrderCount(result?.data?.total)
            })
        }
    }, [])


    return (
        <div className="dark:bg-slate-900 print:bg-white dark:print:bg-white">
            {/* header */}
            <div className="w-full pb-3 bg-white drop-shadow-md dark:bg-slate-800 print:hidden  fixed">
                <Header isSticky={false} onBackClick={() => navigate('/reports')} heading={intl.formatMessage({ id: 'global.shopwiseReports' })} />
            </div>
            {/* body */}
            <div className="bg-slate-100 p-4 dark:bg-slate-900 print:hidden pt-24">

                <div className='flex justify-center bold text-center mb-5 font-semibold dark:text-slate-200'>
                    <p>Today:</p>
                    <p className='pl-5'>{orderCount} Orders</p>
                </div>
                <div
                    className="bg-white pb-24 dark:bg-slate-800 rounded p-4 max-h-[80vh] overflow-y-scroll"
                >
                    {orders.map((item, index) => (
                        <div
                            className={`${index === orders.length - 1 ? '' : 'border-b border-slate-300 dark:border-slate-700'
                            }`}
                            key={`${item.id}`}
                        >
                            <div className="flex flex-row mt-2 mb-3">
                                <div>
                                    <div className="item w-4  flex-grow-0 mr-2">
                                        <input
                                            className="cursor-pointer rounded border-slate-300 text-blue-800"
                                            type="checkbox"
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="grid grid-rows-3 content-start">
                                        <div className="grid grid-flow-col  gap-1 row-span-3">

                                            <div className="text-slate-500 mt-1 text-xs dark:text-slate-300">
                                                {item.createdAt
                                                    ? format(new Date(item.createdAt), 'do MMM yyyy')
                                                    : ''}
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-slate-600 text-sm md:text-md font-semibold dark:text-slate-200  mb-1">
                                            {item?.buyer?.name}

                                            <div className="text-slate-600  text-sm md:text-lg font-extrabold dark:text-slate-200">
                                                {' '}
                                                {(
                                                    parseFloat(item?.totalAmount) -
                                                    parseFloat(item?.flatDiscount)
                                                ).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                            </div>
                                        </div>
                                        <div className="grid grid-flow-col">
                                            <div className="col-start-1 w-max  items-center mt-1">
                                                <ReturnStatusTile status={item?.orderStatus?.[0]?.status} />
                                            </div>

                                            <div className="text-center col-end-12 self-center text-slate-600 dark:text-slate-200 text-lg font-extrabold">
                                            
                                                <div className="text-slate-400 text-xs font-extrabold mx-auto dark:text-slate-300">
                                                ({item?.numberOfItems} {item?.numberOfItems > 1 ? 'items' : 'item'})
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <OrderContainerDetail order={item} />

                        </div>
                    ))}
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

        </div>
    )
}

export default ShopReports