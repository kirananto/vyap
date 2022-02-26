import React from 'react'
import { Header } from 'src/Components/Header'
import { useIntl } from 'react-intl'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCredentials } from '../../Login/credentialsSlice'
import { useNavigate } from 'react-router'


const ProductReports = () => {
    const { token } = useSelector(selectCredentials)
    const [loading, setLoading] = useState(true)
    const [filterPopupOpen, setfilterPopupOpen] = useState(false)
    const intl = useIntl()
    const navigate = useNavigate()

  return (
    <div className="dark:bg-slate-900 print:bg-white dark:print:bg-white">
    {/* header */}
    <div className="w-full pb-3 bg-white drop-shadow-md dark:bg-slate-800 print:hidden  ">
        <Header isSticky={false} onBackClick={() => navigate('/reports')} heading={intl.formatMessage({ id: 'global.productwiseReports' })} />
    </div>
    {/* body */}
    <div className="bg-slate-100 p-4 dark:bg-slate-900 print:hidden">
        <div
            className="overflow-y-auto bg-white pb-24 dark:bg-slate-800 rounded p-4"
            style={{ height: 'calc(100vh - 15rem)' }}
        >
            list
        </div>
    </div>
    {/* Footer */}

</div>
  )
}

export default ProductReports