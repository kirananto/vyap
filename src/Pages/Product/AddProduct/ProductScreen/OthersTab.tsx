import React from "react";

const imgURL =
  "https://i5.walmartimages.com/asr/b16c6dcf-98b5-4000-b106-728647912d81_1.ae9db2c3a2020d02b73f03d740cdef14.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF";

const ImageContainer = () => {
  return (
    <div className="w-16 h-16 p-1 border border-gray-200 rounded-lg shadow-sm ">
      <img src={imgURL} alt="" />
    </div>
  );
};
const Input = (props: any) => {
  return (
    <div>
      <p className="text-sm font-bold text-gray-500">{props.label}</p>
      <input
        type="text"
        placeholder={props.placeholder}
        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-100 border border-transparent border-gray-200 rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 "
      />
    </div>
  );
};
function OthersTab() {
  return (
    <div>
      <h1 className="font-bold text-gray-500 ">Add product images</h1>
      <p className="text-xs font-bold text-gray-300">
        Add upto 5 images. First image is your product's cover
        <br /> image that will be highlighted everywhere{" "}
      </p>
      {/* image-container */}
      <div className="flex flex-wrap gap-4 mt-4 mb-8">
        <ImageContainer />
        <ImageContainer />
        <div className="flex items-center justify-center w-16 h-16 p-1 border border-gray-200 rounded-lg shadow-sm ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </div>
      {/* Image container ENDS */}
      {/* Details-container */}
      <div className="flex flex-col gap-2">
        <Input label="Your Item Code(SKU)" />

        {/* TODO: Need to make this input field a multiselect field*/}
        <Input label="Category" />
        <div className="barcode-input">
          <Input label="Barcode" placeholder="Enter or Scan Barcode" />
          <div className="barcode-icon">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <Input label="Brand" placeholder="Enter brand..." />
        <Input label="Case Quantity" placeholder="Enter quantity..." />
      </div>
    </div>
  );
}

export default OthersTab;
