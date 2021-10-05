import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchCentralProducts } from "src/API/products.axios";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";
import { SimpleHeader } from "../../../../Components/Header";
import { setCentralCatalogue } from "../redux/addProductSlice";
import DropDown from "./DropDown";

export default function AddProductMain() {
  const { token } = useSelector(selectCredentials)
  const history = useHistory();
  const dispatch = useDispatch()

  const [options, setOptions] = useState<any[]>([])

  useEffect(() => {
    fetchCentralProducts(token!, 100, 0).then((result: any) => {
      console.log('result', result.data?.data)
      setOptions(result.data?.data)
      // setOptions([
      //   {
      //     name: "Dairy Milk Silk",
      //     value: "Dairy Milk Silk",
      //     quantity: 15 + " gm",
      //     price: "MRP: " + 50,
      //     url: "https://5.imimg.com/data5/WV/NN/MY-3473686/cadbury-dairymilk-silk-pack-of-5-500x500.png",
      //   },
      //   {
      //     name: "Dairy Milk Silk",
      //     value: "Dairy Milk Silk",
      //     quantity: 18 + " gm",
      //     price: "MRP: " + 50,
      //     url: "https://5.imimg.com/data5/WV/NN/MY-3473686/cadbury-dairymilk-silk-pack-of-5-500x500.png",
      //   },
      //   {
      //     name: "Dairy Milk Silk",
      //     value: "Dairy Milk Silk",
      //     quantity: 18 + " gm",
      //     price: "MRP: " + 50,
      //     url: "https://5.imimg.com/data5/WV/NN/MY-3473686/cadbury-dairymilk-silk-pack-of-5-500x500.png",
      //   },
      // ])
    })
  }, [])
  return (
    <div className="w-full h-screen">
      <SimpleHeader
        heading="Add product"
        backFn={() => history.push("/my-products")}
      />
      <div className="w-11/12 p-3 pt-6 mx-auto mt-24">
        <h1 className="mb-2 font-bold text-gray-500">What is the product?</h1>
        <DropDown
          onSelect={(e: any) => dispatch(setCentralCatalogue(e))}
          options={options}
        // options={[
        //   {
        //     name: "Dairy Milk Silk",
        //     value: "Dairy Milk Silk",
        //     quantity: 15 + " gm",
        //     price: "MRP: " + 50,
        //     url: "https://5.imimg.com/data5/WV/NN/MY-3473686/cadbury-dairymilk-silk-pack-of-5-500x500.png",
        //   },
        //   {
        //     name: "Dairy Milk Silk",
        //     value: "Dairy Milk Silk",
        //     quantity: 18 + " gm",
        //     price: "MRP: " + 50,
        //     url: "https://5.imimg.com/data5/WV/NN/MY-3473686/cadbury-dairymilk-silk-pack-of-5-500x500.png",
        //   },
        //   {
        //     name: "Dairy Milk Silk",
        //     value: "Dairy Milk Silk",
        //     quantity: 18 + " gm",
        //     price: "MRP: " + 50,
        //     url: "https://5.imimg.com/data5/WV/NN/MY-3473686/cadbury-dairymilk-silk-pack-of-5-500x500.png",
        //   },
        // ]}
        />
      </div>
    </div>
  );
}
