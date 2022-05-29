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
import SimpleHeader from '../../../../Components/Header/SimpleHeader'
import { clearAll, selectAddProductInfo, setVariants, variantInterface } from '../redux/addProductSlice'
import ItemCard from './ItemCard'
import OthersTab from './OthersTab/OthersTab'
import { PAGE_ACTION, TABS } from './types'
import {
    isValidBrand,
    isValidCategory,
    // isValidDescription,
    isValidGST,
    isValidHSN,
    isValidTag,
    isValidVariants,
} from './validations'
import VariantsTab from './VariantsTab/VariantsTab'

function CreateProduct() {
    const [toggleState, setToggleState] = useState(TABS.VARIANTS)
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

    function handleBeforeUnload(e: BeforeUnloadEvent) {
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
        const isValid = isValidVariants((addProductInfo?.centralCatalogue?.variants ?? [])?.filter(filterItem => filterItem.isSelected))
        console.log('isValid', isValid)
        return isValid
    }

    const validateOthers = () => {
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
            )&&
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

    const onProceed = (isEdit: boolean) => {
        const isValidPricing = validatePricing()
        const isValidOthers = isEdit ? true : validateOthers()
        setSaveAttempt((value) => value + 1)
        if (isValidPricing && !isValidOthers) toggleTabs(TABS.OTHERS)

        if (!isValidPricing && isValidOthers) toggleTabs(TABS.VARIANTS)

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
        let _variants: variantInterface[] = addProductInfo?.centralCatalogue?.variants ?? []
        if (!addProductInfo?.centralCatalogue?.id) {
            const centralProduct: IAddCentralProductResponse | null = await postAddCentralProduct({
                token, data: {
                    name: addProductInfo?.centralCatalogue?.name,
                    description: addProductInfo?.centralCatalogue?.description ?? '',
                    categories: addProductInfo?.others?.centralCategory?.id ? [{
                        id: addProductInfo?.others?.centralCategory?.id,
                        name: addProductInfo?.others?.centralCategory?.name ?? '',
                        description: addProductInfo?.others?.centralCategory?.description ?? '',
                        imageName: addProductInfo?.others?.centralCategory?.imageName ?? '',
                    }] : [{
                        name: addProductInfo?.others?.centralCategory?.name ?? '',
                        description: addProductInfo?.others?.centralCategory?.name ?? '',
                        imageName: addProductInfo?.others?.centralCategory?.name ?? '',
                    }],
                    barCode: addProductInfo?.others?.barCode,
                    images: addProductInfo?.others?.productImage?.map((image) => ({
                        title: image.title,
                        description: image.description,
                        imageName: image.imageName
                    })),
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
                    variants: addProductInfo.centralCatalogue?.variants?.map(mapItem => ({ mrpPrice: mapItem.mrpPrice, name: mapItem.name }))
                }
            })
            centralCatalogueId = centralProduct?.data?.id
            _variants = (addProductInfo.centralCatalogue?.variants?.map((mapItem, index) => {
                return {
                    ...centralProduct?.data?.variants[index],
                    salesPrice: mapItem.salesPrice,
                    isSelected: mapItem.isSelected
                }
            }) ?? [])
            dispatch(setVariants(_variants))
        }

        console.log('_variants', _variants)


        _variants?.filter(filterItem => filterItem.isSelected)?.forEach(item => {
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
                mrpPrice: parseFloat(`${item.mrpPrice}`),
                rate: parseFloat(`${item.salesPrice}`),
                variantId: item.id
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
        })
    }

    const handleEditProduct = async () => {
        setIsLoading(true)
        let _variants: variantInterface[] = (addProductInfo?.centralCatalogue?.variants ?? [])?.filter(filterItem => filterItem.id === addProductInfo.editProduct.variantId)
        console.log(_variants)
        const organizationCatalogueId: string = addProductInfo?.editProductId ?? ''

        const body: IEditProduct = {
            aliasName: addProductInfo?.others?.aliasName
                ? addProductInfo?.others?.aliasName
                : '',
            mrpPrice: parseFloat(`${_variants[0]?.mrpPrice}`),
            rate: parseFloat(`${_variants[0]?.salesPrice}`),
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
        <div className=" create-product-container dark:bg-slate-900">
            <SimpleHeader
                heading={`${pageAction === PAGE_ACTION.EDIT ? 'Edit Product ' : 'Create Product'
                    }`}
            />

            <div className="mx-auto w-11/12  px-2 pt-20">
                <h1 className="mb-2 font-bold text-slate-500 dark:text-slate-300">
                    What is the product?
                </h1>
                {/* ===--===Product card===--=== */}
                <ItemCard productImage={productImage} />
                {/* -------- */}
                <div className="flex justify-between py-4">
                    <button
                        onClick={() => toggleTabs(TABS.VARIANTS)}
                        className={`w-1/2 rounded px-6 py-2 font-semibold ${toggleState === TABS.VARIANTS
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 '
                            : 'text-slate-500 dark:text-slate-300'
                            }`}
                    >
                        Variants
                    </button>
                    <button
                        onClick={() => toggleTabs(TABS.OTHERS)}
                        className={`w-1/2 rounded px-6 py-2 font-semibold ${toggleState === TABS.OTHERS
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                            : 'text-slate-500 dark:text-slate-300'
                            }`}
                    >
                        Others
                    </button>
                </div>
                {/* -------- */}

                {/* -------------------TAB-1----------------- */}
                <div className={toggleState === TABS.VARIANTS ? 'block' : 'hidden'}>
                    <VariantsTab saveAttempt={saveAttempt} action={pageAction} />
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