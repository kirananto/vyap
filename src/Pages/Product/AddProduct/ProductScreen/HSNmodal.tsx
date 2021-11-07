import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { getHSNs } from "src/API/hsn.axios";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";
import "./HSNmodal.css";


function HSNmodal(props: any) {
  const { token } = useSelector(selectCredentials)
  const intl = useIntl()
  const [searchValue, setSearchValue] = useState(undefined)
  const [hsnCodes, setHSNCodes] = useState(Array(10).fill(1))
  const handleInputChange = (event: any) => {
    setSearchValue(event.target?.value);
  };

  useEffect(() => {
    getHSNs({ token: token!, limit: 10, offset: 0, search: searchValue}).then(result => {
      setHSNCodes(result.data?.data)
    })
  }, [searchValue])

  
  return props.trigger ? (
    <div className="border-t border-gray-100 shadow-2xl popup-container dark:bg-gray-700 dark:border-gray-800">
      <div className="popup-inner">
        <button className="popup-btn" onClick={() => props.setModal(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-blue-600 dark:text-blue-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h3 className="font-bold text-gray-500 dark:text-gray-200">HSN Number</h3>
        <div className="text-gray-400 dark:text-gray-300 mt-2 text-xs font-light">
        <strong className="font-bold text-gray-600 dark:text-gray-200">Disclaimer:</strong> Rates given below are updated up to the GST (Rate) notification no. 05/2020 dated 16th October 2020 to the best of our information. We have sourced the HSN code information from the master codes published on the NIC's GST e-Invoice system. There may be variations due to updates by the government. Kindly note that we are not responsible for any wrong information. If you need information about the "Effective Date" for every GST or cess rates, then please visit the CBIC website.
        </div>
        <div className="relative flex w-full mt-8">
          <input
            type="text"
            id="input"
            value={searchValue}
            className="w-full h-10 pl-4 pr-5 bg-gray-100 dark:bg-gray-500 dark:text-gray-100 rounded outline-none "
            placeholder={intl.formatMessage({ id: `action.search` })}
            onChange={handleInputChange}
          />
        </div>
        <div className=" mt-4 overflow-scroll  overflow-x-hidden h-64">
          {hsnCodes.map((mapItem, index) => (
          <div className="border border-gray-300 dark:border-gray-600 rounded p-4 my-2">
            <div className="text-gray-700 dark:text-gray-300">{mapItem.chapter} </div>
            <div className="mt-1 text-gray-500 dark:text-gray-400 text-xs"> {mapItem.description} </div>
            <div className="mt-2 grid grid-cols-2 text-gray-700 dark:text-gray-300">
              <div>HSN: {mapItem.hsn} </div> 
              <div>Rate: {mapItem.gstPercentage}% </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  ) : null;
}

export default HSNmodal;
