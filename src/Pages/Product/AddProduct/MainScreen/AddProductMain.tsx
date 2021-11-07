import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchCentralProducts } from "src/API/products.axios";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";
import { SimpleHeader } from "../../../../Components/Header";
import { setCentralCatalogue } from "../redux/addProductSlice";
import DropDown from "./DropDown";

export default function AddProductMain() {
  const { token } = useSelector(selectCredentials)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [options, setOptions] = useState<any[]>([])

  useEffect(() => {
    fetchCentralProducts(token!, 100, 0).then((result: any) => {
      console.log('result', result.data?.data)
      setOptions(result.data?.data)
    })
  }, [])
  return (
    <div className="w-full h-screen dark:bg-gray-900">
      <SimpleHeader
        heading="Add product"
        backFn={() => navigate("/my-products")}
      />
      <div className="w-11/12 p-3 pt-20 mx-auto dark:bg-gray-900">
        <h1 className="mb-2 font-bold text-gray-500 dark:text-gray-300">What is the product?</h1>
        <DropDown
          onSelect={(e: any) => dispatch(setCentralCatalogue(e))}
          options={options}
        />
      </div>
    </div>
  );
}
