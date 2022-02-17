import React from 'react'
import { Link } from 'react-router-dom'
import { format, isToday, isYesterday } from 'date-fns'
import { useSelector } from 'react-redux'
import { selectCredentials } from '../Login/credentialsSlice'
import { hapticFeedback } from 'src/utils/vibrate'
import type { IInbox } from './customersSlice'

interface IProps {
  item: IInbox;
}

export function ItemCard({ item }: IProps) {
    const { user } = useSelector(selectCredentials)

    function renderTime(date: Date) {
        if (isToday(date)) {
            return format(date, 'hh:mm aa')
        }
        if (isYesterday(date)) {
            return 'Yesterday'
        }
        return format(date, 'dd/MM/yyyy')

    }
    return (

        <div className="card-main">
            <Link to={`/chat/${item.id}`} onClick={hapticFeedback} className="flex gap-2 px-4 w-full">
                <div className="w-1/5 lg:w-24">
                    {item.isSupplier && user?.organization?.isSupplier ? <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 p-2 mt-4 text-white rounded-full bg-gradient-to-br from-green-300 to-green-600 dark:from-green-600 dark:to-green-900"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> : <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 p-2 mt-4 text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                        />
                    </svg> }
                </div>
                <div className="w-3/5 mt-4">
                    {user?.organization?.isSupplier && <div>
                        {item.isSupplier ? <div className="text-green-700 border bg-green-100 tracking-wider w-min rounded px-1 -mt-2 text-xs dark:bg-green-800 dark:border-green-900 dark:text-green-300"> Retailer </div> : <div className="text-blue-700 bg-blue-100 tracking-wider w-min rounded px-2 text-xs dark:bg-blue-900 dark:text-blue-100"> Supplier </div>}
                    </div>}
                    <h2 className="font-extrabold text-slate-600 dark:text-slate-200 truncate">{item.recipient?.name}</h2>
                    <h5 className="text-xs text-slate-500 dark:text-slate-400 leading truncate">{item.lastMsg}</h5>
                </div>
                <div className="w-1/5 lg:w-auto mt-5 text-right">

                    <h6 className="text-xs text-slate-500 dark:text-slate-400"> {renderTime(new Date(item.updatedAt))}</h6>
                    {item.unseenNumbers ? <div className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-600 bg-green-100 rounded-full">
                        {item.unseenNumbers}
                    </div> : null}
                </div>
            </Link>
        </div>

    )
}