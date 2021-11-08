import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToggleButton from "../../../../Components/ToggleButton";
import HSNmodal from "./HSNmodal";
import { selectAddProductInfo, setGstPercentage, setHsnNumber, setMrpPrice, setSalesPrice, setTaxEnabled } from '../redux/addProductSlice'

function PricingTab() {
  const [modal, setModal] = useState(false);

  const addProductInfo = useSelector(selectAddProductInfo)

  const dispatch = useDispatch()

  const handleModal = () => {
    setModal(true);
  };

  const handleGstPercentage = (event: any) => {
    const tempVal = event.target.value
    if (tempVal <= 100) {
      dispatch(setGstPercentage(tempVal))
    }
  }

  return (
    <div className="flex flex-col gap-5 mt-2 overflow-auto" style={{ height: 'calc(100vh - 22rem)' }}>
      <div>
        <p className="text-base font-bold text-gray-500">MRP</p>
        <input
          onChange={(event: any) => dispatch(setMrpPrice(event.target.value))}
          value={addProductInfo.pricing?.mrpPrice}
          type="number"
          placeholder="Enter price"
          className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
        />
      </div>
      <div>
        <p className="text-base font-bold text-gray-500">Sales Price</p>
        <input
          onChange={(event: any) => dispatch(setSalesPrice(event.target.value))}
          value={addProductInfo.pricing?.salesPrice}
          type="number"
          placeholder="Enter price"
          className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
        />
      </div>
      {/* Tax-info */}
      <div className="mt-2">
        <div className="text-base font-bold text-gray-500">Tax Info</div>
        <ToggleButton
          className="mt-4"
          onChange={() => dispatch(setTaxEnabled(!addProductInfo.pricing?.taxEnabled))}
          value={addProductInfo.pricing?.taxEnabled}
        />
      </div>
      {/* ---------- */}
      {!addProductInfo?.centralCatalogue?.id && addProductInfo.pricing?.taxEnabled && <div><div>
        <p className="text-base text-gray-500">HSN Number</p>
        <div className="des-modal-btn">
          <input
            onChange={(event: any) => dispatch(setHsnNumber(event.target.value))}
            value={addProductInfo.pricing?.hsn?.hsn}
            type="number"
            placeholder="Enter price"
            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
          />
          {/* Modal handle btn */}
          <button className="modal-btn dark:text-gray-300" onClick={handleModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/* Modal */}
          <div>
            <HSNmodal trigger={modal} setModal={setModal} />
          </div>
        </div>
      </div>
        <div>
          <p className="mt-4 text-base text-gray-500">GST Percentage</p>
          <div className="flex">
            <input
              onChange={handleGstPercentage}
              value={addProductInfo.pricing?.hsn?.gstPercentage ?? addProductInfo.pricing?.gstPercentage}
              type="number"
              max={100}
              className="w-3/12 px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg rounded-tr-none rounded-br-none opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
            />
            <div className="flex items-center justify-center w-1/12 px-5 mt-2 font-bold text-blue-500 bg-blue-200 rounded-lg rounded-tl-none rounded-bl-none">
              %
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default PricingTab;
