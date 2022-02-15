import { Header } from '../../Components/Header'
import React, { useState, useEffect } from 'react'
import AppliedFilters from './AppliedFilters'
import PaymentContainer from './PaymentContainer'
import { fetchAllPayments } from 'src/API/payment.axios'
import { useSelector } from 'react-redux'
import { selectCredentials } from '../Login/credentialsSlice'
import ModalViewer from 'src/Components/Style/ModalViewer'
import { FilterPopup } from './Filters/FilterPopUp'
import { selectPaymentFilters } from './Filters/paymentFiltersSlice'
import { ExportAll } from './Options/ExportAll'
import { PrintAll } from './Options/PrintAll'
import { useIntl } from 'react-intl'
import useQueryParam from 'src/utils/useQueryParams'
import { useNavigate } from 'react-router'
import type { IFetchAllPayments, IFetchAllPaymentsDataEntity } from 'src/types/fetchAllPayments'

export default function Payments() {
    const { token } = useSelector(selectCredentials)
    const [payments, setPayments] = useState<IFetchAllPaymentsDataEntity[]>()
    const [loading, setLoading] = useState(true)
    const [filterPopupOpen, setfilterPopupOpen] =
    useQueryParam<boolean>('filterPopupOpen')
    const filters = useSelector(selectPaymentFilters)
    const intl = useIntl()
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllPayments({
            token: token,
            limit: 1000,
            offset: 0,
            paymentMethod: filters?.paymentMethod,
            ordering: filters?.sorting ? filters?.sorting : 'latest',
            relatedId: filters?.account?.id,
        }).then((result: IFetchAllPayments) => {
            console.log(result.data)
            setLoading(false)
            setPayments(result?.data?.data ?? [])
            //TODO handle the payments better
        })
    }, [filters?.paymentMethod, filters?.sorting, filters?.account?.id, token])
    return (
        <div className="">
            {/* header */}
            <div className="w-full bg-white pb-3 shadow dark:bg-gray-800 ">
                <Header
                    isSticky={false}
                    onBackClick={() => navigate('/more')}
                    heading={intl.formatMessage({ id: 'global.allPayments' })}
                />
                <AppliedFilters
                    openFilters={() => setfilterPopupOpen(!filterPopupOpen)}
                />
            </div>
            {/* body */}
            <div className="bg-gray-100 p-4 dark:bg-gray-900">
                <div
                    className="overflow-y-auto rounded bg-white p-4 dark:bg-gray-800"
                    style={{ height: 'calc(100vh - 15rem)' }}
                >
                    <PaymentContainer payments={payments} loading={loading} />
                </div>
            </div>

            <ModalViewer
                body={<FilterPopup />}
                isOpen={!!filterPopupOpen}
                onClose={() => setfilterPopupOpen(false)}
                name={'filter'}
            />
            {/* Footer */}

            <div className="fixed bottom-0 grid h-20 w-full bg-white px-8 shadow dark:bg-gray-800">
                <div className="mt-2 flex w-full max-w-lg items-center justify-center gap-2 justify-self-center">
                    <PrintAll apiData={payments} />
                    <ExportAll apiData={payments} />
                </div>
            </div>
        </div>
    )
}