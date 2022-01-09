import React, { useEffect, useState } from "react";
import "./EditProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { Min, validate } from "class-validator";
import {
  clearAll,
  selectEditProductInfo,
  setAliasName,
  setMrpPrice,
  setSalesPrice,
} from "./redux/editProductSlice";
import { useNavigate } from "react-router";
import { SimpleHeader } from "src/Components/Header";
import { SimpleFooter } from "src/Components/Footer";
import ItemCard from "./ItemCard";
import { IEditProduct, patchProductById } from "src/API/products.axios";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";


export class PostMRP {
  @Min(1)
  mrpPrice!: number;
}

export class PostSale {
  @Min(1)
  salePrice!: number;
}


function EditProduct() {
  const [isLoading, setIsLoading] = useState(false);

  const editProductInfo = useSelector(selectEditProductInfo);
  const { user, token } = useSelector(selectCredentials);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productImage, setProductImage] = useState<any>(undefined);

  const [isValidMRP, setIsValidMRP] = useState<boolean>(true);
  const [changedMRP, setChangedMRP] = useState<boolean>(false);

  const [isValidSalePrice, setIsValidSalePrice] = useState<boolean>(true);
  const [changedSP, setChangedSP] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      dispatch(clearAll());
    };
  }, []);

  useEffect(() => {
    /* avoid accidental back button hit - confirm alert */
    let trackBackBtn = true;
    history.pushState(null, location.href, location.href);
    window.addEventListener("popstate", function (event) {
      if (trackBackBtn) {
        const leavePageAlert = confirm(
          "Are you sure to Go back?... Inputs will be lost."
        );
        if (leavePageAlert) {
          trackBackBtn = false;
          history.back();
        } else {
          history.pushState(null, location.href, location.href);
        }
      }
    });

    //Reload confirmation alert
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "o/";

      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Webkit, Safari, Chrome
    });
  }, []);



  const handleValidation = (type: string, value: number) => {
    if (type == "mrp") {
      let postMrp = new PostMRP();
      postMrp.mrpPrice = Number(value);

      validate(postMrp).then((errors) => {
        if (errors.length > 0) {
          console.log("validation failed. errors mrp: ", errors);
          setIsValidMRP(false);
        } else {
          setIsValidMRP(true);
        }
      });
    } else {
      let postSalePrice = new PostSale();
      postSalePrice.salePrice = Number(value);
      validate(postSalePrice).then((errors) => {
        if (errors.length > 0) {
          console.log("validation failed. errors: ", errors);
          setIsValidSalePrice(false);
        } else {
          setIsValidSalePrice(true);
        }
      });
    }
  };

  useEffect(() => {
    if(changedMRP)
       handleValidation("mrp", editProductInfo?.mrpPrice!);
  }, [editProductInfo?.mrpPrice, changedMRP])

  useEffect(() => {
    if(changedSP)
       handleValidation("sale", editProductInfo?.salesPrice!);
  }, [editProductInfo?.salesPrice, changedSP])


  const onProceed = () => {
    //setIsSubmit(true);
    console.log("submitting..");

    if (isValidMRP && isValidSalePrice) {
      handleEditProduct();
    }
  };

  const handleEditProduct = async () => {
    setIsLoading(true);
    let organizationCatalogueId: string = editProductInfo?.editProduct.id!;

    const body: IEditProduct = {
      aliasName: editProductInfo.aliasName
        ? editProductInfo.aliasName
        : "",
      mrpPrice: parseFloat(`${editProductInfo?.mrpPrice}`),
      rate: parseFloat(`${editProductInfo?.salesPrice}`),
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
    <div className="edit-product-container dark:bg-gray-900">
      <SimpleHeader heading="Edit Product" />
      <div className="w-11/12 pt-20  px-2 mx-auto">
        <h1 className="mb-2 font-bold text-gray-500 dark:text-gray-300">
          Make changes to the product,
        </h1>
        {/* ===--===Product card===--===  */}
        <ItemCard page="edit" />

        {/* ===--===Input Fields===--===  */}
        <div
          className="flex flex-col gap-5 mt-2 pb-24 overflow-auto"
          style={{ height: "calc(100vh - 22rem)" }}
        >

          {/* ===--===MRP Field===--===  */}
          <div>
            <p className="text-base font-bold text-gray-500">MRP</p>
            <input
              onChange={(event: any) => {
                dispatch(setMrpPrice(event.target.value));
              }}
              onBlur={() => setChangedMRP(true)}
              value={editProductInfo?.mrpPrice}
              type="number"
              min="0"
              placeholder="Enter price"
              className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
            />

            <span
              className={
                "flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 " +
                (changedMRP ? (isValidMRP ? "hidden" : "") : "hidden")
              }
            >
              * Enter Valid MRP price !
            </span>
          </div>

        {/* ===--===Sale Price Field===--===  */}
        <div>
          <p className="text-base font-bold text-gray-500">Sale Price</p>
          <input
            onChange={(event: any) => {
              dispatch(setSalesPrice(event.target.value));
            }}
            onBlur={() => setChangedSP(true)}
            value={editProductInfo?.salesPrice}
            type="number"
            min="0"
            placeholder="Enter price"
            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
          />
          <span
            className={
              "flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 " +
              (changedSP ? (isValidSalePrice ? "hidden" : "") : "hidden")
            }
          >
            * Enter valid Sale price !
          </span>
        </div>

        {/* ===--===Alias Name Field===--===  */}
        <div>
          <p className="text-base font-bold text-gray-500">Alias Name</p>
          <input
            onChange={(event: any) => {
              dispatch(setAliasName(event.target.value));
            }}
            value={editProductInfo?.aliasName}
            type="text"
            placeholder="Enter alias name"
            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
          />
        </div>

        </div>


      </div>
      <SimpleFooter
        btnName={isLoading ? "Loading..." : "Update Product"}
        isDisabled={isLoading}
        onClick={onProceed}
      />
    </div>
  );
}

export default EditProduct;
