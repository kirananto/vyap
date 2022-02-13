import React, { useEffect, useState } from 'react'
import { Header } from 'src/Components/Header'
import AppliedFilters from './AppliedFilters'
import Button from 'src/Components/Style/Button'
// import DropList from 'src/Components/Style/DropList'
import { useDispatch, useSelector } from 'react-redux'
import { pushItemsToCart, selectPlaceOrderInfo } from '../placeOrderSlice'
import { useNavigate } from 'react-router'
import { fetchProductById, fetchProducts } from 'src/API/products.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import ChatImg from '../../../../Product/assets/no_data.svg'
import transparentImg from 'src/assets/img/transparent.png'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'
import { selectAddItemsproductFilters } from './addProductFiltersSlice'
import ModalViewer from 'src/Components/Style/ModalViewer'
import { FilterPopup } from './FilterPopup'
import useQueryParam from 'src/utils/useQueryParams'
import { hapticFeedback } from 'src/utils/vibrate'
import { fetchPrevOrderedProducts } from 'src/API/suggestions.axios'
import ProductSuggestionCard from './ProductSuggestionCard'
import type { IProduct } from 'src/types/product'

export interface AddItemProductInterface extends IProduct {
    quantity: number
}
export default function AddItem() {
    const [itemList, setItemList] = useState<AddItemProductInterface[]>([])
    const [selectedItems, setSelectedItems] = useState<AddItemProductInterface[]>([])
    const [filterPopupOpen, setfilterPopupOpen] = useQueryParam<boolean>('filterPopupOpen')

    const [prevOrdered, setPrevOrdered] = useState<IProduct[]>([])
    //   const [isDropOpen, setIsDropOpen] = useState<
    //   | {
    //       isAdd: boolean;
    //       isOpen: any;
    //     }
    //   | undefined
    // >(undefined)

    const filters = useSelector(selectAddItemsproductFilters)
    const [searchValue, setSearchValue] = useState<string | undefined>(undefined)

    const { token, user } = useSelector(selectCredentials)

    const placeOrder = useSelector(selectPlaceOrderInfo)
    const isSupplier = localStorage.getItem('isSupplier') === 'true'

    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        fetchPrevOrderedProducts({
            token: token,
            buyerId: !isSupplier ? user?.organizationId : placeOrder.orgId,
            supplierId: isSupplier ? user?.organizationId : placeOrder.orgId,
            limit: 10,
            offset: 0
        }).then(async (result) => {
            const prev = await Promise.allSettled(result.data?.data?.map((productId: string) => {
                return fetchProductById({ token: token, id: productId })
            }))
            const newPrev = (prev.filter((item) => item.status === 'fulfilled') as PromiseFulfilledResult<{ data: IProduct }>[]).map((item) => item.value?.data)?.filter(item => item.outOfStock === false)
            // console.log('prev', newPrev)
            setPrevOrdered(newPrev)
        })
    }, [isSupplier, placeOrder.orgId, token, user?.organizationId])


    useEffect(() => {
        // TODO use placeOrder.orgId
        fetchProducts({
            token: token,
            outOfStock: false,
            organizationId: isSupplier ? user?.organizationId : placeOrder.orgId,
            limit: 100,
            offset: 0,
            search: searchValue,
            ordering: filters?.sorting,
            categoryIds: filters?.categories?.length
                ? `${filters?.categories
                    ?.map((item) => item.id)
                    .join(',')}`
                : undefined,
            brandIds: filters?.brands?.length
                ? `${filters?.brands?.map((item) => item.id).join(',')}`
                : undefined,
        }).then((result) => {
            setItemList(result.data?.data ?? [])
        })
    }, [token, isSupplier, user?.organizationId, placeOrder?.orgId, searchValue, filters?.categories, filters?.brands, filters?.sorting])

    function onSubmit() {
        //TODO Add to dispatch
        dispatch(pushItemsToCart(selectedItems))
        navigate('/place-order')
    }

    function handleAddItem(item: IProduct, caseQuantity: number) {
        const isAlreadyPresent = selectedItems?.some(
            (someItem) => someItem.id === item.id
        )
        if (isAlreadyPresent) {
            const _selectedItems = selectedItems
                ?.map((mapItem) => {
                    if (mapItem.id === item.id) {
                        return {
                            ...mapItem,
                            quantity: mapItem.quantity + caseQuantity,
                        }
                    }
                    return mapItem
                })
                .filter((filterItem) => filterItem.quantity > 0)

            setSelectedItems(_selectedItems)
        } else {
            const _selectedItems = [
                ...selectedItems,
                {
                    ...item,
                    quantity: caseQuantity,
                },
            ]

            setSelectedItems(_selectedItems)
        }
    }

    function updateItem(item: IProduct, caseQuantity: number) {
        const isAlreadyPresent = selectedItems?.some(
            (someItem) => someItem.id === item.id
        )
        if (isAlreadyPresent) {
            const _selectedItems = selectedItems
                ?.map((mapItem) => {
                    if (mapItem.id === item.id) {
                        return {
                            ...mapItem,
                            quantity: Math.abs(caseQuantity),
                        }
                    }
                    return mapItem
                })
                .filter((filterItem) => filterItem.quantity > 0)

            setSelectedItems(_selectedItems)
        } else {
            const _selectedItems = [
                ...selectedItems,
                {
                    ...item,
                    quantity: Math.abs(caseQuantity),
                },
            ]

            setSelectedItems(_selectedItems)
        }
    }

    function handleRemoveItemItem(item: IProduct, caseQuantity: number) {
        const _selectedItems = selectedItems
            ?.map((mapItem) => {
                if (mapItem.id === item.id) {
                    return {
                        ...mapItem,
                        quantity: mapItem.quantity - caseQuantity,
                    }
                }
                return mapItem
            })
            .filter((filterItem) => filterItem.quantity > 0)

        setSelectedItems(_selectedItems)
    }

    function calculatePriceOfSelected() {
        const price = selectedItems?.reduce(
            (a, b) => a + b.quantity * parseFloat(b?.rate),
            0
        )
        return price
    }

    // function closeDropList() {
    //     setIsDropOpen({
    //         isAdd: false,
    //         isOpen: undefined,
    //     })
    // }

    function renderItems() {
        if (itemList?.length === 0) {
            return (
                <div>
                    <img className="mt-12 h-48 p-6 m-auto" alt="no chats" src={ChatImg} />
                    <div className="text-center px-6 w-2/3 m-auto mb-8 dark:text-gray-300">
                        {' '}
                        Sorry the seller has no products for sale.{' '}
                    </div>
                </div>
            )
        }
        return itemList.map((item, index) => (
            <div
                className="flex flex-wrap bg-white-200 mt-2 border-b-2 border-gray-100 dark:border-gray-800 py-4"
                key={`${index}`}
            >
                <div className="relative self-center w-1/5 h-20  overflow-hidden">
                    <img
                        src={item?.thumbnailImage ? getImageURL(
                            item?.thumbnailImage,
                            IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                        ) : transparentImg}
                        alt=""
                        className="object-cover aspect-square rounded-lg overflow-hidden h-full w-auto bg-cover bg-center empty_image_background"
                    />
                    {/* )} */}
                </div>
                <div className="w-4/5 pl-4 ">
                    <div className=" text-lg font-bold mb-1 text-gray-600 dark:text-gray-200">
                        {item?.aliasName ?? ''}{item?.aliasName ? <i className="ml-1">({item?.centralCatalogue?.name})</i> : item?.centralCatalogue?.name}
                    </div>
                    <div className="inline-grid grid-cols-2 w-full gap-3 grid-flow-row-dense">
                        <div className="flex flex-col">
                            <div className="flex gap-2 mt-1">
                                <div className="text-xs font-semibold text-gray-500  dark:text-gray-400">
                                    <p>MRP:</p>
                                    <p>₹{item?.mrpPrice}</p>
                                </div>
                                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    <p>Cost:</p>
                                    <p>{item?.rate}</p>
                                </div>
                            </div>
                        </div>


                        <div className="flex gap-2 col-span-2 sm:col-span-1">
                            <div className="flex text-blue-600 dark:text-blue-400 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => {
                                        hapticFeedback()
                                        handleRemoveItemItem(item, 1)
                                    }}
                                    className="h-6 w-6 cursor-pointer"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div className="flex items-center dark:text-gray-200">
                                <form autoComplete="off">
                                    <input
                                        className="w-16 rounded border-dashed border px-2 border-indigo-300 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
                                        type="number"
                                        name="qty"
                                        id="qty"
                                        onChange={(e) => {
                                            updateItem(item, parseInt(e.target.value.toString()))
                                        }}
                                        value={
                                            selectedItems?.find(
                                                (findItem) => findItem.id === item.id
                                            )?.quantity ?? 0
                                        }
                                    />
                                </form>
                            </div>

                            <div className="flex text-blue-600 dark:text-blue-400 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => {
                                        hapticFeedback()
                                        handleAddItem(item, 1)
                                    }}
                                    className="h-6 w-6 cursor-pointer"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }

    return (
        <div className="bg-white min-h-screen dark:bg-gray-900">
            <div className="w-full pb-3 bg-white shadow dark:bg-gray-800">
                <Header
                    isSticky={false}
                    onBackClick={() => navigate('/place-order')}
                    heading="Add Item"
                />
                <AppliedFilters
                    setSearchValue={setSearchValue}
                    searchValue={searchValue ?? ''}
                    onFilterClick={() => setfilterPopupOpen(true)}
                />
            </div>
            <ModalViewer
                body={<FilterPopup />}
                isOpen={!!filterPopupOpen}
                onClose={() => setfilterPopupOpen(false)}
            />
            <div className="px-4 pb-24">
                {prevOrdered?.length > 0 ? <div className="p-1 pr-0 mt-4 rounded-lg mb-2">
                    <div className="dark:text-gray-400 mb-1">Choose previously ordered items...</div>
                    <div className="flex gap-2 overflow-x-scroll">
                        {prevOrdered?.map(item => <ProductSuggestionCard
                            key={item.id}
                            item={item}
                            handleAddItem={handleAddItem}
                            handleRemoveItemItem={handleRemoveItemItem}
                            updateItem={updateItem}
                            selectedItems={selectedItems}
                        />)}
                    </div>
                </div> : null}
                {renderItems()}
            </div>
            {selectedItems?.length > 0 ? <div className="fixed bottom-10 m-auto left-0 right-0 px-4">
                <Button onClick={onSubmit}>
                    {`Add ${selectedItems?.length} items (₹${calculatePriceOfSelected()})`}
                </Button>
            </div> : null}
        </div>
    )
}