import React, { useState } from "react";
import ToggleButton from "../../../../Components/ToggleButton";
import HSNmodal from "./HSNmodal";

function PricingTab() {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(true);
  };
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-base font-bold text-gray-500">MRP</p>
        <input
          type="text"
          placeholder="Enter price"
          className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 "
        />
      </div>
      <div>
        <p className="text-base font-bold text-gray-500">Sales Price</p>
        <input
          type="text"
          placeholder="Enter price"
          className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 "
        />
      </div>
      {/* Tax-info */}
      <div className="flex justify-between">
        <div className="text-base font-bold text-gray-500">Tax Info</div>
        <ToggleButton />
      </div>
      {/* ---------- */}
      <div>
        <p className="text-base text-gray-500">HSN Number</p>
        <div className="des-modal-btn">
          <input
            type="text"
            placeholder="Enter price"
            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 "
          />
          {/* Modal handle btn */}
          <button className="modal-btn " onClick={handleModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          {/* Modal */}
          <div>
            <HSNmodal trigger={modal} setModal={setModal}>
              <h3 className="font-bold text-gray-500">HSN Number</h3>
              <p className="mt-10 text-xs font-bold text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
                maiores repellat provident eaque eligendi hic sed quidem
                obcaecati exercitationem quia!
              </p>
            </HSNmodal>
          </div>
        </div>
      </div>
      {/* GST % */}
      <div>
        <p className="text-base text-gray-500">GST Percentage</p>
        <div className="flex">
          <input
            type="text"
            className="w-2/12 px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg rounded-tr-none rounded-br-none opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2"
          />
          <div className="flex items-center justify-center w-1/12 px-5 mt-2 font-bold text-blue-500 bg-blue-200 rounded-lg rounded-tl-none rounded-bl-none">
            %
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingTab;
