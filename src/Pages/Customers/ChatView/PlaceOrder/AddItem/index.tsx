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

        ((activeTab === ADD_ITEM_TABS.ALL_PRODUCTS) && ((position.x  < -100) && (Math.abs(position.y)  < 50) )) && setActiveTab(ADD_ITEM_TABS.PREVIOUSLY_ORDERED);
        ((activeTab === ADD_ITEM_TABS.PREVIOUSLY_ORDERED) && ((position.x  < -80) && (Math.abs(position.y)  < 50) )) && setActiveTab(ADD_ITEM_TABS.TAG_LIST );

        ((activeTab === ADD_ITEM_TABS.TAG_LIST) && ((position.x  > 100) && (Math.abs(position.y)  < 70) )) && setActiveTab(ADD_ITEM_TABS.PREVIOUSLY_ORDERED);
        ((activeTab === ADD_ITEM_TABS.PREVIOUSLY_ORDERED) && ((position.x  > 100) && (Math.abs(position.y)  < 70) )) && setActiveTab(ADD_ITEM_TABS.ALL_PRODUCTS )

    }

    const handleFetchTagItems = useCallback((productList) => {
        const tagSorted : TagListProps  = {}
        productList?.forEach((item : IProduct ) => {
            const tag = item?.organizationCatalogueCategory?.name
            if(tag){
                if(tag in tagSorted){
                    const prev = tagSorted[tag]
                    const updated = [...prev, item]
                    tagSorted[tag] = updated
                }else{
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
    }, [token, isSupplier, handleFetchTagItems,  user?.organizationId, placeOrder?.orgId, searchValue, filters?.categories, filters?.brands, filters?.sorting])

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
        return price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
    }

    // function closeDropList() {
    //     setIsDropOpen({
    //         isAdd: false,
    //         isOpen: undefined,
    //     })
    // }
    
    function renderTagItems(){
        return <div className='dark:text-slate-300'>

            {Object.keys(tagList)?.map((keyName, i) => {
                return (<div key={i} className="mb-2">
                    <div 
                        className={`flex p-4 items-center justify-between dark:bg-slate-700 bg-slate-200 mt-2 `}
                        onClick={() => isExpanded === keyName ?  setIsExpanded(undefined) : setIsExpanded(keyName)}
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
                        {(isExpanded === keyName ) &&  renderItems(tagList[keyName]) }
                    </div> 
                </div>
                )
            })}
        </div>
    }

    function renderItems(items : IProduct[]) {
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
        return items.map((item, index) => (
            <div
                className={`flex flex-wrap  
                ${selectedItems?.find(
                (findItem) => findItem.id === item.id
            ) ? 'bg-blue-100 dark:bg-blue-900'  : 'bg-white-200'
            } 
                mt-2 border-b-2 border-slate-100 dark:border-slate-800 py-4`}
                key={`${index}`}
            >
                <div className="relative self-center w-1/5 h-20  overflow-hidden">
                    <img
                        loading="lazy"
                        src={item?.thumbnailImage ? getImageURL(
                            item?.thumbnailImage,
                            IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                        ) : transparentImg}
                        alt=""
                        className="object-cover aspect-square rounded overflow-hidden h-full w-auto bg-cover bg-center empty_image_background"
                    />
                    {/* )} */}
                </div>
                <div className="w-4/5 pl-4 ">
                    <div className=" text-lg font-bold mb-1 text-slate-600 dark:text-slate-200">
                        {item?.aliasName ?? ''}{item?.aliasName ? <i className="ml-1">({item?.centralCatalogue?.name})</i> : item?.centralCatalogue?.name}
                    </div>
                    <div className="inline-grid grid-cols-2 w-full gap-3 grid-flow-row-dense">
                        <div className="flex flex-col">
                            <div className="flex gap-2 mt-1">
                                <div className="text-xs font-semibold text-slate-500  dark:text-slate-400">
                                    <p>MRP:</p>
                                    <p>{parseFloat(item?.mrpPrice)?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
                                </div>
                                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                    <p>SP:</p>
                                    <p>{parseFloat(item?.rate)?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
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
                            <div className="flex items-center dark:text-slate-200">
                                <form autoComplete="off">
                                    <input
                                        className="w-16 rounded border-dashed border px-2 border-indigo-300 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
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
                <div className={`flex flex-grow pb-2 justify-center ${activeTab === ADD_ITEM_TABS.ALL_PRODUCTS  && 'border-b-4 border-indigo-500' } `}
                    onClick={() => setActiveTab(ADD_ITEM_TABS.ALL_PRODUCTS)}>
                    <p className="px-0"> {ADD_ITEM_TABS.ALL_PRODUCTS} </p>
                </div>
                <div className={`flex flex-grow pb-2 justify-center ${activeTab === ADD_ITEM_TABS.PREVIOUSLY_ORDERED  && 'border-b-4 border-indigo-500' }`}
                    onClick={() => setActiveTab(ADD_ITEM_TABS.PREVIOUSLY_ORDERED)}>
                    <p className="px-0"> {ADD_ITEM_TABS.PREVIOUSLY_ORDERED} </p>
                </div>

                <div className={`flex flex-grow pb-2 justify-center ${activeTab === ADD_ITEM_TABS.TAG_LIST  && 'border-b-4 border-indigo-500' }`}
                    onClick={() => setActiveTab(ADD_ITEM_TABS.TAG_LIST)}>
                    <p className="px-0"> {ADD_ITEM_TABS.TAG_LIST} </p>
                </div>
            </div>

            <div>

                <Swipe
                    onSwipeMove={onSwipeMove}>
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

                {selectedItems?.length > 0 ? <div className="fixed bg-white dark:bg-slate-800 bottom-0 m-auto left-0 right-0 px-4 p-4 pb-10">
                    <Button onClick={onSubmit}>
                        {`Add ${selectedItems?.length} items (${calculatePriceOfSelected()})`}
                    </Button>
                </div> : null}
            </div>
           
        </div>
    )
}