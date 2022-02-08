import React from 'react'
import giftSvg from './Icons/gift.svg'
import {
    PaymentIcon,
    AllOrdersIcon,
    ReportsIcon,
    StockManagementIcon,
    MyAccountIcon,
    SettingsIcon,
    HelpIcon,
    OffersManagementIcon,
    LogoutIcon,
    SwitchIcon,
} from './Icons/Payment'
import Links from './Links'
import Tag from './Tag'
import { Footer } from '../../Components/Footer'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCredentials, setCredentials } from '../Login/credentialsSlice'
import { useNavigate } from 'react-router-dom'
import profPic from 'src/assets/icons/profile/profile-icon.svg'
import { useIntl } from 'react-intl'
import { logOutAPI } from 'src/API/login.axios'
import { clearAll } from '../ChatView/chatListSlice'
import { hapticFeedback } from 'src/utils/vibrate'

export default function More() {
    const { user, token } = useSelector(selectCredentials)
    const intl = useIntl()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
    //TODO Add hooks to other data's that need's to be cleared too.
        logOutAPI(token).then(() => {
            dispatch(setCredentials({ user: undefined, token: undefined }))
            navigate('/login')
        }).catch(() => {
            dispatch(setCredentials({ user: undefined, token: undefined }))
            navigate('/login')
        }).finally(() => {
            dispatch(clearAll())
        })
    }

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="h-screen overflow-y-auto pb-48">
                <div className="m-auto w-full">
                    <div className="dark:bg-gray-700 border border-bottom dark:border-gray-800 p-4 inline-flex items-center w-full">
                        <img
                            src={user?.profileImageUrl ?? profPic}
                            className="w-16 rounded-full border border-2 dark:border-gray-500"
                            alt="profile-pic"
                        />
                        <div className="flex-grow flex flex-col pl-6">
                            <h1 className="text-xl font-bold text-gray-500 dark:text-gray-200">Welcome, <br/> {user?.organization?.name} 🎉</h1>
                            <p className="dark:text-gray-400 text-sm tracking-wider">+91{user?.organization?.officeNumber}</p>
                        </div>
                    </div>
                </div>
                {/* Menu */}
                <div className="m-auto w-full px-3">
                    <div className="bg-green-200 border border-green-700 m-auto w-full my-4 p-4 inline-flex items-center rounded-lg">
                        <img src={giftSvg} alt="gift" className="w-20 h-20" />
                        <div className="flex-grow flex flex-col pl-4">
                            <h2 className="title-font font-bold text-gray-800 tracking-wider">Enjoy your 3 months of <br/> free service 🎉</h2>
                            <p className="text-sm dark:text-gray-600">and then it's only <strong>₹299/month</strong></p>
                        </div>
                    </div>
                </div>
                {/* ----- */}
                <div className="flex flex-col gap-2 pl-6 sm:pl-10 mt-2">
                    <NavLink to="/all-payments" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500 ">
                        <PaymentIcon />
                        <Links linkName={intl.formatMessage({ id: 'global.allPayments' })} />
                    </NavLink>
                    {/* ----- */}
                    {/* ----- */}
                    <NavLink to="/orders" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500 ">
                        <AllOrdersIcon />
                        <Links linkName={intl.formatMessage({ id: 'global.allOrders' })} />
                    </NavLink>
                    {/* ----- */}
                    {/* ----- */}
                    <NavLink to="/reports" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500">
                        <ReportsIcon />
                        <Links linkName={intl.formatMessage({ id: 'global.reports' })} />
                        <Tag tagName={intl.formatMessage({ id: 'global.comingSoon' })} />
                    </NavLink>
                    {/* ----- */}
                    {/* ----- */}
                    {user?.organization?.isSupplier && <NavLink to="#" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500">
                        <StockManagementIcon />
                        <Links linkName={intl.formatMessage({ id: 'global.stockManagement' })} />
                        <Tag tagName={intl.formatMessage({ id: 'global.comingSoon' })} />
                    </NavLink>}
                    {/* ----- */}
                    {/* ----- */}
                    <NavLink to="/my-account" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500">
                        <MyAccountIcon />
                        <Links linkName={intl.formatMessage({ id: 'global.myAccount' })} />
                    </NavLink>
                    {/* ----- */}
                    {/* ----- */}
                    <NavLink to="/settings" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500">
                        <SettingsIcon />
                        <Links linkName={intl.formatMessage({ id: 'global.settings' })} />
                    </NavLink>
                    {/* ----- */}
                    {/* ----- */}
                    <a href="mailto:mail@vyap.app" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500">
                        <HelpIcon />
                        <Links linkName={intl.formatMessage({ id: 'global.help' })} />
                    </a>

                    {user?.organization?.isSupplier === false && <a href="mailto:mail@vyap.app" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500">
                        <SwitchIcon />
                        <Links linkName={intl.formatMessage({ id: 'global.switch' })} />
                    </a>}
                    {/* ----- */}
                    {/* ----- */}
                    {user?.organization?.isSupplier && <div className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500">
                        <OffersManagementIcon />
                        <Links linkName={intl.formatMessage({ id: 'global.offer' })} />
                        <Tag tagName={intl.formatMessage({ id: 'global.comingSoon' })} />
                    </div>}
                    {/* ----- */}
                    {/* ----- */}
                    <div onClick={handleLogout} className="cursor-pointer flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500">
                        <LogoutIcon />
                        <Links linkName={intl.formatMessage({ id: 'global.logout' })} />
                    </div>
                    {/* ----- */}
                </div>
            </div>
            {/* --Footer-- */}
            <Footer />
        </div>
    )
}