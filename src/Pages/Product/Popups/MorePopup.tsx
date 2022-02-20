import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductById, fetchCentralProduct, patchProductById } from 'src/API/products.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { useNavigate } from 'react-router'
import { setAliasName, setCentralCatalogue, setEditProductId, setMrpPrice, setSalesPrice } from '../AddProduct/redux/addProductSlice'
import { hapticFeedback } from 'src/utils/vibrate'
import type { IProduct } from 'src/types/product'


export function MorePopup({ item, onClose }: { item: IProduct | undefined, onClose: () => void }) {

    const { token } = useSelector(selectCredentials)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function deleteProduct() {
        console.log('product')
        deleteProductById({ token: token, id: item?.id }).then(() => {
            onClose()
        })
    }

    function editProduct() {
        if (item?.id) {
            fetchCentralProduct({ token: token, id: item?.centralCatalogueId }).then((result) => {
                if (result?.data) {
                    dispatch(setCentralCatalogue(result?.data))
                }
            })
            dispatch(setEditProductId(item?.id))
            dispatch(setMrpPrice(parseFloat(item?.mrpPrice ?? 0) ?? 0))
            dispatch(setSalesPrice(parseFloat(item?.rate ?? 0) ?? 0))
            dispatch(setAliasName(item?.aliasName ?? ''))
            navigate('/edit-product')
        }
    }

    function markStockStatus(value: boolean) {
        console.log('product')
        patchProductById({ token: token, id: item?.id, data: { outOfStock: value } }).then(() => {
            onClose()
        })
    }

    return (
        <div className="pb-8 pt-2 px-4">
            {/* Heading */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg w-full font-bold text-slate-500 dark:text-slate-200">More options for {item?.centralCatalogue?.name} {item?.aliasName ? `(${item?.aliasName})` : ''}</h1>
            </div>
            {/* row-1 */}
            <div className="flex flex-col mt-6">
                <button onClick={() => {
                    hapticFeedback()
                    deleteProduct()
                }} className="flex items-center py-3 gap-2 text-md font-semibold text-rose-500 dark:text-rose-300 custom-btn">
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
                    <span>Delete Products</span>
                </button>
                {/* ---- */}
                {!item?.outOfStock ? <button onClick={() => {
                    hapticFeedback()
                    markStockStatus(true)
                }} className="flex items-center py-3 gap-2 text-md font-semibold text-slate-500 dark:text-slate-300 custom-btn ">
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
                </button> : <button onClick={() => {
                    hapticFeedback()
                    markStockStatus(false)
                }} className="flex items-center py-3 gap-2 text-md font-semibold text-slate-500 dark:text-slate-300 custom-btn ">
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
                </button>}
                {/* --------- */}
                <button className="flex items-center py-3 gap-2 text-md font-semibold text-slate-500 dark:text-slate-300 custom-btn  ">
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
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                    </svg>
                    <span onClick={() => {
                        hapticFeedback()
                        editProduct()
                    }}>Edit product</span>
                </button>
            </div>
        </div>
    )
}