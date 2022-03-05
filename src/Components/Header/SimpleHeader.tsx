import React from 'react'
import { useNavigate } from 'react-router'
import { hapticFeedback } from 'src/utils/vibrate'

// ! Simple Header with only one heading and back button -->
export default function SimpleHeader(props: {
    heading: string;
    backFn?: () => void ;
    backDisabled?: boolean;
  }) {
    const navigate = useNavigate()
    return (
        <div className="flex items-center w-full h-16 pt-2 pb-2 z-20 m-auto  drop-shadow-md fixed bg-white dark:bg-slate-800 dark:text-slate-300 top-0">
            {/* back icon  */}
            <div
                onClick={() => {
                    hapticFeedback()
                    props.backFn ? props.backFn() : navigate(-1)
                }}
                className="flex items-center justify-start ml-2 cursor-pointer"
            >
                {!props.backDisabled ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                ) : null}
            </div>
  
            {/* Heading container */}
            <div className="flex flex-col w-4/5 pl-4 ">
                <h1 className="text-xl font-bold text-slate-600 dark:text-slate-300">
                    {props.heading}
                </h1>
            </div>
        </div>
    )
}