import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToggleButton from "../../../../Components/ToggleButton";
import HSNmodal from "./HSNmodal";
import { Min, validate } from "class-validator";

import {
  selectAddProductInfo,
  setGstPercentage,
  setHsnNumber,
  setMrpPrice,
  setSalesPrice,
  setTaxEnabled,
} from "../redux/addProductSlice";

export class PostMRP {
  @Min(1)
  mrpPrice!: number;
}

export class PostSale {
  @Min(1)
  salePrice!: number;
}

export class PostHSN {
  @Min(1)
  hsnNum!: number;
}

export class PostGST {
  @Min(1)
  gst!: number;
}

interface Props {
  setValidation: (
    arg1: boolean,
    arg2: boolean,
    arg3: boolean,
    arg4: boolean
  ) => void;
}

function PricingTab({ setValidation }: Props) {
  const [modal, setModal] = useState(false);

  const [isValidMRP, setIsValidMRP] = useState<boolean>(false);
  const [isValidSalePrice, setIsValidSalePrice] = useState<boolean>(false);
  const [isValidHSN, setIsValidHSN] = useState<boolean>(true);
  const [isValidGST, setIsValidGST] = useState<boolean>(true);

  setValidation(isValidMRP, isValidSalePrice, isValidHSN, isValidGST);

  const addProductInfo = useSelector(selectAddProductInfo);

  const dispatch = useDispatch();

  const handleModal = () => {
    setModal(true);
  };

  const handleGstPercentage = (event: any) => {
    const tempVal = event.target.value;
    if (tempVal <= 100) {
      dispatch(setGstPercentage(tempVal));
      handleValidation("gst", event.target.value);
      console.log("gst" + event.target.value);
    }
  };

  const handleValidation = (type: string, value: number) => {
    if (type == "mrp") {
      let postMrp = new PostMRP();
      postMrp.mrpPrice = Number(value);

      validate(postMrp).then((errors) => {
        if (errors.length > 0) {
          console.log("validation failed. errors mrp: ", errors);
          setIsValidMRP(false);
        } else {
          setIsValidMRP(true);
        }
      });
    } else if (type == "hsn") {
      let postHSN = new PostHSN();
      postHSN.hsnNum = value * 1;

      validate(postHSN).then((errors) => {
        if (errors.length > 0) {
          console.log("validation failed. errors mrp: ", errors);
          setIsValidHSN(false);
        } else {
          setIsValidHSN(true);
        }
      });
    } else if (type == "gst") {
      let postGST = new PostGST();
      postGST.gst = value * 1;
      console.log("gst test");
      validate(postGST).then((errors) => {
        if (errors.length > 0) {
          console.log("validation failed. errors mrp: ", errors);
          setIsValidGST(false);
        } else {
          setIsValidGST(true);
        }
      });
    } else {
      let postSalePrice = new PostSale();
      postSalePrice.salePrice = Number(value);
      validate(postSalePrice).then((errors) => {
        if (errors.length > 0) {
          console.log("validation failed. errors: ", errors);
          setIsValidSalePrice(false);
        } else {
          setIsValidSalePrice(true);
        }
      });
    }
  };

  return (
    <div
      className="flex flex-col gap-5 mt-2 pb-24 overflow-auto"
      style={{ height: "calc(100vh - 22rem)" }}
    >
      <div>
        <p className="text-base font-bold text-gray-500">MRP</p>
        <input
          onChange={(event: any) => {
            dispatch(setMrpPrice(event.target.value));
            handleValidation("mrp", event.target.value);
          }}
          value={addProductInfo.pricing?.mrpPrice}
          type="number"
          min="0"
          placeholder="Enter price"
          className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
        />

        <span
          className={
            "flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 " +
            (isValidMRP ? "hidden" : "")
          }
        >
          * Enter Valid MRP price !
        </span>
      </div>
      <div>
        <p className="text-base font-bold text-gray-500">Sale Price</p>
        <input
          onChange={(event: any) => {
            dispatch(setSalesPrice(event.target.value));
            handleValidation("sale", event.target.value);
          }}
          value={addProductInfo.pricing?.salesPrice}
          type="number"
          min="0"
          placeholder="Enter price"
          className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
        />
        <span
          className={
            "flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 " +
            (isValidSalePrice ? "hidden" : "")
          }
        >
          * Enter valid Sale price !
        </span>
      </div>
      {/* Tax-info */}
      <div className="mt-2">
        <div className="text-base font-bold text-gray-500">Tax Info</div>
        <ToggleButton
          className="mt-4"
          onChange={() => {
            dispatch(setTaxEnabled(!addProductInfo.pricing?.taxEnabled));
            setIsValidHSN(!isValidHSN);
            setIsValidGST(!isValidGST);
          }}
          value={addProductInfo.pricing?.taxEnabled}
        />
      </div>
      {/* ---------- */}
      {!addProductInfo?.centralCatalogue?.id &&
        addProductInfo.pricing?.taxEnabled && (
          <div>
            <div>
              <p className="text-base text-gray-500">HSN Number</p>
              <div className="des-modal-btn">
                <input
                  onChange={(event: any) => {
                    dispatch(setHsnNumber(event.target.value));
                    handleValidation("hsn", event.target.value);
                  }}
                  value={addProductInfo.pricing?.hsn?.hsn}
                  type="number"
                  placeholder="Enter HSN number"
                  className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
                />

                {/* Modal handle btn */}
                <button
                  className="modal-btn dark:text-gray-300"
                  onClick={handleModal}
                >
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

                <span
                  className={
                    "flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 " +
                    (isValidHSN ? "hidden" : "")
                  }
                >
                  * Enter valid HSN !
                </span>
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
                  value={
                    addProductInfo.pricing?.hsn?.gstPercentage ??
                    addProductInfo.pricing?.gstPercentage
                  }
                  type="number"
                  max={100}
                  className="w-3/12 px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg rounded-tr-none rounded-br-none opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
                />
                <div className="flex items-center justify-center w-1/12 px-5 mt-2 font-bold text-blue-500 bg-blue-200 rounded-lg rounded-tl-none rounded-bl-none">
                  %
                </div>
                <span
                  className={
                    "flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 " +
                    (isValidGST ? "hidden" : "")
                  }
                >
                 * Enter valid GST !
                </span>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default PricingTab;
