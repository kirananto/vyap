import React from "react";
import { useHistory } from "react-router";
import { SimpleHeader } from "../../../../Components/Header";
// import DropDown from "./DropDown";

export default function AddProductMain() {
  const history = useHistory()
  return (
    <>
      <SimpleHeader heading="Add product" backFn={() => history.push('/my-products')} />
      <div className="w-11/12 mx-auto">
        <h1>What is the product?</h1>
        
      </div>
    </>
  );
}
