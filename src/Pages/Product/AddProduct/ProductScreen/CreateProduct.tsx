import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {
    fetchCentralProductImages,
    IAddProduct,
    IEditProduct,
    patchProductById,
    postAddCentralProduct,
    postAddProduct,
} from 'src/API/products.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import type { IAddCentralProductResponse } from 'src/types/addCentralProductResponse'
import type { ICentralCatalogue, IDataEntity } from 'src/types/centralCatalogue'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'
import { SimpleFooter } from '../../../../Components/Footer'
import { SimpleHeader } from '../../../../Components/Header'
import { clearAll, selectAddProductInfo } from '../redux/addProductSlice'
import './CreateProduct.css'
import ItemCard from './ItemCard'
import OthersTab from './OthersTab'
import PricingTab from './PricingTab'
import { PAGE_ACTION, TABS } from './types'
import {
    isValidBrand,
    isValidCategory,
    // isValidDescription,
    isValidGST,
    isValidHSN,
    isValidMRP,
    isValidSalePrice,
    isValidTag,
} from './validations'

function CreateProduct() {
    const [toggleState, setToggleState] = useState(TABS.PRICING)
    const [isLoading, setIsLoading] = useState(false)
    const [saveAttempt, setSaveAttempt] = useState(0)
    const [productImage, setProductImage] = useState<string>()
    const addProductInfo = useSelector(selectAddProductInfo)
    const { user, token } = useSelector(selectCredentials)

    const pageAction = addProductInfo.editProductId
        ? PAGE_ACTION.EDIT
        : PAGE_ACTION.ADD
    const trackBackBtn = useRef(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const toggleTabs = (tab: TABS) => {
        console.log(`toggling...${tab}`)
        setToggleState(tab)
    }

    useEffect(() => {
        if (!addProductInfo?.editProductId) {
            return () => {
                dispatch(clearAll())
            }
        }
    }, [addProductInfo?.editProductId, dispatch])

    function popStateHandler() {
        if (trackBackBtn.current) {
            const leavePageAlert = confirm(
                'Are you sure to Go back?... Inputs will be lost.'
            )
            if (leavePageAlert) {
                trackBackBtn.current = false
                history.back()
            } else {
                trackBackBtn.current = true
                history.pushState(null, location.href, location.href)
            }
        }
    }

    function handleBeforeUnload(e: any) {
        const confirmationMessage = 'o/';

        (e || window.event).returnValue = confirmationMessage //Gecko + IE
        return confirmationMessage //Webkit, Safari, Chrome
    }

    useEffect(() => {
        /* avoid accidental back button hit - confirm alert */
        history.pushState(null, location.href, location.href)
        window.addEventListener('popstate', popStateHandler)

        //Reload confirmation alert
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('popstate', popStateHandler)
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [])

    useEffect(() => {
        if (addProductInfo?.centralCatalogue?.id) {
            fetchCentralProductImages(
                { token, limit: 100, offset: 0, catalogueId: addProductInfo?.centralCatalogue?.id }).then((result: ICentralCatalogue) => {
                const imageName = result?.data?.data?.filter((filterItem: IDataEntity) =>
                    filterItem?.imageName?.includes('.')
                )?.[0]?.imageName
                if (imageName) {
                    setProductImage(
                        getImageURL(imageName, IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE)
                    )
                }
            })
            return () => {
                setProductImage('')
            }
        } else {
            if (addProductInfo?.others?.productImage?.length > 0) {
                setProductImage(
                    getImageURL(
                        addProductInfo?.others?.productImage[0]?.imageName,
                        IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                    )
                )
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addProductInfo?.others?.productImage?.length, addProductInfo?.centralCatalogue?.id,])

    const validatePricing = () => {
        //validation for edit
        return (
            isValidMRP(addProductInfo.pricing?.mrpPrice) &&
            isValidSalePrice(addProductInfo.pricing?.salesPrice) &&
            isValidGST(
                addProductInfo.pricing?.taxEnabled,
                !!addProductInfo?.centralCatalogue?.id,
                addProductInfo.pricing?.hsn?.gstPercentage ??
                addProductInfo.pricing?.gstPercentage
            ) &&
            isValidHSN(
                addProductInfo.pricing?.taxEnabled,
                !!addProductInfo?.centralCatalogue?.id,
                addProductInfo.pricing?.hsn?.hsn
            )
        )
    }

    const validateOthers = () => {
        // return (isValidDescription(addProductInfo?.centralCatalogue?.description!) &&
        return (
            isValidCategory(
                !!addProductInfo?.centralCatalogue?.id,
                addProductInfo?.others?.centralCategory?.name
            ) &&
            isValidTag(
                !!addProductInfo?.centralCatalogue?.id,
                addProductInfo?.others?.category?.name
            ) &&
            isValidBrand(
                !!addProductInfo?.centralCatalogue?.id,
                addProductInfo?.others?.brand?.name
            )
        )
    }

    const onProceed = (isEdit: boolean) => {
        const isValidPricing = validatePricing()
        const isValidOthers = validateOthers()
        setSaveAttempt((value) => value + 1)
        if (isValidPricing && !isValidOthers) toggleTabs(TABS.OTHERS)

        if (!isValidPricing && isValidOthers) toggleTabs(TABS.PRICING)

        if (isValidPricing && isValidOthers) {
            if (isEdit) {
                handleEditProduct()
            } else {
                handleAddProduct()
            }
        }
    }

    const handleAddProduct = async () => {
        setIsLoading(true)
        let centralCatalogueId: string = addProductInfo?.centralCatalogue?.id ?? ''

        if (!addProductInfo?.centralCatalogue?.id) {
            const centralProduct: IAddCentralProductResponse | null = await postAddCentralProduct({
                token, data: {
                    name: addProductInfo?.centralCatalogue?.name,
                    description: addProductInfo?.centralCatalogue?.description ?? '',
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
                }
            })
            centralCatalogueId = centralProduct?.data?.id
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
            thumbnailImage: addProductInfo?.centralCatalogue?.id
                ? addProductInfo?.centralCatalogue?.images?.[0]?.imageName
                : addProductInfo?.others?.productImage?.[0]?.imageName,
            aliasName: addProductInfo?.centralCatalogue?.id
                ? addProductInfo?.others?.aliasName
                : '',
            centralCatalogueId,
            itemSKUCode: addProductInfo?.others?.skuCode,
            taxEnabled: addProductInfo?.pricing?.taxEnabled,
            mrpPrice: parseFloat(`${addProductInfo?.pricing?.mrpPrice}`),
            rate: parseFloat(`${addProductInfo?.pricing?.salesPrice}`),
        }

        postAddProduct({ token, data: body })
            .then((response) => {
                setIsLoading(false)
                console.log('response', response)
                navigate('/my-products')
            })
            .catch((error) => {
                setIsLoading(false)
                console.log('add product error', error)
            })
    }

    const handleEditProduct = async () => {
        setIsLoading(true)
        const organizationCatalogueId: string = addProductInfo?.editProductId ?? ''

        const body: IEditProduct = {
            aliasName: addProductInfo?.others?.aliasName
                ? addProductInfo?.others?.aliasName
                : '',
            mrpPrice: parseFloat(`${addProductInfo.pricing?.mrpPrice}`),
            rate: parseFloat(`${addProductInfo.pricing?.salesPrice}`),
        }

        patchProductById({ token: token, id: organizationCatalogueId, data: body })
            .then((response) => {
                setIsLoading(false)
                console.log('response', response)
                navigate('/my-products')
            })
            .catch((error) => {
                setIsLoading(false)
                console.log('Edit product error', error)
            })
    }

    return (
        <div className=" create-product-container dark:bg-gray-900">
            <SimpleHeader
                heading={`${pageAction === PAGE_ACTION.EDIT ? 'Edit Product ' : 'Create Product'
                }`}
            />

            <div className="mx-auto w-11/12  px-2 pt-20">
                <h1 className="mb-2 font-bold text-gray-500 dark:text-gray-300">
                    What is the product?
                </h1>
                {/* ===--===Product card===--=== */}
                <ItemCard productImage={productImage} />
                {/* -------- */}
                <div className="flex justify-between py-4">
                    <button
                        onClick={() => toggleTabs(TABS.PRICING)}
                        className={`w-1/2 rounded-lg px-6 py-2 font-semibold ${toggleState === TABS.PRICING
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 '
                            : 'text-gray-500 dark:text-gray-300'
                        }`}
                    >
                        Pricing
                    </button>
                    <button
                        onClick={() => toggleTabs(TABS.OTHERS)}
                        className={`w-1/2 rounded-lg px-6 py-2 font-semibold ${toggleState === TABS.OTHERS
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                            : 'text-gray-500 dark:text-gray-300'
                        }`}
                    >
                        Others
                    </button>
                </div>
                {/* -------- */}

                {/* -------------------TAB-1----------------- */}
                <div className={toggleState === TABS.PRICING ? 'block' : 'hidden'}>
                    <PricingTab saveAttempt={saveAttempt} action={pageAction} />
                </div>

                {/* -------------------TAB-1----------------- */}
                <div className={toggleState === TABS.OTHERS ? 'block' : 'hidden'}>
                    <OthersTab saveAttempt={saveAttempt} action={pageAction} />
                </div>
            </div>

            {pageAction === PAGE_ACTION.EDIT ? (
                <SimpleFooter
                    btnName={isLoading ? 'Loading...' : 'Update Product'}
                    isDisabled={isLoading}
                    onClick={() => onProceed(true)}
                />
            ) : (
                <SimpleFooter
                    btnName={isLoading ? 'Loading...' : 'Add Product'}
                    isDisabled={isLoading}
                    onClick={() => onProceed(false)}
                />
            )}
        </div>
    )
}

export default CreateProduct