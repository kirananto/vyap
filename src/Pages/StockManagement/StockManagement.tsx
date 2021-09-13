import React from "react";
import { SimpleHeader } from "../../Components/Header";
import ToggleButton from "../../Components/ToggleButton";
import { SimpleFooter } from "../../Components/Footer";
import { Link } from "react-router-dom";

export default function StockManagement() {
  return (
    <>
      <SimpleHeader heading="Stock Management" />
      <div className="flex flex-col gap-4 pt-4 pl-8 bg-white">
        <div className="flex flex-col gap-3">
          <h1 className="text-sm text-gray-500">Low stock warning</h1>
          <ToggleButton />
        </div>

        <div className="flex flex-col gap-3 mb-7">
          <h1 className="text-sm text-gray-500">Allow negative purchases</h1>
          <ToggleButton />
        </div>

        <h1 className="text-lg font-bold text-gray-500">Stock management</h1>
        <div>
          <Link to="/purchase-order" className="font-medium text-blue-600 underline">10 Purchase orders</Link>
        </div>
      </div>
      <SimpleFooter btnName="Add Purchase Order" />
    </>
  );
}
