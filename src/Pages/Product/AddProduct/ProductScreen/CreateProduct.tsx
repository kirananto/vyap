import React, { useEffect, useRef, useState } from "react";
import { SimpleHeader } from "../../../../Components/Header";
import { SimpleFooter } from "../../../../Components/Footer";
import ItemCard from "./ItemCard";
import "./CreateProduct.css";
import PricingTab from "./PricingTab";
import OthersTab from "./OthersTab";
import { useDispatch, useSelector } from "react-redux";
import { clearAll, selectAddProductInfo } from "../redux/addProductSlice";
import {
  fetchCentralProductImages,
  IAddProduct,
  IEditProduct,
  patchProductById,
  postAddCentralProduct,
  postAddProduct,
} from "src/API/products.axios";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";
import { useNavigate } from "react-router";
import { getImageURL, IMAGEKIT_FOLDERS } from "src/utils/imageKit";

function CreateProduct() {
  const [toggleState, setToggleState] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isValidOthers, setIsValidOthers] = useState(false);
  const [isValidEdit, setIsValidEdit] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);

  const [productImage, setProductImage] = useState<any>(undefined);
  const addProductInfo = useSelector(selectAddProductInfo);
  const { user, token } = useSelector(selectCredentials);

  let pageAction = addProductInfo.editProductId ? "edit" : "add";
  const trackBackBtn = useRef(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleTabs = (index: any) => {
    console.log("toggling...");
    setToggleState(index);
  };

  useEffect(() => {
    if(!addProductInfo?.editProductId){
      return () => {
        dispatch(clearAll());
      };
    }
  }, [addProductInfo?.editProductId]);

  function popStateHandler () {
    console.trace('data')
    if (trackBackBtn.current) {
      const leavePageAlert = confirm(
        "Are you sure to Go back?... Inputs will be lost."
      );
      if (leavePageAlert) {
        trackBackBtn.current = false;
        history.back();
      } else {
        trackBackBtn.current = true;
        history.pushState(null, location.href, location.href);
      }
    }
  }

  function handleBeforeUnload(e: any) {
    var confirmationMessage = "o/";

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Webkit, Safari, Chrome
  }
  useEffect(() => {
    /* avoid accidental back button hit - confirm alert */
    history.pushState(null, location.href, location.href);
    window.addEventListener("popstate", popStateHandler);

    //Reload confirmation alert
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", popStateHandler)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, []);

  useEffect(() => {
    if (addProductInfo?.centralCatalogue?.id) {
      fetchCentralProductImages(
        token!,
        100,
        0,
        addProductInfo?.centralCatalogue?.id
      ).then((result: any) => {
        const imageName = result?.data?.data?.filter((filterItem: any) =>
          filterItem?.imageName?.includes(".")
        )?.[0]?.imageName;
        if (imageName) {
          setProductImage(
            getImageURL(imageName, IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE)
          );
        }
      });
    } else {
      if (addProductInfo?.others?.productImage?.length > 0) {
        setProductImage(
          getImageURL(
            addProductInfo?.others?.productImage[0]?.imageName,
            IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
          )
        );
      }
    }
  }, [addProductInfo?.others?.productImage?.length,addProductInfo?.centralCatalogue?.id]);

  const doValidate = (
    isValidMRP: boolean,
    isValidSale: boolean,
    isValidHSN: boolean,
    isValidGST: boolean
  ): void => {

    //validation for edit
    if (
      isValidMRP &&
      isValidSale){
        setIsValidEdit(true);
      }else{
        setIsValidEdit(false);
      }

    //validation for add
    if (
      isValidMRP &&
      isValidSale &&
      (addProductInfo?.pricing?.taxEnabled ? isValidHSN && isValidGST : true)
    )
      setIsValid(true);
    else setIsValid(false);
  };

  const doValidateOthers = (
    isValidDescription: boolean,
    isValidCategory: boolean,
    isValidBrand: boolean
  ): void => {
    if (isValidDescription && isValidCategory && isValidBrand)
      setIsValidOthers(true);
    else setIsValidOthers(false);
  };

  const onProceed = () => {
    setIsSubmit(true);
    if (isValid && !isValidOthers) toggleTabs(2);

    if (!isValid && isValidOthers) toggleTabs(1);

    if (isValid && isValidOthers) {
      handleAddProduct();
    }
  };

  const handleAddProduct = async () => {
    setIsLoading(true);
    let centralCatalogueId: string = addProductInfo?.centralCatalogue?.id!;

    if (!addProductInfo?.centralCatalogue?.id) {
      const centralProduct: any = await postAddCentralProduct(token!, {
        name: addProductInfo?.centralCatalogue?.name!,
        description: addProductInfo?.centralCatalogue?.description ?? "",
        categories: {
          name: addProductInfo?.others?.centralCategory?.name,
          description: addProductInfo?.others?.centralCategory?.name,
          imageName: addProductInfo?.others?.centralCategory?.name,
        },
        barCode: addProductInfo?.others?.barCode,
        images: addProductInfo?.others?.productImage,
        hsnId: addProductInfo?.pricing?.taxEnabled
          ? addProductInfo?.pricing.hsn?.id
          : undefined,
        brandId: addProductInfo?.others?.brand?.id ?? undefined,
        brand: addProductInfo?.others?.brand?.id
          ? undefined
          : {
            name: addProductInfo?.others?.brand?.name,
            description: addProductInfo?.others?.brand?.name,
            imageName: addProductInfo?.others?.brand?.name,
          },
      });
      centralCatalogueId = centralProduct?.data?.id;
    }
    const body: IAddProduct = {
      organizationCatalogueCategoryId:
        addProductInfo?.others?.category?.id ?? undefined,
      organizationCatalogueCategory: addProductInfo?.others?.category?.id
        ? undefined
        : {
          name: addProductInfo?.others?.category?.name,
          description: addProductInfo?.others?.category?.name,
          imageName: addProductInfo?.others?.category?.name,
          organizationId: user?.organizationId,
        },
      thumbnailImage: addProductInfo?.centralCatalogue?.id ? addProductInfo?.centralCatalogue?.images?.[0]?.imageName : addProductInfo?.others?.productImage?.[0]?.imageName,
      aliasName: addProductInfo?.centralCatalogue?.id
        ? addProductInfo?.others?.aliasName
        : "",
      centralCatalogueId,
      itemSKUCode: addProductInfo?.others?.skuCode,
      taxEnabled: addProductInfo?.pricing?.taxEnabled,
      mrpPrice: parseFloat(`${addProductInfo?.pricing?.mrpPrice}`),
      rate: parseFloat(`${addProductInfo?.pricing?.salesPrice}`),
    };

    postAddProduct(token!, body)
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        navigate("/my-products");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("add product error", error);
      });
  };

  //Edit Product Actions
  const onProceedEdit = () => {
    setIsSubmit(true);

    if (isValidEdit) {
      handleEditProduct();
    }
  };

  const handleEditProduct = async () => {
    setIsLoading(true);
    let organizationCatalogueId: string = addProductInfo?.editProductId!;

    const body: IEditProduct = {
      aliasName: addProductInfo?.others?.aliasName
        ? addProductInfo?.others?.aliasName
        : "",
      mrpPrice: parseFloat(`${addProductInfo.pricing?.mrpPrice}`),
      rate: parseFloat(`${addProductInfo.pricing?.salesPrice}`),
    };


    patchProductById({token: token!, id: organizationCatalogueId, data: body})
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        navigate("/my-products");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Edit product error", error);
      });
  };


  return (
    <div className=" create-product-container dark:bg-gray-900">
      <SimpleHeader   heading={`${pageAction === "edit"
                ? "Edit Product "
                : "Create Product"}`} />

      <div className="w-11/12 pt-20  px-2 mx-auto">
        <h1 className="mb-2 font-bold text-gray-500 dark:text-gray-300">
          What is the product?
        </h1>
        {/* ===--===Product card===--=== */}
        <ItemCard productImage={productImage} />
        {/* -------- */}
        <div className="flex justify-between py-4">
          <button
            onClick={() => toggleTabs(1)}
            className={`px-6 py-2 rounded-lg font-semibold w-1/2 ${toggleState === 1
                ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 "
                : "text-gray-500 dark:text-gray-300"
              }`}
          >
            Pricing
          </button>
          <button
            onClick={() => toggleTabs(2)}
            className={`px-6 py-2 rounded-lg font-semibold w-1/2 ${toggleState === 2
                ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                : "text-gray-500 dark:text-gray-300"
              }`}
          >
            Others
          </button>
        </div>
        {/* -------- */}

        {/* -------------------TAB-1----------------- */}
        <div className={toggleState === 1 ? "block" : "hidden"}>
          <PricingTab 
              setValidation={doValidate} 
              submitStatus={isSubmit}  
              action={`${pageAction === "edit"
                ? "edit"
                : "add"}`} 
          />
        </div>

        {/* -------------------TAB-1----------------- */}
        <div className={toggleState === 2 ? "block" : "hidden"}>
          <OthersTab 
            setValidation={doValidateOthers}
            action={`${pageAction === "edit"
                ? "edit"
                : "add"}`} 
           />
        </div>
      </div>

      {pageAction === "edit"
                ? <SimpleFooter
                    btnName={isLoading ? "Loading..." : "Update Product"}
                    isDisabled={isLoading}
                    onClick={onProceedEdit}
                  />
                : <SimpleFooter
                    btnName={isLoading ? "Loading..." : "Add Product"}
                    isDisabled={isLoading}
                    onClick={onProceed}
                  />
      }
    </div>
  );
}

export default CreateProduct;
