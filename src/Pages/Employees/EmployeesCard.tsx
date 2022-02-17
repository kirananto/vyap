import React from 'react'

interface IProps { 
  name: string
  orderTaker: string
}
export default function EmployeesCard(props: IProps) {
    return (
        <div className="flex w-11/12 px-2 py-4 bg-white rounded-md shadow dark:bg-slate-800">
            {/* Col-1 ===================== */}
            {/* icon */}
            <div className="flex items-center justify-center w-1/4 ">
                <div className="flex items-center justify-center w-10 h-10 rounded-full ali bg-gradient-to-br from-blue-500 to-indigo-900">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                    </svg>
                </div>
            </div>

            {/* Col-2 ===================== */}
            <div className="flex flex-col justify-center w-3/4">
                <h1 className="font-bold text-slate-600 dark:text-slate-300">{props.name}</h1>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-200">Order taker - {props.orderTaker}</p>
            </div>
            {/* Col-3 ===================== */}
            {/* option icon */}
            <div className="flex items-center justify-end w-1/4 pr-1 dark:text-slate-200 ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                </svg>
            </div>
        </div>
    )
}