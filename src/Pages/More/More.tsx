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
} from './Icons/MoreIcons'
import Links from './Links'
import Tag from '../../Components/Lozenge'
import { Footer } from '../../Components/Footer'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCredentials, setCredentials } from '../Login/credentialsSlice'
import { useNavigate } from 'react-router-dom'
import profPic from 'src/assets/icons/profile/profile-icon.svg'
import { FormattedMessage, useIntl } from 'react-intl'
import { logOutAPI } from 'src/API/login.axios'
import { clearAll as clearAllChats } from '../Customers/ChatView/chatListSlice'
import { hapticFeedback } from 'src/utils/vibrate'
import Bowser from 'bowser'
import { differenceInDays } from 'date-fns'
import { clearAll as clearAllProducts } from '../Product/productsSlice'
import { clearAll as clearAllCustomers } from '../Customers/customersSlice'
const browser = Bowser.getParser(window.navigator.userAgent)
export default function More() {
    const { user, token } = useSelector(selectCredentials)
    const intl = useIntl()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // CHeck if it is not ios
    const isValidBrowser  = browser.getOS()?.name !== 'iOS'

    const expiry = differenceInDays(new Date('2022-05-16T04:30:59.978Z'), new Date())
    

    const handleLogout = () => {
    //TODO Add hooks to other data's that need's to be cleared too.
        logOutAPI(token).finally(() => {
            dispatch(setCredentials({ user: undefined, token: undefined }))
            dispatch(clearAllProducts())
            dispatch(clearAllCustomers())
            dispatch(clearAllChats())
            localStorage.clear()
            navigate('/login', { replace: true })
        })
    }

    return (
        <div className="bg-white dark:bg-slate-900">
            <div className="h-screen overflow-y-auto pb-48">
                <div className="m-auto w-full ">
                    <div className="mb-2 dark:bg-slate-800 shadow-md dark:border-slate-800 p-4 inline-flex items-center w-full">
                        <img
                            src={user?.profileImageUrl ?? profPic}
                            className="w-16 rounded-full border border-1 dark:border-slate-900 p-3  bg-slate-200 dark:bg-slate-900"
                            alt="profile-pic"
                            height={64}
                            width={64}
                        />
                        <div className="flex-grow flex flex-col pl-6">
                            <h1 className="text-xl font-bold text-slate-500 dark:text-slate-200"><FormattedMessage id="home.welcome" defaultMessage="Welcome 👋" />, <br/> {user?.organization?.name} 🎉</h1>
                            <p className="dark:text-slate-400 text-sm tracking-wider">+91{user?.organization?.officeNumber}</p>
                        </div>
                    </div>
                </div>
                {/* Menu */}
                {isValidBrowser ? <div className="m-auto w-full px-3">
                    <div className="bg-green-200 dark:bg-green-400 dark:bg-opacity-20 border border-green-700 m-auto w-full my-4 p-4 inline-flex items-center rounded-lg">
                        <img src={giftSvg} alt="gift" className="w-20 h-20 opacity-80" />
                        <div className="flex-grow flex flex-col pl-4">
                            <h2 className="title-font font-bold text-slate-700 dark:text-slate-200 tracking-wider">Enjoy your {expiry} days of <br/> free service 🎉</h2>
                            <p className="text-xs text-slate-600 dark:text-slate-300">and then it{`'`}s only <strong>₹299/month</strong></p>
                        </div>
                    </div>
                </div> : <div className="pt-6"/>}
                {/* ----- */}
                <div className="flex flex-col gap-2 pl-6 sm:pl-6 mt-2">
                    <NavLink to="/all-payments" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-slate-300 text-slate-500 ">
                        <PaymentIcon className="text-indigo-500 dark:text-indigo-300" />
                        <Links linkName={intl.formatMessage({ id: 'global.allPayments' })} />
                    </NavLink>
                    {/* ----- */}
                    {/* ----- */}
                    <NavLink to="/orders" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-slate-300 text-slate-500 ">
                        <AllOrdersIcon className="text-indigo-500 dark:text-indigo-300" />
                        <Links linkName={intl.formatMessage({ id: 'global.allOrders' })} />
                    </NavLink>
                    {/* ----- */}
                    {/* ----- */}
                    <NavLink to="/reports" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-slate-300 text-slate-500">
                        <ReportsIcon className="text-indigo-500 dark:text-indigo-300"/>
                        <Links linkName={intl.formatMessage({ id: 'global.reports' })} />
                        <Tag content={intl.formatMessage({ id: 'global.comingSoon' })} />
                    </NavLink>
                    {/* ----- */}
                    {/* ----- */}
                    {user?.organization?.isSupplier && <NavLink to="#" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-slate-300 text-slate-500">
                        <StockManagementIcon className="text-indigo-500 dark:text-indigo-300" />
                        <Links linkName={intl.formatMessage({ id: 'global.stockManagement' })} />
                        <Tag content={intl.formatMessage({ id: 'global.comingSoon' })} />
                    </NavLink>}
                    {/* ----- */}
                    {/* ----- */}
                    <NavLink to="/my-account" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-slate-300 text-slate-500">
                        <MyAccountIcon className="text-indigo-500 dark:text-indigo-300" />
                        <Links linkName={intl.formatMessage({ id: 'global.myAccount' })} />
                    </NavLink>
                    {/* ----- */}
                    {/* ----- */}
                    <NavLink to="/settings" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-slate-300 text-slate-500">
                        <SettingsIcon className="text-indigo-500 dark:text-indigo-300" />
                        <Links linkName={intl.formatMessage({ id: 'global.settings' })} />
                    </NavLink>
                    {/* ----- */}
                    {/* ----- */}
                    <a href="mailto:mail@vyap.app" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-slate-300 text-slate-500">
                        <HelpIcon className="text-indigo-500 dark:text-indigo-300" />
                        <Links linkName={intl.formatMessage({ id: 'global.help' })} />
                    </a>

                    {user?.organization?.isSupplier === false && <a href="mailto:mail@vyap.app" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-slate-300 text-slate-500">
                        <SwitchIcon className="text-indigo-500 dark:text-indigo-300" />
                        <Links linkName={intl.formatMessage({ id: 'global.switch' })} />
                    </a>}
                    {/* ----- */}
                    {/* ----- */}
                    {user?.organization?.isSupplier && <div className="flex items-center w-full gap-2 py-2 dark:text-slate-300 text-slate-500">
                        <OffersManagementIcon className="text-indigo-500 dark:text-indigo-300" />
                        <Links linkName={intl.formatMessage({ id: 'global.offer' })} />
                        <Tag content={intl.formatMessage({ id: 'global.comingSoon' })} />
                    </div>}
                    {/* ----- */}
                    {/* ----- */}
                    <div onClick={handleLogout} className="cursor-pointer flex items-center w-full gap-2 py-2 dark:text-slate-300 text-slate-500">
                        <LogoutIcon className="text-indigo-500 dark:text-indigo-300" />
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