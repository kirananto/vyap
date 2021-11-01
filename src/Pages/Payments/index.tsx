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

export default function Payments() {
    const { token } = useSelector(selectCredentials)
    const [payments, setPayments] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [filterPopupOpen, setfilterPopupOpen] = useState(false);
    const filters = useSelector(selectPaymentFilters)

    useEffect(() => {
        fetchAllPayments({ token: token!, limit: 100, offset: 0, paymentMethod: filters?.paymentMethod }).then((result: any) => {
            console.log(result.data)
            setLoading(false)
            setPayments(result.data.data)
            //TODO handle the payments better
        })
    }, [filters?.paymentMethod])
    return (
        <div className="">
            {/* header */}
            <div className="w-full pb-3 bg-white shadow dark:bg-gray-800 ">
                <Header heading="All Payments" />
                <AppliedFilters openFilters={() => setfilterPopupOpen(!filterPopupOpen)}/>
            </div>
            {/* body */}
            <div className="bg-gray-100 p-4 dark:bg-gray-900">
                <div className="overflow-y-auto bg-white dark:bg-gray-800 rounded p-4" style={{ height: 'calc(100vh - 15rem)' }}>
                    <PaymentContainer payments={payments} loading={loading} />
                </div>
            </div>

            <ModalViewer
                body={<FilterPopup />}
                isOpen={filterPopupOpen}
                onClose={() => setfilterPopupOpen(false)}
            />
            {/* Footer */}

            <div className="fixed bottom-0 w-full h-20 bg-white shadow px-8 grid dark:bg-gray-800">
                <div className="flex items-center justify-center gap-2 justify-self-center mt-2 w-full max-w-lg">
                    <button className="flex justify-center gap-1 items-center w-2/4 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print All
                    </button>
                    <button className="flex justify-center gap-1 items-center w-2/4 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export All
                    </button>
                </div>
            </div>
        </div>
    )
}