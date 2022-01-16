import React from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import useOnlineStatus from '@rehooks/online-status'

export function RequiredAuth({ children }: { children: JSX.Element }) {

    const { user, token } = useSelector(selectCredentials)
    const navigate = useNavigate()
    const onlineStatus = useOnlineStatus()

    if (user === undefined || token === undefined) {
        navigate('/login')
    }

    return <div>
        {onlineStatus ? null : <div
            className={`fixed top-1 flex flex-row items-center justify-between w-36 bg-yellow-200 px-4 py-2 text-yellow-900 shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 rounded-md border border-2 border-yellow-800 transition-all duration-500 ease-in-out  self-center z-50`}
            style={{ left: `calc(50% - 4rem)` }}
        >
            <div className="text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                </svg>
            </div>
            <div className="flex flex-col items-start justify-center ml-1 cursor-default">
                <p className="text-xs text-yellow-900 mt-0 leading-relaxed tracking-wider">
                    No Network
                </p>
            </div>
        </div>}
        {children}
    </div>
}