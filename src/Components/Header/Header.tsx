import React from 'react'
import { useNavigate } from 'react-router'
import { hapticFeedback } from 'src/utils/vibrate'

export default function Header({
    heading,
    subHeading,
    phoneNumber,
    shareAction,
    onBackClick,
    isSticky,
    backDisabled,
}: {
  heading?: string;
  subHeading?: string;
  phoneNumber?: string;
  shareAction?: () => void;
  onBackClick?: () => void;
  isSticky: boolean;
  backDisabled?: boolean;
}) {
    const navigate = useNavigate()
    return (
        <div
            className={
                isSticky
                    ? 'flex items-center w-full h-16 pt-2 pb-2 z-20 m-auto  drop-shadow-md fixed bg-white dark:bg-slate-800 dark:text-slate-300 top-0'
                    : 'flex w-11/12 pt-4 pb-2 m-auto '
            }
        >
            {/* back icon  */}
            {!backDisabled ? (
                <div
                    onClick={() => {
                        hapticFeedback()
                        onBackClick ? onBackClick() : navigate(-1)
                    }}
                    className="flex items-center justify-start ml-2 cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 dark:text-slate-300"
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
                </div>
            ) : null}

            {/* Heading container */}
            <div
                className={`flex ${subHeading ? 'flex-col' : 'items-center'}   ${
                    shareAction ? 'w-9/12' : 'w-3/5 sm:w-4/5'
                }   ${
                    backDisabled ? 'pl-1' : 'pl-4'
                } text-slate-600 dark:text-slate-300 `}
            >
                <h1 className="text-md font-semibold">{heading}</h1>
                {subHeading && (
                    <h1
                        className={`text-md w-full font-black sm:text-lg text-transparent  tracking-wide truncate bg-clip-text bg-gradient-to-br from-blue-500 to-indigo-900 dark:from-blue-200 dark:to-indigo-200`}
                    >
                        {subHeading}
                    </h1>
                )}
            </div>
            {/* Right Icon container*/}
            {phoneNumber && (
                <a
                    href={`tel:${phoneNumber}`}
                    className="flex items-center justify-center aspect-square rounded-full w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-900"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
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
                </a>
            )}
            {/* Share Icon container*/}
            {shareAction && (
                <a
                    onClick={() => {
                        hapticFeedback()
                        shareAction()
                    }}
                    className="flex items-center justify-center rounded-full ali w-14 h-14"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 dark:text-slate-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                    </svg>
                </a>
            )}
        </div>
    )
}