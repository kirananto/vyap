import React from 'react'

function PaymentInfo(props: { heading: string; info: string; more?: string[] }) {
    return (
        <div className="mt-1">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{props.heading}</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{props.info ?? 'No Information'}</p>
            {
                props.more?.map((item, index) => (
                    <p className="text-sm text-slate-700 dark:text-slate-300" key={`${index}`}>{item}</p>
                ))
            }
        </div>
    )
}

function PaymentInfoIcon(props: { heading: string; info: string }) {
    return (
        <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-200">{props.heading}</p>
            <div className="flex items-center gap-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-green-300 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                    />
                </svg>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-100">{props.info}</p>
            </div>
        </div>
    )
}

export { PaymentInfo, PaymentInfoIcon }