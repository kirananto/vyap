import React, { Dispatch, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAddProductInfo,
  setAliasName,
  setBarCode,
  setBrand,
  setCaseQuantity,
  setCategory,
  setCentralCategory,
  setDescription,
  setProductImage,
  setSkuCode,
} from "../redux/addProductSlice";
import { fetchBrands } from "src/API/brand.axios";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";
import { imageUpload } from "src/API/image.axios";
import Spinner from "src/Components/Style/Spinner";
import { getImageURL, IMAGEKIT_FOLDERS } from "src/utils/imageKit";
import BrandModal from "./BrandModal";
import OrganizationCategoryModal from "./OrganizationCategoryModal";
import { Length, validate } from "class-validator";
import CentralCategoryModal from "./CentralCategoryModal";

export class PostDescription {
  @Length(0, 80)
  description!: string;
}

export class PostCategory {
  @Length(1, 30)
  category!: string;
}

export class PostBrand {
  @Length(1, 30)
  brand!: string;
}

interface Props {
  setValidation: (arg1: boolean, arg2: boolean, arg3: boolean) => void,
  action : string
}

interface PropsV {
  validate: (arg1: string, arg2: string) => void;
}

const ImageContainer = (props: any) => {
  const { item } = props;
  return (
    <div
      className="w-16 h-16 overflow-hidden border border-gray-200 dark:border-gray-500 rounded-lg shadow-sm "
      key={item?.fileId}
    >
      <img
        key={item?.imageName}
        alt=""
        src={getImageURL(
          item?.imageName,
          IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
        )}
      />
    </div>
  );
};

const handleInputChange = (
  event: any,
  label: string,
  dispatch: Dispatch<any>
) => {
  const tempVal = event.target.value;
  switch (label) {
    case "Your Item Code(SKU)":
      dispatch(setSkuCode(tempVal));
      break;

    case "Category":
      dispatch(setCategory(tempVal));
      break;

    case "CentralCategory":
      dispatch(setCentralCategory(tempVal));
      break;

    case "Alias Name":
      dispatch(setAliasName(tempVal));
      break;

    case "Description":
      dispatch(setDescription(tempVal));
      break;

    case "Barcode":
      dispatch(setBarCode(tempVal));
      break;

    case "Brand":
      dispatch(setBrand(tempVal));
      break;

    case "Case Quantity":
      dispatch(setCaseQuantity(tempVal));
      break;

    default:
      break;
  }
};

const Input = (props: any) => {
  return (
    <div className=" mt-2  ">
      <p className="text-sm font-bold text-gray-500 dark:text-gray-300">
        {props.label}
      </p>
      <input
        onChange={(event: any) => {
          handleInputChange(event, props.label, props.dispatch);
        }}
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
      />
    </div>
  );
};
function OthersTab({ setValidation, action }: Props) {
  const [modal, setModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [tagsModal, setTagsModal] = useState(false);

  const [spinner, setSpinner] = useState(false);

  const [isValidDescription, setIsValidDescription] = useState<boolean>(false);
  const [isValidCategory, setIsValidCategory] = useState<boolean>(false);
  const [isValidBrand, setIsValidBrand] = useState<boolean>(false);

  useEffect(() => {
    setValidation(isValidCategory, isValidDescription, isValidBrand);
  }, [isValidCategory, isValidDescription, isValidBrand])


  const dispatch = useDispatch();
  const { token } = useSelector(selectCredentials);

  const addProductInfo = useSelector(selectAddProductInfo);

  const fileUploaderRef: any = useRef(null);

  useEffect(() => {
    fetchBrands(token!, 100, 0)
      .then((result: any) =>
        console.log(
          result.data.data
            // .sort((a: any, b: any) => {
            //     const nameA = a.application_name.toLowerCase()
            //     const nameB = b.application_name.toLowerCase()
            //     if (nameA < nameB) {
            //         return -1
            //     }
            //     if (nameA > nameB) {
            //         return 1
            //     }
            //     return 0
            // })
            .map((item: any) => ({ label: "ssdd", value: item }))
        )
      )
      .catch(() => console.log("Error loading data"));
  }, []);

  function uploadImage() {
    if (fileUploaderRef.current?.files?.length > 0) {
      setSpinner(true);
      var data = new FormData();
      data.append("file", fileUploaderRef.current?.files?.[0]);
      imageUpload(token!, data)
        .then((result: any) => {
          console.log("data", result.data);
          dispatch(
            setProductImage({
              imageName: result.data.name,
              title: addProductInfo?.centralCatalogue?.name ?? "name",
              description: `${addProductInfo?.centralCatalogue?.name}`,
            })
          );
          setSpinner(false);
        })
        .catch((error) => {
          console.log("error", error);
          setSpinner(false);
        });
    }
  }

  const handleModal = () => {
    setModal(true);
  };

  const handleCategoryModal = () => {
    setCategoryModal(!categoryModal);
  };
  const handleTagsModal = () => {
    setTagsModal(!tagsModal);
  };

  const handleValidation = (type: string, value: string) => {
    if (type == "desc") {
      console.log("validate description");
      let postDesc = new PostDescription();
      postDesc.description = value;

      validate(postDesc).then((errors) => {
        if (errors.length > 0) {
          console.log("validation failed. errors : ", errors);
          setIsValidDescription(false);
        } else {
          setIsValidDescription(true);
        }
      });
    } else if (type == "cat") {
      let postCat = new PostCategory();
      postCat.category = value;

      validate(postCat).then((errors) => {
        if (errors.length > 0) {
          console.log("validation failed. errors : ", errors);
          setIsValidCategory(false);
        } else {
          setIsValidCategory(true);
        }
      });
    } else {
      if (!addProductInfo?.centralCatalogue?.id) {
        let postBrand = new PostBrand();
        postBrand.brand = value;
        validate(postBrand).then((errors) => {
          if (errors.length > 0) {
            console.log("validation failed. errors: ", errors);
            setIsValidBrand(false);
          } else {
            setIsValidBrand(true);
          }
        });
      } else {
        setIsValidBrand(true);
      }
    }
  };

  useEffect(() => {
    handleValidation("brand", addProductInfo?.others?.brand?.name!);
  }, [addProductInfo?.others?.brand?.name]);

  useEffect(() => {
    handleValidation("cat", addProductInfo?.others?.category?.name!);
  }, [addProductInfo?.others?.category?.name]);

  useEffect(() => {
    handleValidation("desc", addProductInfo?.centralCatalogue?.description!);
  }, [addProductInfo?.centralCatalogue?.description]);

  return (
    <div
      className="mt-2 overflow-auto pb-36"
      style={{ height: "calc(100vh - 22rem)" }}
    >
      {!addProductInfo?.centralCatalogue?.id && (
        <>
          <h1 className="font-bold text-gray-500 dark:text-gray-400 ">
            Add product images
          </h1>
          <p className="text-xs font-bold text-gray-300 mt-2">
            Add upto 5 images. First image is your product's cover
            <br /> image that will be highlighted everywhere{" "}
          </p>
          {/* image-container */}
          <div className="flex flex-wrap gap-4 mt-4 mb-8">
            {addProductInfo?.others?.productImage?.map((item) => (
              <ImageContainer key={item.imageName} item={item} />
            ))}
            <div
              className="flex items-center justify-center w-16 h-16 p-1 border border-gray-200 rounded-lg shadow-sm cursor-pointer dark:text-gray-300"
              onClick={() => fileUploaderRef.current!.click()}
            >
              {!spinner ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              ) : (
                <Spinner />
              )}
            </div>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileUploaderRef}
              accept={"image/png,image/jpeg"}
              onChange={uploadImage}
            />
          </div>
        </>
      )}
      {/* Image container ENDS */}
      {/* Details-container */}
      <div className="flex flex-col gap-2">
            {/* Description-Input */}
        {!addProductInfo?.centralCatalogue?.id && (
          <>
            <Input
              label="Description"
              placeholder="Enter Description"
              dispatch={dispatch}
              value={addProductInfo?.centralCatalogue?.description}
            />
            <span
              className={
                "flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 " +
                (isValidDescription ? "hidden" : "")
              }
            >
              * Enter valid description !
            </span>
          </>
        )}

       {/* SKU-Input */}
       { action === "add" && 
            <Input
              label="Your Item Code(SKU)"
              placeholder="Enter SKU Code"
              dispatch={dispatch}
              value={addProductInfo?.others?.skuCode}
            />
        }

        {/* Category-Input */}
        {!addProductInfo?.centralCatalogue?.id && (
          <div>
          <p className="text-base text-gray-500">Category</p>
          <div className="des-modal-btn">
            <input
              onChange={(event: any) => {
                dispatch(
                  setCentralCategory({ id: undefined, name: event.target.value })
                );
              }}
              value={addProductInfo?.others?.centralCategory?.name}
              type="text"
              placeholder="Enter category"
              className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
            />
            {/* Modal handle btn */}
            <button
              className="modal-btn dark:text-gray-300"
              onClick={handleCategoryModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <span
              className={
                "flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 " +
                (isValidCategory ? "hidden" : "")
              }
            >
              * Enter valid Category !
            </span>
            {/* Modal */}
            <div>
              <CentralCategoryModal
                trigger={categoryModal}
                setModal={setCategoryModal}
              />
            </div>
          </div>
        </div>
)}
            
      {/* Tag-Input */}
      { action === "add" && 
      <div>
        <p className="text-base text-gray-500">Tag</p>
        <div className="des-modal-btn">
          <input
            onChange={(event: any) => {
              dispatch(
                setCategory({ id: undefined, name: event.target.value })
              );
            }}
            value={addProductInfo?.others?.category?.name}
            type="text"
            placeholder="Enter Tags"
            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
          />
          {/* Modal handle btn */}
          <button
            className="modal-btn dark:text-gray-300"
            onClick={handleTagsModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <span
            className={
              "flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 " +
              (isValidCategory ? "hidden" : "")
            }
          >
            * Enter valid Tag !
          </span>
          {/* Modal */}
          <div>
            <OrganizationCategoryModal
              trigger={tagsModal}
              setModal={handleTagsModal}
            />
          </div>
        </div>
      </div>
    }

      {!addProductInfo?.centralCatalogue?.id && (
        <div className="barcode-input">
          <Input
            label="Barcode"
            placeholder="Enter or Scan Barcode"
            dispatch={dispatch}
            value={addProductInfo?.others?.barCode}
          />
          <div className="barcode-icon dark:text-gray-300">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

          {/* Alias-Input */}

      {addProductInfo?.centralCatalogue?.id && (
        <Input
          label="Alias Name"
          placeholder="Enter alias name..."
          dispatch={dispatch}
          value={addProductInfo?.others?.aliasName}
        />
      )}
      {!addProductInfo?.centralCatalogue?.id && (
        <div>
          <p className="text-base text-gray-500">Brand</p>
          <div className="des-modal-btn">
            <input
              onChange={(event: any) => {
                dispatch(
                  setBrand({ id: undefined, name: event.target.value })
                );
              }}
              value={addProductInfo?.others?.brand?.name}
              type="text"
              placeholder="Enter brand"
              className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
            />
            {/* Modal handle btn */}
            <button
              className="modal-btn dark:text-gray-300"
              onClick={handleModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <span
              className={
                "flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 " +
                (isValidBrand ? "hidden" : "")
              }
            >
              * Enter valid brand !
            </span>
            {/* Modal */}
            <div>
              <BrandModal trigger={modal} setModal={setModal} />
            </div>
          </div>
        </div>
      )}
      {/* <Input label="Case Quantity" placeholder="Enter quantity..." dispatch={dispatch} value={addProductInfo?.others?.caseQuantity} /> */}
    </div>
    </div >
  );
}

export default OthersTab;
