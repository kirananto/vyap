import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchOrdersAPI } from 'src/API/order.axios'
import type { orderInterface } from 'src/Pages/Customers/ChatView/Cards/OrderCard'
import ModalViewer from 'src/Components/Style/ModalViewer'
import { Header } from '../../Components/Header'
import { selectCredentials } from '../Login/credentialsSlice'
import AppliedFilters from './AppliedFilters'
import { FilterPopup } from './Filters/FilterPopUp'
import { selectOrderFilters } from './Filters/orderFiltersSlice'
import { ExportAll } from './Options/ExportAll'
import { PrintAll } from './Options/PrintAll'
import OrderContainer from './OrderContainerBox'

export default function Orders() {
    const [orders, setOrders] = useState<orderInterface[]>([])
    const { token } = useSelector(selectCredentials)
    const [loading, setLoading] = useState(true)
    const [filterPopupOpen, setfilterPopupOpen] = useState(false)
    const filters = useSelector(selectOrderFilters)
    const intl = useIntl()
    const navigate = useNavigate()
    useEffect(() => {
        if (token) {
            fetchOrdersAPI({
                token: token,
                orderStatus: filters.orderStatus,
                ordering: filters?.sorting,
                relatedId: filters?.account?.id,
                offset: 0,
                limit: 100,
            }).then((result) => {
                setLoading(false)
                setOrders(result?.data?.data ?? [])
            })
        }
    }, [filters.orderStatus, filters?.sorting, filters?.account, token])

    return (
        <div className="dark:bg-gray-900">
            {/* header */}
            <div className="w-full pb-3 bg-white shadow dark:bg-gray-800 ">
                <Header isSticky={false} onBackClick={() => navigate('/home')} heading={intl.formatMessage({ id: 'global.allOrders' })} />
                <AppliedFilters
                    openFilters={() => setfilterPopupOpen(!filterPopupOpen)}
                />
            </div>
            {/* body */}
            <div className="bg-gray-100 p-4 dark:bg-gray-900">
                <div
                    className="overflow-y-auto bg-white pb-24 dark:bg-gray-800 rounded p-4"
                    style={{ height: 'calc(100vh - 15rem)' }}
                >
                    <OrderContainer loading={loading} orders={orders} />
                </div>
            </div>
            {/* Footer */}

            <ModalViewer
                body={<FilterPopup />}
                isOpen={filterPopupOpen}
                onClose={() => setfilterPopupOpen(false)}
                name={'filter'}
            />

            <div className="fixed bottom-0 w-full h-20 bg-white dark:bg-gray-800 shadow px-8 grid">
                <div className="flex items-center justify-center gap-2 justify-self-center mt-2 w-full max-w-lg">
                    <PrintAll apiData={orders} />
                    <ExportAll apiData={orders} />
                </div>
            </div>
        </div>
    )
}