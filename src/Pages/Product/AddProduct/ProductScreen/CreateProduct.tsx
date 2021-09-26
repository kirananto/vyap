import React, { useState } from "react";
import { SimpleHeader } from "../../../../Components/Header";
import { SimpleFooter } from "../../../../Components/Footer";
import ItemCard from "./ItemCard";
import "./CreateProduct.css";
import PricingTab from "./PricingTab";
import OthersTab from "./OthersTab";


function CreateProduct() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTabs = (index: any) => {
    setToggleState(index);
  };
  return (
    <div className="bg-white create-product-container">
      <SimpleHeader heading="Create Product" />
      <div className="w-11/12 pt-6 mx-auto">
        <h1 className="mb-2 font-bold text-gray-500">What is the product?</h1>
        {/* ===--===Product card===--=== */}
        <ItemCard />
        {/* -------- */}
        <div className="flex justify-between px-10 py-4">
          <button
            onClick={() => toggleTabs(1)}
            className={
              toggleState === 1 ? "btn-1-show-active" : "btn-1-hide-active"
            }
          >
            Pricing
          </button>
          <button
            onClick={() => toggleTabs(2)}
            className="px-8 py-1 font-semibold text-gray-500 focus:bg-blue-200 focus:px-8 focus:py-1 focus:rounded-full focus:text-blue-600"
          >
            Others
          </button>
        </div>
        {/* -------- */}

        {/* -------------------TAB-1----------------- */}
        <div className={toggleState === 1 ? "tab-1-show" : "tab-1-hide"}>
          <PricingTab />
        </div>

        {/* -------------------TAB-1----------------- */}
        <div className={toggleState === 2 ? "tab-2-show" : "tab-2-hide"}>
         <OthersTab />
        </div>
      </div>
      <SimpleFooter btnName="Add Product" />
    </div>
  );
}

export default CreateProduct;
