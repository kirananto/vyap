import React from "react";
import { useHistory } from "react-router";
import { SimpleHeader } from "../../../../Components/Header";
import DropDown from "./DropDown";

export default function AddProductMain() {
  const history = useHistory();
  return (
    <div className="w-full h-screen">
      <SimpleHeader
        heading="Add product"
        backFn={() => history.push("/my-products")}
      />
      <div className="w-11/12 p-3 pt-6 mx-auto mt-24">
        <h1 className="mb-2 font-bold text-gray-500">What is the product?</h1>
        <DropDown
          onSelect={(e: any) => console.log(e)}
          options={[
            {
              name: "Dairy Milk Silk",
              value: "Dairy Milk Silk",
              quantity: 15 + " gm",
              price: "MRP: " + 50,
              url: "https://5.imimg.com/data5/WV/NN/MY-3473686/cadbury-dairymilk-silk-pack-of-5-500x500.png",
            },
            {
              name: "Dairy Milk Silk",
              value: "Dairy Milk Silk",
              quantity: 18 + " gm",
              price: "MRP: " + 50,
              url: "https://5.imimg.com/data5/WV/NN/MY-3473686/cadbury-dairymilk-silk-pack-of-5-500x500.png",
            },
            {
              name: "Dairy Milk Silk",
              value: "Dairy Milk Silk",
              quantity: 18 + " gm",
              price: "MRP: " + 50,
              url: "https://5.imimg.com/data5/WV/NN/MY-3473686/cadbury-dairymilk-silk-pack-of-5-500x500.png",
            },
          ]}
        />
      </div>
    </div>
  );
}
