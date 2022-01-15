
import React from 'react'

export default function FallBackUI() {
    return <div className="h-screen flex justify-center items-center">
        <div className="grid text-gray-700 dark:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 justify-self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h1>Loading Awesome Experience...</h1>
        </div>
    </div>
}