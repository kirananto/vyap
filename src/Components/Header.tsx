import React from "react";
import { useHistory } from "react-router";
import walletSvg from "../assets/illustrations/wallet.svg"

function Header({ heading, subHeading, phoneNumber, shareDetails }: { heading?: string, subHeading?: string, phoneNumber?: string, shareDetails?: string }) {
  const history = useHistory()
  return (
    <div className="flex w-11/12 pt-2 pb-2 m-auto bg-white ">
      {/* back icon  */}
      <div onClick={() => history.goBack()} className="flex items-center justify-start ml-2 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>

      {/* Heading container */}
      <div className={`flex ${subHeading ? 'flex-col' : 'items-center'} w-4/5 pl-4 `}>
        <h1 className="text-lg font-semibold text-gray-600 font-ProductSans">
          {heading}
        </h1>
        {subHeading && (<h1 className="text-lg font-black text-transparent PRODUCT-SANS-BOLD bg-clip-text bg-gradient-to-br from-blue-500 to-indigo-900">
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      </a>)}
      {/* Share Icon container*/}
      {shareDetails && (<a href="" className="flex items-center justify-center rounded-full ali w-14 h-14">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </a>)}
    </div>
  );
}

function PaymentBottomHeader({ amount }: { amount?: string }) {
  const fontSize = {
    fontSize: "11.5px",
  };
  return (
    <div className="flex items-center justify-center w-full mt-1">
      {/* card container */}
      <div className="relative flex w-11/12 h-auto bg-gray-100 border border-gray-300 rounded-md">
        <div className="flex flex-col w-4/5 p-2 pl-3">
          <h6 style={fontSize} className="font-bold">
            {parseFloat(`${amount ?? 0}`) > 0 ? 'You have to pay' :  'You get'}
          </h6>
          <h1 className="text-4xl font-semibold">₹ {Math.abs(parseFloat(`${amount ?? 0}`)).toFixed(2)}</h1>
        </div>
        <div className="flex justify-end w-5/12 pr-4 ">
          <img
            className="self-end w-20 "
            src={walletSvg}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

// ! Simple Header with only one heading and back button -->
function SimpleHeader(props: { heading: string }) {
  const history = useHistory()
  return (
    <div className="flex items-center w-full h-16 pt-2 pb-2 m-auto shadow">
    {/* back icon  */}
    <div onClick={() => history.goBack()} className="flex items-center justify-start ml-2 cursor-pointer">
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
    </div>

      {/* Heading container */}
      <div className="flex flex-col w-4/5 pl-4 ">
        <h1 className="text-xl font-bold text-gray-600 font-ProductSans">
          {props.heading}
        </h1>
      </div>
    </div>
  );
}

export { Header, PaymentBottomHeader, SimpleHeader };
