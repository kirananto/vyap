import React from 'react'

interface iProps {
    size? : number
}
const ArrowUpIcon = ({size} : iProps) => {

    if(!size)
        size = 6
        
    return <>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-${size} h-${size} cursor-pointer`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
            />
        </svg>
    </>
}

export default ArrowUpIcon