import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectEditProductInfo } from "./redux/editProductSlice";
import { getImageURL, IMAGEKIT_FOLDERS } from "src/utils/imageKit";


function ItemCard(props: any) {

  const productDetails = useSelector(selectEditProductInfo);
  const navigate = useNavigate();

  return (
    <div className="flex w-full gap-2">
      {/* image-col */}
      <div className="w-3/12">
        <div className="relative w-20 h-auto mt-1 rounded-lg overflow-hidden bg-cover bg-center empty_image_background">
          {productDetails?.editProduct?.thumbnailImage && (
              <img
                src={getImageURL(
                  productDetails?.editProduct?.thumbnailImage,
                  IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                )}
                alt="Avatar"
                className="object-cover w-full h-full"
              />
            )}
        </div>
      </div>
      {/* detail-col */}
      <div className="w-full ml-2 mt-2">
        <div className="text-xl font-bold text-gray-700 dark:text-gray-300">
          {productDetails?.editProduct?.centralCatalogue?.name}
        </div>
        <div className="text-base text-gray-400 dark:text-gray-400">{productDetails?.editProduct?.centralCatalogue?.description}</div>

      </div>
      {/* product handle-col */}
      <div className="flex items-center justify-center w-1/4 ">
        <button
          onClick={() => navigate('/my-products')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-red-400 w-7 h-7 dark:text-red-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
