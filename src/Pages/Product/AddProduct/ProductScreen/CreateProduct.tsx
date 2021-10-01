import React, { useEffect, useState } from "react";
import { SimpleHeader } from "../../../../Components/Header";
import { SimpleFooter } from "../../../../Components/Footer";
import ItemCard from "./ItemCard";
import "./CreateProduct.css";
import PricingTab from "./PricingTab";
import OthersTab from "./OthersTab";
import { useDispatch, useSelector } from "react-redux";
import { clearAll, selectAddProductInfo } from "../redux/addProductSlice";
import { IAddProduct, postAddProduct } from "src/API/products.axios";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";
import { useHistory } from "react-router";


function CreateProduct() {
  const [toggleState, setToggleState] = useState(1);
  const [isLoading, setIsLoading] = useState(false)

  const addProductInfo = useSelector(selectAddProductInfo)
  const { token } = useSelector(selectCredentials)

  const productDetails = {
    name: "Dairy Milk Silk",
    quantity: 15,
    price: 50,
    imgURL:
      "https://5.imimg.com/data5/WV/NN/MY-3473686/cadbury-dairymilk-silk-pack-of-5-500x500.png",
  };

  const dispatch = useDispatch()
  const history = useHistory()

  const toggleTabs = (index: any) => {
    setToggleState(index);
  };


  useEffect(() => {
    return () => {
      dispatch(clearAll())
    }
  }, [])

  const handleAddProduct = () => {
    const body: IAddProduct = {
      organizationCatalogueCategory: {
          name: productDetails.name,
          description: ''
      },
      itemSKUCode: addProductInfo?.others?.skuCode,
      taxEnabled: addProductInfo?.pricing?.taxEnabled,
      mrpPrice: addProductInfo?.pricing?.mrpPrice,
      rate: addProductInfo?.pricing?.salesPrice
    }
    setIsLoading(true)
    postAddProduct(token!, body)
      .then((response) => {
        setIsLoading(false)
        console.log('response', response)
        history.push('/my-products')
      })
      .catch(error => {
        setIsLoading(false)
        console.log('add product error', error)
      })
  }

  return (
    <div className="bg-white create-product-container">
      <SimpleHeader heading="Create Product" />
      <div className="w-11/12 pt-6 mx-auto">
        <h1 className="mb-2 font-bold text-gray-500">What is the product?</h1>
        {/* ===--===Product card===--=== */}
        <ItemCard productDetails={productDetails} />
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
            className={
              `${toggleState === 2 ? "btn-1-show-active" : "btn-1-hide-active"} px-8 py-1 font-semibold text-gray-500 focus:bg-blue-200 focus:px-8 focus:py-1 focus:rounded-full focus:text-blue-600`
            }
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
      <SimpleFooter btnName={isLoading ? "Loading..." : "Add Product"} isDisabled={isLoading} onClick={handleAddProduct} />
    </div>
  );
}

export default CreateProduct;
