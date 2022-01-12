import React from 'react'
import { hapticFeedback } from 'src/utils/vibrate'
interface ButtonInterface {
    id?: string
    children: any
    className?: string
    onClick?: any
    isDisabled?: boolean
}
export default function Button({ id, children, onClick, className, isDisabled }: ButtonInterface) {
    return (
        <button
            type="submit"
            id={id}
            onClick={() => {
                hapticFeedback()
                onClick()
            }}
            className={`block w-full px-4 py-2  font-semibold text-white transition duration-500 ease-in-out transform rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 hover:bg-indigo-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 disabled:from-gray-500 disabled:to-gray-500 disabled:cursor-not-allowed ${className}`}
            disabled={isDisabled}
        >
            {children}
        </button>
    )
}
