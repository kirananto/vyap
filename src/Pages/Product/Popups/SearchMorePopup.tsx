import React from 'react'
import { useSelector } from 'react-redux'
import { deleteProductById, patchProductById } from 'src/API/products.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'


export function SearchMorePopup({ selectedProduct, onClose }: { selectedProduct: any[], onClose: any }) {

  const { token } = useSelector(selectCredentials)

  async function deleteProducts() {
    console.log('product')
    for await (const item of selectedProduct) {
      await deleteProductById({ token: token!, id: item?.id })
    }

    onClose()
  }

  async function markStockStatus(value: boolean) {
    console.log('product')
    for await (const item of selectedProduct) {
      await patchProductById({ token: token!, id: item?.id, data: { outOfStock: value } })
    }
    onClose()
  }

  return (
    <div className="pb-8 pt-2 px-4 w-full">
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold text-gray-500 dark:text-gray-200">More Options</h1>
        <p className="text-xs font-semibold text-gray-300">{selectedProduct?.length ?? 0} item selected</p>
      </div>
      {/* row-1 */}
      <div className="flex flex-col mt-4">
        <button onClick={deleteProducts} className="flex items-center py-3 gap-2 text-md font-semibold text-gray-500 dark:text-gray-300 custom-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span>Delete Products(s)</span>
        </button>
        {/* ---- */}
        <button onClick={() => markStockStatus(true)} className="flex items-center py-3 gap-2 text-md font-semibold text-gray-500 dark:text-gray-300 custom-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>Mark out of stock</span>
        </button>
        {/* ---- */}
        <button onClick={() => markStockStatus(false)} className="flex items-center py-3 gap-2 text-md font-semibold text-gray-500 dark:text-gray-300 custom-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>Mark in stock</span>
        </button>
      </div>
    </div>
  );
}