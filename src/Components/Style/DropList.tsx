import React from 'react'

type IAppearance = 'primary' | 'danger'

interface IProps {
    trigger: any
    list: Array<{
        label: string,
        appearance: IAppearance
    }>
    isOpen: boolean
    onClick: any
}

const addIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
    )
}

const removeIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    )
}

const getAppearance = (appearance: IAppearance): {
    focus: string,
    text: string,
    icon: any
} => {
    switch (appearance) {
        case 'primary':
            return {
                text: 'text-gray-600',
                focus: 'focus:border-purple-600 focus:bg-purple-100',
                icon: addIcon()
            }
        
        case 'danger':
            return {
                text: 'text-red-600',
                focus: 'focus:border-red-600 focus:bg-purple-100',
                icon: removeIcon()
            }
        default:
            return {
                text: 'text-gray-600',
                focus: 'focus:border-gray-600 focus:bg-purple-100',
                icon: addIcon()
            }
    }
}

export default function DropList(props: IProps) {
    return (
        <div className="relative inline-block text-left">
            <div onClick={props.onClick}>{props.trigger}</div>
            {props.isOpen && (<div className="z-50 w-max text-gray-600 origin-top-right absolute right-4 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                <div className="py-2" role="none">
                    {props.list.map((mapItem, mapIndex) => (
                        <div key={mapIndex} className={`flex items-center gap-2 border-l-4 border-white ${getAppearance(mapItem.appearance).focus} px-4 py-2`}>
                            <div className={`flex ${getAppearance(mapItem.appearance).text}`}>
                                {getAppearance(mapItem.appearance).icon}
                            </div>
                            <div className={`flex font-bold ${getAppearance(mapItem.appearance).text} text-base`}>
                                {mapItem.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>)}
        </div>
    )
}