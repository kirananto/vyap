import React, { useEffect, useState } from "react";
import { SimpleHeader } from "../../../../Components/Header";
import { SimpleFooter } from "../../../../Components/Footer";
import ItemCard from "./ItemCard";
import "./CreateProduct.css";
import PricingTab from "./PricingTab";
import OthersTab from "./OthersTab";
import { useDispatch, useSelector } from "react-redux";
import { clearAll, selectAddProductInfo } from "../redux/addProductSlice";
import { fetchCentralProductImages, IAddProduct, postAddCentralProduct, postAddProduct } from "src/API/products.axios";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";
import { useNavigate } from "react-router";
import { getImageURL, IMAGEKIT_FOLDERS } from "src/utils/imageKit";


function CreateProduct() {
  const [toggleState, setToggleState] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(true)


  const [productImage, setProductImage] = useState<any>(undefined)
  const addProductInfo = useSelector(selectAddProductInfo)
  const { token } = useSelector(selectCredentials)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const toggleTabs = (index: any) => {
    setToggleState(index);
  };


  useEffect(() => {
    return () => {
      dispatch(clearAll())
    }
  }, [])


  useEffect(() => {
    if(addProductInfo?.centralCatalogue?.id) {
      fetchCentralProductImages(token!, 100, 0, addProductInfo?.centralCatalogue?.id).then((result: any) => {
        const imageName = result.data?.data?.filter((filterItem: any) => filterItem.imageName?.includes('.'))?.[0]?.imageName
        if(imageName) {
          setProductImage(getImageURL(imageName, IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE))
        }
      })
    }
  }, [])

  const doValidate = (isValidMRP : boolean, isValidSale : boolean, isValidHSN : boolean) :void => {
    if(isValidMRP && isValidSale && isValidHSN)
        setIsValid(true)
      else
        setIsValid(false)
  }

  const onProceed = () => {
    if(isValid){
      handleAddProduct()
    }
  }

  const handleAddProduct = async () => {
    
    setIsLoading(true)
    let centralCatalogueId: string = addProductInfo?.centralCatalogue?.id!

    if(!addProductInfo?.centralCatalogue?.id) {
      const centralProduct: any = await postAddCentralProduct(token!, {
        name: addProductInfo?.centralCatalogue?.name!,
        description: addProductInfo?.centralCatalogue?.description ?? '',
        categories: {
          name: 'string',
          description: 'string',
          imageName: 'string'
        },
        images: addProductInfo?.others?.productImage,
        hsnId: addProductInfo?.pricing.hsn?.id,
        brandId: addProductInfo?.others?.brand?.id ?? undefined,
        brand: addProductInfo?.others?.brand?.id  ? undefined : { name: addProductInfo?.others?.brand?.name, description: addProductInfo?.others?.brand?.name, imageName: addProductInfo?.others?.brand?.name }
      })
      centralCatalogueId = centralProduct?.data?.id
    }
    const body: IAddProduct = {

      organizationCatalogueCategoryId: addProductInfo?.others?.category?.id ?? undefined,
      organizationCatalogueCategory: addProductInfo?.others?.category?.id  ? undefined : { name: addProductInfo?.others?.category?.name, description: addProductInfo?.others?.category?.name, imageName: addProductInfo?.others?.category?.name },
      thumbnailImage: addProductInfo?.others?.productImage?.[0]?.imageName,
      aliasName: addProductInfo?.centralCatalogue?.id ? addProductInfo?.others?.aliasName : '',
      centralCatalogueId,
      itemSKUCode: addProductInfo?.others?.skuCode,
      taxEnabled: addProductInfo?.pricing?.taxEnabled,
      mrpPrice: parseFloat(`${addProductInfo?.pricing?.mrpPrice}`),
      rate: parseFloat(`${addProductInfo?.pricing?.salesPrice}`)
    }

    postAddProduct(token!, body)
      .then((response) => {
        setIsLoading(false)
        console.log('response', response)
        navigate('/my-products')
      })
      .catch(error => {
        setIsLoading(false)
        console.log('add product error', error)
      })
  }

  return (
    <div className=" create-product-container dark:bg-gray-900">
      <SimpleHeader heading="Create Product" />
      <div className="w-11/12 pt-20  px-2 mx-auto">
        <h1 className="mb-2 font-bold text-gray-500 dark:text-gray-300">What is the product?</h1>
        {/* ===--===Product card===--=== */}
        <ItemCard productImage={productImage}/>
        {/* -------- */}
        <div className="flex justify-between py-4">
          <button
            onClick={() => toggleTabs(1)}
            className={`px-6 py-2 rounded-lg font-semibold w-1/2 ${toggleState === 1 ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 " : "text-gray-500 dark:text-gray-300"}`}
          >
            Pricing
          </button>
          <button
            onClick={() => toggleTabs(2)}
            className={
              `px-6 py-2 rounded-lg font-semibold w-1/2 ${toggleState === 2 ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300" : "text-gray-500 dark:text-gray-300"}`
            }
          >
            Others
          </button>
        </div>
        {/* -------- */}

        {/* -------------------TAB-1----------------- */}
        <div className={toggleState === 1 ? "block" : "hidden"}>
          <PricingTab setValidation={doValidate}/>
        </div>

        {/* -------------------TAB-1----------------- */}
        <div className={toggleState === 2 ? "block" : "hidden"}>
         <OthersTab />
        </div>
      </div>
      <SimpleFooter btnName={isLoading ? "Loading..." : "Add Product"} isDisabled={isLoading} onClick={onProceed} />
    </div>
  );
}

export default CreateProduct;
