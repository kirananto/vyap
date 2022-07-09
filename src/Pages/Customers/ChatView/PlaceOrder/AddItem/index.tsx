import React, { useCallback, useEffect, useState } from 'react'
import Header from 'src/Components/Header/Header'
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
//import ProductSuggestionCard from './ProductSuggestionCard'
import type { IProduct } from 'src/types/product'
import { ADD_ITEM_TABS } from './types'
import _ from 'lodash'
import ArrowUpIcon from 'src/Components/Style/Icons/ArrowUpIcon'
import ArrowDownIcon from 'src/Components/Style/Icons/ArrowDownIcon'
import Swipe from 'react-easy-swipe'
import Spinner from 'src/Components/Style/Spinner'
import AddItemCard from './AddItemCard'


export interface AddItemProductInterface extends IProduct {
    quantity: number
}
export interface SwipePosition {
    x: number;
    y: number;
}

type TagListProps = {
    [key: string]: IProduct[]
}

export default function AddItem() {
    const [loading, setLoading] = useState(true)
    const [loadingRecent, setLoadingRecent] = useState(true)

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

    const [activeTab, setActiveTab] = useState(ADD_ITEM_TABS.ALL_PRODUCTS)
    const [tagList, setTagList] = useState<TagListProps>({})
    const [isExpanded, setIsExpanded] = useState<string | undefined>(undefined)

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
        }).finally(() => {
            setLoadingRecent(false)
        })
    }, [isSupplier, placeOrder.orgId, token, user?.organizationId])

    function onSwipeMove(position: SwipePosition) {

        // console.log(`Moved ${position.x} pixels horizontally`, event)
        // console.log(`Moved ${position.y} pixels vertically----`, event);

        ((activeTab === ADD_ITEM_TABS.ALL_PRODUCTS) && ((position.x < -100) && (Math.abs(position.y) < 50))) && setActiveTab(ADD_ITEM_TABS.PREVIOUSLY_ORDERED);
        ((activeTab === ADD_ITEM_TABS.PREVIOUSLY_ORDERED) && ((position.x < -80) && (Math.abs(position.y) < 50))) && setActiveTab(ADD_ITEM_TABS.TAG_LIST);

        ((activeTab === ADD_ITEM_TABS.TAG_LIST) && ((position.x > 100) && (Math.abs(position.y) < 70))) && setActiveTab(ADD_ITEM_TABS.PREVIOUSLY_ORDERED);
        ((activeTab === ADD_ITEM_TABS.PREVIOUSLY_ORDERED) && ((position.x > 100) && (Math.abs(position.y) < 70))) && setActiveTab(ADD_ITEM_TABS.ALL_PRODUCTS)

    }

    const handleFetchTagItems = useCallback((productList: any) => {
        const tagSorted: TagListProps = {}
        productList?.forEach((item: IProduct) => {
            const tag = item?.organizationCatalogueCategory?.name
            if (tag) {
                if (tag in tagSorted) {
                    const prev = tagSorted[tag]
                    const updated = [...prev, item]
                    tagSorted[tag] = updated
                } else {
                    _.set(tagSorted, tag, [item])
                }
            }
        })
        setTagList(tagSorted)
    }, [])


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
            handleFetchTagItems(result.data?.data)
        }).finally(() => {
            setLoading(false)
        })
    }, [token, isSupplier, handleFetchTagItems, user?.organizationId, placeOrder?.orgId, searchValue, filters?.categories, filters?.brands, filters?.sorting])

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
                }).filter(filterItem => filterItem.quantity > 0)

            setSelectedItems(_selectedItems)
        } else {
            const _selectedItems = [
                ...selectedItems,
                {
                    ...item,
                    quantity: Math.abs(caseQuantity),
                },
            ].filter(filterItem => filterItem.quantity > 0)

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
        return price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
    }

    // function closeDropList() {
    //     setIsDropOpen({
    //         isAdd: false,
    //         isOpen: undefined,
    //     })
    // }

    function renderTagItems() {
        return <div className='dark:text-slate-300'>

            {Object.keys(tagList)?.map((keyName, i) => {
                return (<div key={i} className="mb-2">
                    <div
                        className={`flex p-4 items-center justify-between dark:bg-slate-700 bg-slate-200 mt-2 `}
                        onClick={() => isExpanded === keyName ? setIsExpanded(undefined) : setIsExpanded(keyName)}
                    >
                        <div className="flex text-xl font-semibold text-slate-800 dark:text-slate-200 ">
                            {keyName} <span className="text-sm self-center"> &nbsp; {` ( ${tagList[keyName].length}  ) `}</span>
                        </div>

                        <div>
                            {isExpanded === keyName ? (
                                <div
                                    className="flex text-slate-600 dark:text-slate-200"
                                >
                                    <ArrowUpIcon />
                                </div>
                            ) : (
                                <div
                                    className="flex text-slate-600 dark:text-slate-200"
                                >
                                    <ArrowDownIcon />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="">
                        {(isExpanded === keyName) && renderItems(tagList[keyName])}
                    </div>
                </div>
                )
            })}
        </div>
    }

    function renderItems(items: IProduct[]) {
        if (items?.length === 0) {
            return (
                <div>
                    <img loading="lazy" className="mt-12 h-48 p-6 m-auto" alt="no chats" src={ChatImg} />
                    <div className="text-center px-6 w-2/3 m-auto mb-8 dark:text-slate-300">
                        {' '}
                        Sorry the seller has no products for sale.{' '}
                    </div>
                </div>
            )
        }
        return items.filter((elem, index) => {
            return items.findIndex(obj => obj.centralCatalogue.id === elem.centralCatalogue.id) === index
        }).map((item) => (
            <AddItemCard
                key={item.id}
                handleAddItem={handleAddItem}
                item={item}
                handleVariantChange={(variantId: string) => handleVariantChange(item.id, variantId )}
                selectedItems={selectedItems}
                handleRemoveItemItem={handleRemoveItemItem}
                setSelectedItems={setSelectedItems}
                updateItem={updateItem}
            />
        ))
    }

    const handleVariantChange = (itemId: string, variantId: string, ) => {
        console.log('handleVariantChange', itemId, variantId)
        const newItem: any = itemList.find((findItem ) => findItem.variantId === variantId)
        const oldItem: any = itemList.find((findItem ) => findItem.id === itemId)
        const item = selectedItems.find(findItem => findItem.id === itemId)
        if(newItem?.id !== oldItem.id) {
            // todo swap product
            // TODO bug --> THe item will get missed.
            const _itemList = itemList.map(mapItem => {
                if(mapItem.id === oldItem?.id && newItem) {
                    return {...newItem, quantity: item?.quantity }
                }
                if(mapItem.id === newItem?.id && oldItem) {
                    return {...oldItem, quantity: 0 }
                }
                return mapItem
            })

            // updateItem(newItem, item?.quantity ?? 0)
            // updateItem(oldItem, 0)

            console.log(selectedItems)

            setSelectedItems(_selectedItems => {
                const a = _selectedItems?.filter(filterItem => filterItem.id !== oldItem.id)?.map(mapItem => {
                console.log('item1', item)
                if(mapItem.id === newItem.id){
                    console.log('item', item)
                    return { ...mapItem, quantity: item?.quantity ?? 0 }
                } else {
                    return mapItem
                }
            })
            if(!a.find(findItem => findItem.id === newItem.id)) {
                a.push({ ...newItem, quantity: item?.quantity ?? 0 })
            }
            return a.filter(filterItem => (filterItem.quantity ?? 0) > 0)
        })

            console.log('_itemList', _itemList)

            setItemList(_itemList)
        }



    }

    return (
        <div className="bg-white min-h-screen dark:bg-slate-900">
            <div className="w-full pb-2 bg-white dark:bg-slate-800">
                <Header
                    isSticky={false}
                    onBackClick={() => navigate('/place-order')}
                    heading="Add Item"
                />
            </div>
            <ModalViewer
                body={<FilterPopup />}
                isOpen={!!filterPopupOpen}
                onClose={() => setfilterPopupOpen(false)}
            />

            <div className="flex text-lg pt-4 mb-2 px-4 justify-between dark:text-slate-300 shadow-md shadow-slate-200 dark:shadow-slate-800">
                <div className={`flex flex-grow pb-2 justify-center ${activeTab === ADD_ITEM_TABS.ALL_PRODUCTS && 'border-b-4 border-indigo-500'} `}
                    onClick={() => setActiveTab(ADD_ITEM_TABS.ALL_PRODUCTS)}>
                    <p className="px-0"> {ADD_ITEM_TABS.ALL_PRODUCTS} </p>
                </div>
                <div className={`flex flex-grow pb-2 justify-center ${activeTab === ADD_ITEM_TABS.PREVIOUSLY_ORDERED && 'border-b-4 border-indigo-500'}`}
                    onClick={() => setActiveTab(ADD_ITEM_TABS.PREVIOUSLY_ORDERED)}>
                    <p className="px-0"> {ADD_ITEM_TABS.PREVIOUSLY_ORDERED} </p>
                </div>

                <div className={`flex flex-grow pb-2 justify-center ${activeTab === ADD_ITEM_TABS.TAG_LIST && 'border-b-4 border-indigo-500'}`}
                    onClick={() => setActiveTab(ADD_ITEM_TABS.TAG_LIST)}>
                    <p className="px-0"> {ADD_ITEM_TABS.TAG_LIST} </p>
                </div>
            </div>

            <div>
                {/*@ts-ignore */}
                <Swipe onSwipeMove={onSwipeMove}>
                    <div className="pb-24">
                        {
                            activeTab === ADD_ITEM_TABS.PREVIOUSLY_ORDERED &&
                            <div className="h-[70vh] overflow-scroll">
                                <div className="px-4">
                                    {/* {prevOrdered?.length > 0 ? <div className="p-1 pr-0 mt-4 rounded mb-2">
                            <div className="dark:text-slate-400 mb-1">Choose previously ordered items...</div>
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
                        </div> : null} */}

                                    {loadingRecent

                                        ? <div className="p-12 pt-60 text-center dark:text-slate-100 grid">
                                            <Spinner />
                                        </div>
                                        :
                                        <> {renderItems(prevOrdered)} </>

                                    }
                                </div>
                            </div>
                        }

                        {
                            activeTab === ADD_ITEM_TABS.ALL_PRODUCTS &&
                            <div className='py-1'>

                                <div className="border-b border-slate-200 dark:border-slate-800 pb-1">
                                    <AppliedFilters
                                        setSearchValue={setSearchValue}
                                        searchValue={searchValue ?? ''}
                                        onFilterClick={() => setfilterPopupOpen(true)}
                                    />

                                </div>


                                <div className="h-[70vh] overflow-scroll mt-1">
                                    <div className="px-4">
                                        {loading

                                            ? <div className="p-12 pt-60 text-center dark:text-slate-100 grid">
                                                <Spinner />
                                            </div>
                                            :
                                            <> {renderItems(itemList)} </>

                                        }
                                    </div>
                                </div>

                            </div>
                        }

                        {
                            activeTab === ADD_ITEM_TABS.TAG_LIST &&
                            <div className="h-[70vh] overflow-scroll">
                                <div className="px-4">
                                    {loading

                                        ? <div className="p-12 pt-60 text-center dark:text-slate-100 grid">
                                            <Spinner />
                                        </div>
                                        :
                                        <> {renderTagItems()}</>

                                    }

                                </div>
                            </div>
                        }

                    </div>

                </Swipe>

                {selectedItems?.length >= 1 && calculatePriceOfSelected() != "₹NaN" ? <div className="fixed bg-white dark:bg-slate-800 bottom-0 m-auto left-0 right-0 px-4 p-4 pb-10">
                    <Button onClick={onSubmit}>
                        {`Add ${selectedItems?.length} items (${calculatePriceOfSelected()})`}
                    </Button>
                </div> : null}
            </div>

        </div>
    )
}