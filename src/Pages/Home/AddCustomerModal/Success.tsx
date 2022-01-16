import React from 'react'

interface IProps {
  text: string
  toggleVisibility: () => void
}
export default function Success({
    toggleVisibility,
    text
}: IProps) {

    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-36 w-36 m-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="#16af81">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <div className="text-xl text-gray-500 mb-8 font-bold dark:text-gray-200"> {text}</div>
            <button onClick={toggleVisibility} className="save-btn p-3 w-48 text-indigo-700 rounded-full border border-indigo-700  dark:border-indigo-200 dark:text-indigo-200">
        Close
            </button>
        </div>)
}