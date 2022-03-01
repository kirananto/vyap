import React from 'react'
import walletSvg from '../assets/illustrations/wallet.svg'

export default function PaymentBottomHeader({
    amount,
    isLoading,
}: {
    amount?: string;
    isLoading: boolean;
}) {

    const parsedAmount = parseFloat(`${amount ?? 0}`)

    return (
        <div className="flex items-center justify-center w-full mt-1">
            {/* card container */}
            <div
                className={`relative flex w-11/12 h-auto bg-slate-100 dark:bg-slate-700 border ${parsedAmount === 0 && isLoading === false
                    ? 'border-green-400 dark:border-green-700'
                    : 'border-slate-400 dark:border-slate-600'
                } rounded-md`}
            >
                <div className="flex flex-col w-4/5 p-2 pl-3">
                    {isLoading ? (
                        <div className="ml-2 my-4 text-xs dark:text-slate-300">
                            Loading...
                        </div>
                    ) : (
                        <>
                            {parsedAmount !== 0 && (
                                <>
                                    <h6
                                        className="text-xs font-bold text-slate-800 dark:text-slate-300"
                                    >
                                        {parsedAmount > 0 ? 'You have to pay' : 'You get'}
                                    </h6>
                                    <h1 className="text-3xl font-bold text-slate-700 dark:text-slate-200 truncate">
                                        {Math.abs(parseFloat(`${amount ?? 0}`)).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                    </h1>
                                </>
                            )}
                            {parsedAmount === 0 && (
                                <h1
                                    className={`text-md font-semibold ${parsedAmount === 0
                                        ? 'text-green-800 dark:text-green-500'
                                        : 'text-slate-700 dark:text-slate-200'
                                    }`}
                                >
                                    Dues Settled
                                </h1>
                            )}
                        </>
                    )}
                </div>
                <div className="flex justify-end w-5/12 pr-4 ">
                    {isLoading ? (
                        <div />
                    ) : parsedAmount !== 0 ? (
                        <img className="self-end w-20" loading="lazy" src={walletSvg} alt="Wallet" />
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mt-1 text-green-400 dark:text-green-600 h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    )}
                </div>
            </div>
        </div>
    )
}