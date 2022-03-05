import React from 'react'
import SimpleHeader from '../../Components/Header/SimpleHeader'
import {ReportCard } from './ReportCard'
import shopImg from '../../assets/illustrations/Shop.svg'
import { useIntl } from 'react-intl'
import { NavLink, useNavigate } from 'react-router-dom'
import { hapticFeedback } from 'src/utils/vibrate'


export default function Reports() {
    const intl = useIntl()
    const navigate = useNavigate()
    return (
        <div className="bg-white dark:bg-slate-900 h-screen">
            {/* Header */}
            <div className="bg-white dark:bg-slate-900 shadow">
                <SimpleHeader heading={intl.formatMessage({ id: 'global.reports'})}  backFn={() => navigate('/more')}/>
            </div>

            {/* Card Container */}
            <div className="grid w-full grid-cols-2 gap-4 p-4 mt-2 pt-20">

                <NavLink to="/shopwise-reports" onClick={hapticFeedback}>
                    <ReportCard
                        heading="Shopwise Reports"
                        bgIllus={shopImg}
                    />
                </NavLink>

                <NavLink to="/productwise-reports" onClick={hapticFeedback} >
                    <ReportCard
                        heading="Productwise Reports"
                        bgIllus={shopImg}
                    />
                </NavLink>
                <div className="text-center dark:text-slate-300 col-span-2 text-sm mt-2">
                    More reports coming soon...
                </div>
            </div>
        </div>
    )
}