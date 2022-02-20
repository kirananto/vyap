import React from 'react'
import { hapticFeedback } from 'src/utils/vibrate'
interface ButtonInterface {
    id?: string
    children: JSX.Element | string
    className?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLInputElement>
    isDisabled?: boolean
}
export default function Button({ id, children, onClick, className, isDisabled }: ButtonInterface) {
    return (
        <button
            type="submit"
            id={id}
            onClick={(event) => {
                hapticFeedback()
                if (onClick) {
                    onClick(event)
                }
            }}
            className={`block w-full px-4 py-2  font-semibold text-white transition duration-500 ease-in-out transform rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 hover:bg-indigo-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 disabled:from-slate-500 disabled:to-slate-500 disabled:cursor-not-allowed ${className}`}
            disabled={isDisabled}
        >
            {children}
        </button>
    )
}