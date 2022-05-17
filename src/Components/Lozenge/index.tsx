import React, { ReactNode } from 'react'

export default function Lozenge({ content, color = 'green', square }: { content: ReactNode, color?: 'green' | 'purple' | 'blue' | 'red', square?: boolean }) {
    function getColor() {
        switch (color) {
            case 'green':
                return `bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-400 border-green-400`
            case 'purple':
                return `bg-purple-200 text-purple-700 dark:bg-purple-900 dark:text-purple-400 border-purple-400`
            case 'blue':
                return `bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-400 border-blue-400`
            case 'red':
                return `bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-400 border-red-400`
            default:
                return `bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-400 border-green-400`
        }
    }

    return (
        <div
            className={` flex flex-none items-center justify-center px-3 py-1 text-xs font-bold dark:bg-opacity-80 border text-center ${square ? `rounded-md` : 'rounded-full'} min-w-min ${getColor()}`}
        >
            {content}
        </div>)
}