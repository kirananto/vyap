import React, { Dispatch, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBrands } from 'src/API/brand.axios'
import { imageUpload } from 'src/API/image.axios'
import Spinner from 'src/Components/Style/Spinner'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'
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
} from '../redux/addProductSlice'
import BrandModal from './BrandModal'
import CentralCategoryModal from './CentralCategoryModal'
import OrganizationCategoryModal from './OrganizationCategoryModal'
import { PAGE_ACTION } from './types'
import {
    isValidBrand,
    isValidCategory,
    // isValidDescription,
    isValidTag,
} from './validations'

import Compressor from 'compressorjs'
import type { IProductImageUploadResult } from 'src/types/productImageUploadResult'
interface Props {
    action: PAGE_ACTION;
    saveAttempt: number;
}

interface IImageProps {
    key: string;
    item: {
        fileId: string;
        imageName:string
    };
}

interface IInputProps {
    label: string,
    dispatch: Dispatch<any>
    value: string | undefined
    placeholder: string
}

const ImageContainer = (props: IImageProps) => {
    const { item } = props
    return (
        <div
            className="h-16 w-16 overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-500 "
            key={item?.fileId}
        >
            <img
                key={item?.imageName}
                alt="Placeholder"
                src={getImageURL(
                    item?.imageName,
                    IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                )}
            />
        </div>
    )
}

const handleInputChange = (  
    event: React.ChangeEvent<HTMLInputElement>,
    label: string,
    dispatch: Dispatch<any>) => {
    const tempVal : any = event.target.value
    switch (label) {
        case 'Your Item Code(SKU)':
            dispatch(setSkuCode(tempVal))
            break

        case 'Category':
            dispatch(setCategory(tempVal))
            break

        case 'CentralCategory':
            dispatch(setCentralCategory(tempVal))
            break

        case 'Alias Name':
            dispatch(setAliasName(tempVal))
            break

        case 'Description':
            dispatch(setDescription(tempVal))
            break

        case 'Barcode':
            dispatch(setBarCode(tempVal))
            break

        case 'Brand':
            dispatch(setBrand(tempVal))
            break

        case 'Case Quantity':
            dispatch(setCaseQuantity(tempVal))
            break

        default:
            break
    }
}

const Input = (props: IInputProps) => {
    return (
        <div className=" mt-2  ">
            <p className="text-sm font-bold text-gray-500 dark:text-gray-300">
                {props.label}
            </p>
            <input
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(event, props.label, props.dispatch)
                }}
                type="text"
                value={props.value}
                placeholder={props.placeholder}
                className="focus:shadow-outline mt-2 w-full transform rounded-lg border border-transparent border-gray-200 bg-gray-100 px-4 py-2 text-base text-black opacity-75 transition duration-500 ease-in-out focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
            />
        </div>
    )
}
function OthersTab({ action, saveAttempt }: Props) {
    console.log('saveAttempt', saveAttempt)
    const [modal, setModal] = useState(false)
    const [categoryModal, setCategoryModal] = useState(false)
    const [tagsModal, setTagsModal] = useState(false)

    const [spinner, setSpinner] = useState(false)

    const dispatch = useDispatch()
    const { token } = useSelector(selectCredentials)

    const addProductInfo = useSelector(selectAddProductInfo)

    const fileUploaderRef  = useRef<HTMLInputElement>(null)

    useEffect(() => {
        fetchBrands({ token, limit: 100, offset: 0 })
            .then((result: any) =>
                console.log(
                    result.data.data.map((item: any) => ({ label: 'ssdd', value: item }))
                )
            )
            .catch(() => console.log('Error loadng data'))
    }, [token])

    function uploadImage() {
        if(fileUploaderRef.current?.files){
            if (fileUploaderRef.current?.files?.length > 0) {
                setSpinner(true)
                new Compressor(fileUploaderRef.current?.files?.[0], {
                    quality: 0.6,
                    maxWidth: 300,
                    maxHeight: 300,

                    // The compression process is asynchronous,
                    // which means you have to access the `result` in the `success` hook function.
                    success(result) {
                        const data = new FormData()
                        data.append('file', result)
                        imageUpload({ token, data })
                            .then((result: IProductImageUploadResult) => {
                                console.log('data', result.data)
                                dispatch(
                                    setProductImage({
                                        imageName: result.data.name,
                                        title: addProductInfo?.centralCatalogue?.name ?? 'name',
                                        description: `${addProductInfo?.centralCatalogue?.name}`,
                                    })
                                )
                                setSpinner(false)
                            })
                            .catch((error) => {
                            //TODO Handle Error
                                console.log('error', error)
                                setSpinner(false)
                            })
                    },
                    error(err) {
                    //TODO Handle Error
                        console.log(err.message)
                        setSpinner(false)
                    },
                })

            }
        }
        
    }

    const handleModal = () => {
        setModal(true)
    }

    const handleCategoryModal = () => {
        setCategoryModal(!categoryModal)
    }
    const handleTagsModal = () => {
        setTagsModal(!tagsModal)
    }

    return (
        <div
            className="mt-2 overflow-auto pb-36"
            style={{ height: 'calc(100vh - 22rem)' }}
        >
            {!addProductInfo?.centralCatalogue?.id && (
                <>
                    <h1 className="font-bold text-gray-500 dark:text-gray-400 ">
                        Add product images
                    </h1>
                    <p className="mt-2 text-xs font-bold text-gray-400 dark:text-gray-300">
                        Add upto 5 images. First image is your product's cover
                        <br /> image that will be highlighted everywhere{' '}
                    </p>
                    {/* image-container */}
                    <div className="mt-4 mb-8 flex flex-wrap gap-4">
                        {addProductInfo?.others?.productImage?.map((item) => (
                            <ImageContainer key={item.imageName} item={item} />
                        ))}
                        <div
                            className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg border border-gray-400 p-1 shadow-sm dark:text-gray-300"
                            onClick={() => fileUploaderRef.current!.click()}
                        >
                            {!spinner ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
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
                            style={{ display: 'none' }}
                            ref={fileUploaderRef}
                            accept={'image/*'}
                            onChange={uploadImage}
                        />
                    </div>
                </>
            )}
            {/* Image container ENDS */}
            {/* Details-container */}
            <div className="flex flex-col gap-2">
                {/* brand input */}
                {!addProductInfo?.centralCatalogue?.id && (
                    <div>
                        <p className="text-sm font-bold text-gray-500 dark:text-gray-300">
                            Brand
                        </p>
                        <div className="des-modal-btn">
                            <input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    dispatch(
                                        setBrand({ id: undefined, name: event.target.value })
                                    )
                                }}
                                value={addProductInfo?.others?.brand?.name}
                                type="text"
                                placeholder="Enter brand"
                                className="focus:shadow-outline mt-2 w-full transform rounded-lg border border-transparent border-gray-200 bg-gray-100 px-4 py-2 text-base text-black opacity-75 transition duration-500 ease-in-out focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
                            />
                            {/* Modal handle btn */}
                            <button
                                className="modal-btn dark:text-gray-300"
                                onClick={handleModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
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
                                    'mt-1 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500 ' +
                                    (isValidBrand(
                                        !!addProductInfo?.centralCatalogue?.id,
                                        addProductInfo?.others?.brand?.name!
                                    )
                                        ? 'hidden'
                                        : '')
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

                {/* Category-Input */}
                {!addProductInfo?.centralCatalogue?.id && (
                    <div>
                        <p className="text-sm font-bold text-gray-500 dark:text-gray-300">
                            Category
                        </p>
                        <div className="des-modal-btn">
                            <input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    dispatch(
                                        setCentralCategory({
                                            id: undefined,
                                            name: event.target.value,
                                        })
                                    )
                                }}
                                value={addProductInfo?.others?.centralCategory?.name}
                                type="text"
                                placeholder="Enter category"
                                className="focus:shadow-outline mt-2 w-full transform rounded-lg border border-transparent border-gray-200 bg-gray-100 px-4 py-2 text-base text-black opacity-75 transition duration-500 ease-in-out focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
                            />
                            {/* Modal handle btn */}
                            <button
                                className="modal-btn dark:text-gray-300"
                                onClick={handleCategoryModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
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
                                    'mt-1 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500 ' +
                                    (isValidCategory(
                                        !!addProductInfo?.centralCatalogue?.id,
                                        addProductInfo?.others?.centralCategory?.name!
                                    )
                                        ? 'hidden'
                                        : '')
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
                {action === PAGE_ACTION.ADD && (
                    <div>
                        <p className="text-sm font-bold text-gray-500 dark:text-gray-300">
                            Tag
                        </p>
                        <div className="des-modal-btn">
                            <input
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    dispatch(
                                        setCategory({ id: undefined, name: event.target.value })
                                    )
                                }}
                                value={addProductInfo?.others?.category?.name}
                                type="text"
                                placeholder="Enter Tags"
                                className="focus:shadow-outline mt-2 w-full transform rounded-lg border border-transparent border-gray-200 bg-gray-100 px-4 py-2 text-base text-black opacity-75 transition duration-500 ease-in-out focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
                            />
                            {/* Modal handle btn */}
                            <button
                                className="modal-btn dark:text-gray-300"
                                onClick={handleTagsModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
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
                                    'mt-1 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500 ' +
                                    (isValidTag(
                                        !!addProductInfo?.centralCatalogue?.id,
                                        addProductInfo?.others?.category?.name!
                                    )
                                        ? 'hidden'
                                        : '')
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
                )}

                {/* Description-Input */}
                {!addProductInfo?.centralCatalogue?.id && (
                    <>
                        <Input
                            label="Description"
                            placeholder="Enter Description"
                            dispatch={dispatch}
                            value={addProductInfo?.centralCatalogue?.description}
                        />
                        {/* <span
              className={
                "mt-1 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500 " +
                (isValidDescription(
                  addProductInfo?.centralCatalogue?.description!
                )
                  ? "hidden"
                  : "")
              }
            >
              * Enter valid description !
            </span> */}
                    </>
                )}

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
                                    className="h-6 w-6"
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

                {/* SKU-Input */}
                {action === PAGE_ACTION.ADD && (
                    <Input
                        label="Your Item Code(SKU)"
                        placeholder="Enter SKU Code"
                        dispatch={dispatch}
                        value={addProductInfo?.others?.skuCode}
                    />
                )}

                {/* <Input label="Case Quantity" placeholder="Enter quantity..." dispatch={dispatch} value={addProductInfo?.others?.caseQuantity} /> */}
            </div>
        </div>
    )
}

export default OthersTab