import React from 'react'

export default function Spinner({ fullScreen } : { fullScreen?: boolean }) {
    return (
        <div className={`${fullScreen ? 'h-screen' : ''} flex justify-center items-center`}>
            <div className="grid text-yellow-700 dark:text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 justify-self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h1 className="text-slate-700 dark:text-slate-200">Loading Awesome Experience...</h1>
            </div>
        </div>
    )
}