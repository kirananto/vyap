import { Footer } from '../../Components/Footer'
import React, { useEffect, useCallback, useState } from 'react'
import { ItemCard } from './ItemCard'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { fetchInboxes } from 'src/API/inbox.axios'
import ChatImg from 'src/Pages/Customers/ChatView/assets/Chats.svg'
import profileImg from 'src/assets/icons/profile/profile-icon.svg'
import AddCustomerModal from './AddCustomerModal'
import Spinner from 'src/Components/Style/Spinner'
import { FormattedMessage, useIntl } from 'react-intl'
import {
    IInbox,
    selectCustomerInfo,
    setCustomers,
    setCustomerTotal,
} from './customersSlice'
import useQueryParam from 'src/utils/useQueryParams'
import { hapticFeedback } from 'src/utils/vibrate'
import { useScrollDirection } from 'react-use-scroll-direction'

export const Home = () => {
    const customer = useSelector(selectCustomerInfo)
    const dispatch = useDispatch()
    const [addCustomerVisible, setAddCustomerVisible] =
        useQueryParam<boolean>('addCustomer')
    const [loading, setLoading] = React.useState(
        customer.customers?.length === 0
    )
    const [paginationParams, setPaginationParams] = React.useState({
        page: 1,
        search: '',
    })
    const { user, token } = useSelector(selectCredentials)
    const navigate = useNavigate()
    const intl = useIntl()
    useEffect(() => {
        const limit = 30
        if (token) {
            fetchInboxes({
                token,
                offset: (paginationParams.page - 1) * limit,
                limit,
                search:
                    paginationParams.search.trim() === '' ? undefined : paginationParams.search.trim(),
            }).then((result) => {
                dispatch(setCustomers(result.data.data))
                dispatch(setCustomerTotal(result.data.total))
                setLoading(false)
                console.log('data', result.data.data)
            })
        } else {
            navigate('/login')
        }
    }, [paginationParams.search, addCustomerVisible, token, paginationParams.page, dispatch, navigate])

    function customerFilter(filterItem: IInbox) {
        const search = paginationParams.search?.trim()?.toLowerCase()
        if (filterItem.recipient?.name?.toLowerCase()?.includes(search)) {
            return true
        }
        if (filterItem.lastMsg?.toLowerCase()?.includes(search)) {
            return true
        }
        if (filterItem.recipient?.officeNumber?.toLowerCase()?.includes(search)) {
            return true
        }
        if (filterItem.recipient?.email?.toLowerCase()?.includes(search)) {
            return true
        }
        return false
    }

    function renderChats() {
        if (loading) {
            return (
                <div className="mt-12 grid p-12 text-center dark:text-slate-100">
                    <Spinner />
                </div>
            )
        }
        if (customer?.customers?.filter(customerFilter)?.length === 0) {
            return (
                <div>
                    <img
                        className="m-auto mt-12 h-96 p-12"
                        alt="no transactions"
                        src={ChatImg}
                    />
                    <div className="m-auto w-2/3 px-6 text-center dark:text-slate-200">
                        {' '}
                        {paginationParams.search.trim() === '' ? `You do not have any transactions, Please invite a customer to start
            the transactions` : `Sorry no results found for the search.`}: {' '}
                    </div>
                </div>
            )
        }
        return customer?.customers?.filter(customerFilter).map((item, index) => (
            <ItemCard item={item} key={index} />
        ))
    }

    // ....  Button resizing onscroll - start !
    const [floatBtnLarge, setFloatBtnLarge] = useState(true)
    const [scrollTargetRef, target] = useCallbackRef()
    const { scrollDirection, isScrollingUp, isScrollingDown } =
        useScrollDirection(target)

    function useCallbackRef() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [value, setValue] = React.useState<any>()
        const ref = useCallback((node: HTMLElement) => {
            if (node !== null) setValue(node)
        }, [])
        return [ref, value]
    }

    useEffect(() => {
        if (scrollDirection) {
            if (isScrollingUp) {
                setFloatBtnLarge(true)
            }
            if (isScrollingDown) {
                setFloatBtnLarge(false)
            }
        }
    }, [isScrollingDown, isScrollingUp, scrollDirection])

    // ......  Button resizing onscroll - end.........!

    return (
        <div className="dark:bg-slate-900">
            {/* <!-- * Header --> */}
            <header className="flex flex-col gap-2 bg-white p-4 shadow-md dark:bg-slate-800">
                <div className="flex h-full w-full ">
                    <Link to="/more" className="flex w-4/5 flex-col">
                        <h1 className="text-lg font-semibold text-slate-600 dark:text-slate-100">
                            <FormattedMessage id="home.welcome" defaultMessage="Welcome 👋" />
                        </h1>
                        <h1 className="w-40 truncate bg-gradient-to-br from-blue-500 to-indigo-900 bg-clip-text text-lg font-black  font-semibold tracking-wide text-transparent dark:from-blue-200 dark:to-indigo-200">
                            {user?.organization?.name}
                        </h1>
                    </Link>
                    <div className="flex w-1/5 items-center justify-end ">
                        <Link to="/my-account">
                            <img
                                className="h-12 rounded-full aspect-square shadow-xs bg-slate-200 dark:bg-slate-900 p-2"
                                src={user?.profileImageUrl ?? profileImg}
                                alt=""
                            />
                        </Link>
                    </div>
                </div>

                {/* <!-- Search Customer Field --> */}

                <div className="relative flex w-full">
                    <input
                        type="text"
                        id="input"
                        autoComplete="off"
                        value={paginationParams.search}
                        className="h-10 w-full rounded bg-slate-100 pl-4 pr-5 outline-none dark:bg-slate-500 dark:text-slate-100 dark:placeholder-slate-200"
                        placeholder={intl.formatMessage({ id: `action.search` })}
                        onChange={(e) => {
                            setPaginationParams((prevState) => ({
                                ...prevState,
                                search: e.target?.value,
                            }))
                        }}
                    />
                </div>
            </header>
            <div
                ref={scrollTargetRef}
                className="card-main-container scrollDes relative divide-y pb-20 divide-slate-200 dark:divide-slate-800"
            >
                {renderChats()}
            </div>
            {/* <!-- Customer Card End -->
      <!-- Add Customer Button --> */}
            {user?.organization?.isSupplier && (
                <button
                    onClick={() => {
                        hapticFeedback()
                        setAddCustomerVisible(true)
                    }}
                    className={`add-cutomer-btn text-md rounded-full bg-gradient-to-br from-blue-500
                     to-indigo-700 p-3 text-white shadow-sm transition duration-500 ease-in-out`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white-300 h-7 w-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={
                                floatBtnLarge
                                    ? 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                    : 'M12 6v6m0 0v6m0-6h6m-6 0H6'
                            }
                        />
                    </svg>

                    {floatBtnLarge && (
                        <span className="pl-1 transition duration-500 ease-in-out">
                            <FormattedMessage
                                id="action.addCustomer"
                                defaultMessage="Add Customer"
                            />
                        </span>
                    )}
                </button>
            )}
            {addCustomerVisible && (
                <AddCustomerModal
                    isVisible={addCustomerVisible === true}
                    toggleVisibility={() => {
                        setAddCustomerVisible(
                            addCustomerVisible === true ? false : true
                        )
                    }}
                />
            )}
            <Footer />
        </div>
    )
}