import React, { useEffect, useState } from "react";
import { SimpleHeader } from "../../../../Components/Header";
import { SimpleFooter } from "../../../../Components/Footer";
import ItemCard from "./ItemCard";
import "./CreateProduct.css";
import PricingTab from "./PricingTab";
import OthersTab from "./OthersTab";
import { useDispatch, useSelector } from "react-redux";
import { clearAll, selectAddProductInfo } from "../redux/addProductSlice";
import { IAddProduct, postAddCentralProduct, postAddProduct } from "src/API/products.axios";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";
import { useHistory } from "react-router";


function CreateProduct() {
  const [toggleState, setToggleState] = useState(1);
  const [isLoading, setIsLoading] = useState(false)

  const addProductInfo = useSelector(selectAddProductInfo)
  const { token } = useSelector(selectCredentials)

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

  const handleAddProduct = async () => {
    
    setIsLoading(true)
    if(!addProductInfo?.centralCatalogue?.id) {
      // postAddCentralProduct(token!, {
      //   name: addProductInfo?.centralCatalogue?.name!,
      //   description: 'Description',
      //   brandId: string,
      //   hsnId: string,
      // })
    }
    const centralCatalogueId: string = addProductInfo?.centralCatalogue?.id!
    const body: IAddProduct = {
      organizationCatalogueCategory: {
          name: addProductInfo.others?.category, // TODO replace with category name
          description: '',
          imageName: ''
      },
      thumbnailImage: addProductInfo?.others?.productImage?.[0]?.imageName,
      aliasName: addProductInfo?.centralCatalogue?.id ? addProductInfo?.others?.aliasName : '',
      centralCatalogueId,
      itemSKUCode: addProductInfo?.others?.skuCode,
      taxEnabled: addProductInfo?.pricing?.taxEnabled,
      mrpPrice: addProductInfo?.pricing?.mrpPrice,
      rate: addProductInfo?.pricing?.salesPrice
    }

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
    <div className=" create-product-container dark:bg-gray-900">
      <SimpleHeader heading="Create Product" />
      <div className="w-11/12 pt-6  px-2 mx-auto">
        <h1 className="mb-2 font-bold text-gray-500">What is the product?</h1>
        {/* ===--===Product card===--=== */}
        <ItemCard />
        {/* -------- */}
        <div className="flex justify-between py-4">
          <button
            onClick={() => toggleTabs(1)}
            className={`px-6 py-2 rounded-lg font-semibold w-1/2 ${toggleState === 1 ? "bg-blue-100 text-blue-600 " : "text-gray-500 dark:text-gray-300"}`}
          >
            Pricing
          </button>
          <button
            onClick={() => toggleTabs(2)}
            className={
              `px-6 py-2 rounded-lg font-semibold w-1/2 ${toggleState === 2 ? "bg-blue-100 text-blue-600" : "text-gray-500 dark:text-gray-300"}`
            }
          >
            Others
          </button>
        </div>
        {/* -------- */}

        {/* -------------------TAB-1----------------- */}
        <div className={toggleState === 1 ? "block" : "hidden"}>
          <PricingTab />
        </div>

        {/* -------------------TAB-1----------------- */}
        <div className={toggleState === 2 ? "block" : "hidden"}>
         <OthersTab />
        </div>
      </div>
      <SimpleFooter btnName={isLoading ? "Loading..." : "Add Product"} isDisabled={isLoading} onClick={handleAddProduct} />
    </div>
  );
}

export default CreateProduct;
