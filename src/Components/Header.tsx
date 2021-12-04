import React from "react";
import { useNavigate } from "react-router";
import walletSvg from "../assets/illustrations/wallet.svg"

function Header({ heading, subHeading, phoneNumber, shareDetails, onBackClick, isSticky, backDisabled }: { heading?: string, subHeading?: string, phoneNumber?: string, shareDetails?: string, onBackClick?: any, isSticky: boolean, backDisabled?: boolean }) {
  const navigate = useNavigate()
  return (
    <div className={isSticky ? 'flex items-center w-full h-16 pt-2 pb-2 z-20 m-auto shadow fixed bg-white dark:bg-gray-800 dark:text-gray-300 top-0' : "flex w-11/12 pt-2 pb-2 m-auto "}>
      {/* back icon  */}
      <div onClick={onBackClick ? onBackClick : () => navigate(-1)} className="flex items-center justify-start ml-2 cursor-pointer">
        {!backDisabled ? <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 dark:text-gray-300"
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
        </svg> : null}
      </div>

      {/* Heading container */}
      <div className={`flex ${subHeading ? 'flex-col' : 'items-center'} w-4/5 pl-4 text-gray-600 dark:text-gray-300 `}>
        <h1 className="text-lg font-semibold  font-ProductSans">
          {heading}
        </h1>
        {subHeading && (<h1 className="text-lg font-black text-transparent product_sans_bold bg-clip-text bg-gradient-to-br from-blue-500 to-indigo-900 dark:from-blue-200 dark:to-indigo-200">
          {subHeading}
        </h1>)}
      </div>
      {/* Right Icon container*/}
      {phoneNumber && (<a href={`tel:${phoneNumber}`} className="flex items-center justify-center rounded-full ali w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-900">
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
      </a>)}
      {/* Share Icon container*/}
      {shareDetails && (<a href="" className="flex items-center justify-center rounded-full ali w-14 h-14">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 dark:text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </a>)}
    </div>
  );
}

function PaymentBottomHeader({ amount, isLoading }: { amount?: string, isLoading: boolean }) {
  const fontSize = {
    fontSize: "11.5px",
  };

  const parsedAmount = parseFloat(`${amount ?? 0}`)

  return (
    <div className="flex items-center justify-center w-full mt-1">
      {/* card container */}
      <div className={`relative flex w-11/12 h-auto bg-gray-100 dark:bg-gray-700 border ${parsedAmount === 0 && isLoading === false ? 'border-green-400' : 'border-gray-400'} rounded-md`}>
        <div className="flex flex-col w-4/5 p-2 pl-3">
          {isLoading ? <div /> : <>
            {parsedAmount !== 0 && <h6 style={fontSize} className="font-bold text-gray-800 dark:text-gray-300">
              {parsedAmount > 0 ? 'You have to pay' : 'You get'}
            </h6>}
            {parsedAmount !== 0 && <h1 className="text-4xl font-semibold text-gray-700 dark:text-gray-200">₹ {Math.abs(parseFloat(`${amount ?? 0}`)).toFixed(2)}</h1>}
            {parsedAmount == 0 && <h1 className={`text-md font-semibold ${parsedAmount == 0 ? 'text-green-800 dark:text-green-400' : 'text-gray-700 dark:text-gray-200'}`}>Dues Settled</h1>}
          </>}
        </div>
        <div className="flex justify-end w-5/12 pr-4 ">
          {isLoading ? <div /> : parsedAmount !== 0 ? <img
            className="self-end w-20 "
            src={walletSvg}
            alt=""
          /> : <svg xmlns="http://www.w3.org/2000/svg" className="mt-1 text-green-400 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>}
        </div>
      </div>
    </div>
  );
}

// ! Simple Header with only one heading and back button -->
function SimpleHeader(props: { heading: string, backFn?: any, backDisabled?: boolean }) {
  const navigate = useNavigate()
  return (
    <div className="flex items-center w-full h-16 pt-2 pb-2 z-20 m-auto shadow fixed bg-white dark:bg-gray-800 dark:text-gray-300 top-0">
      {/* back icon  */}
      <div onClick={props.backFn ? props.backFn : () => navigate(-1)} className="flex items-center justify-start ml-2 cursor-pointer">
        {!props.backDisabled ? <svg
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
        </svg> : null}
      </div>

      {/* Heading container */}
      <div className="flex flex-col w-4/5 pl-4 ">
        <h1 className="text-xl font-bold text-gray-600 dark:text-gray-300 font-ProductSans">
          {props.heading}
        </h1>
      </div>
    </div>
  );
}

export { Header, PaymentBottomHeader, SimpleHeader };
