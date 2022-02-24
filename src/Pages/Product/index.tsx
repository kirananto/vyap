import React, { useState, useEffect, useCallback } from 'react'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
import ProductCard from './ProductCard'
import { fetchProducts } from 'src/API/products.axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectCredentials } from '../Login/credentialsSlice'
import { FilterPopup } from './Popups/FilterPopup'
import { MorePopup } from './Popups/MorePopup'
import { SearchMorePopup } from './Popups/SearchMorePopup'
import { Link } from 'react-router-dom'
import ChatImg from './assets/no_data.svg'
import ModalViewer from 'src/Components/Style/ModalViewer'
import AppliedFilters from './AppliedFilters'
import { clearAll, selectProductFilters } from './productFiltersSlice'
import { selectProductsInfo, setProducts } from './productsSlice'
import { FormattedMessage, useIntl } from 'react-intl'
import Spinner from 'src/Components/Style/Spinner'
import useQueryParam from 'src/utils/useQueryParams'
import type { IProduct } from 'src/types/product'
import type { IProductList } from 'src/types/fetchProducts'
import { hapticFeedback } from 'src/utils/vibrate'
import { useScrollDirection } from 'react-use-scroll-direction'

// ! Main Component
export default function Product() {
    const { token, user } = useSelector(selectCredentials)
    const [loading, setLoading] = useState(true)
    const filters = useSelector(selectProductFilters)
    const { products } = useSelector(selectProductsInfo)
    const [longPresEnabled, setLongPressEnabled] = useState(true)

    const intl = useIntl()
    const dispatch = useDispatch()

    // ! Tracking the total number of products is checked..
    // !--------------->
    const [filterPopupOpen, setfilterPopupOpen] =
        useQueryParam<boolean>('filterPopupOpen')

    // !------------------->
    const [isMoreEnabled, setisMoreEnabled] = useState<boolean>(true)
    const [isMoreOpen, setisMoreOpen] = useQueryParam<boolean>('isMoreOpen')
    const [isMoreItem, setIsMoreItem] = useState<IProduct>()
    const [isSearchMoreOpen, setisSearchMoreOpen] =
        useQueryParam<boolean>('isSearchMoreOpen')

    const [searchValue, setSearchValue] = useState<string>('')
    const [reRenderCounter, setCounter] = useState(1)
    //  !--------Search-bar-more---------->
    const [selectedProduct, setselectedProduct] = useState<IProduct[]>([])

    useEffect(() => {
        if (selectedProduct.length === 0)
            setLongPressEnabled(true)
    }, [selectedProduct])

    useEffect(() => {
        if (longPresEnabled)
            setisMoreEnabled(true)
        else
            setisMoreEnabled(false)
    }, [longPresEnabled])


    //......To avoid long press event while scrolling chat....//
    const [scrollTargetRef, target] = useCallbackRef()
    const { isScrolling } = useScrollDirection(target)
    function useCallbackRef() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [value, setValue] = React.useState<any>()
        const ref = useCallback((node: HTMLElement) => {
            if (node !== null) setValue(node)
        }, [])
        return [ref, value]
    }


    // ! For second modal using first modal
    // !------------------------>
    //! ---------------->
    function toggleMore(item?: IProduct) {
        if (isMoreEnabled) {
            setisMoreOpen(item === undefined ? false : true)
            setIsMoreItem(item)
        }
    }
    // function toggleModal() {
    //   setIsOpen(!isOpen);
    // }
    // !---Condition if a single product is checked the filter bar will appear->and this function will pass as a function in Product Card component==>
    function CheckboxClicked(item: IProduct) {
        hapticFeedback()
        const tempSelectedProductGlobal = selectedProduct
        if (
            tempSelectedProductGlobal.find((findItem) => findItem?.id === item?.id)
        ) {
            const tempSelectedProduct = tempSelectedProductGlobal.filter(
                (filterItem) => filterItem?.id !== item?.id
            )
            setselectedProduct(tempSelectedProduct)
        } else {
            const tempVal = [...tempSelectedProductGlobal, item]
            setselectedProduct(tempVal)
        }
    }

    function hasFilters() {
        return (
            filters?.categories?.length > 0 ||
            filters?.brands?.length > 0 ||
            filters?.sorting !== undefined
        )
    }
    // ! ------===------->

    useEffect(() => {
        fetchProducts({
            token: token,
            organizationId: user?.organizationId,
            limit: 5000,
            offset: 0,
            search: searchValue.trim(),
            ordering: filters?.sorting,
            categoryIds: filters?.categories?.length
                ? `${filters?.categories
                    ?.map(item => item.id)
                    .join(',')}`
                : undefined,
            brandIds: filters?.brands?.length
                ? `${filters?.brands?.map((item) => item.id).join(',')}`
                : undefined,
        })
            .then((result: IProductList) => {
                dispatch(setProducts(result.data?.data ?? []))
            })
            .catch((error) => {
                console.log('error', error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [filters?.categories, filters?.brands, filters?.sorting, isMoreOpen, searchValue, isSearchMoreOpen, reRenderCounter, token, user?.organizationId, dispatch])

    useEffect(() => {
        return () => {
            dispatch(clearAll())
        }
    }, [dispatch])


    function renderProducts() {
        if (products?.length !== 0) {
            return products?.map((mapItem) => (
                <ProductCard
                    key={mapItem.id}
                    item={mapItem}
                    onClicked={CheckboxClicked}
                    onMore={toggleMore}
                    isChecked={
                        !(
                            selectedProduct?.find(
                                (findItem) => findItem?.id === mapItem?.id
                            ) === undefined
                        )
                    }
                    longPresEnabled={longPresEnabled}
                    setLongPressEnabled={setLongPressEnabled}
                    isScrolling={isScrolling}
                />
            ))
        }
        if (loading) {
            return (
                <div className="mt-12 grid p-12 text-center dark:text-slate-100">
                    <Spinner />
                </div>
            )
        }
        return (
            <div>
                <img className="m-auto mt-12 h-64 p-12" src={ChatImg} />
                <div className="m-auto w-2/3 px-6 text-center dark:text-slate-200">
                    {' '}
                    {searchValue?.trim() === '' ? `You do not have any products added. Please add a product to begin
            listing it to your shops.` : `Sorry no results found for the search criteria.`}{' '}
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="bg-slate-100 dark:bg-slate-900">
                <div className="w-full bg-white pb-3 drop-shadow-md z-10 dark:bg-slate-800">
                    <Header
                        isSticky={false}
                        backDisabled={true}
                        heading={intl.formatMessage({ id: 'global.my_products' })}
                        subHeading={`${products?.length ?? 0} ${intl.formatMessage({
                            id: 'global.items',
                        })}`}
                    />
                    <div>
                        <AppliedFilters
                            setSearchValue={setSearchValue}
                            searchValue={searchValue}
                            selectedProduct={selectedProduct}
                            setselectedProduct={setselectedProduct}
                            setCounter={setCounter}
                            onMoreClick={() => setisSearchMoreOpen(true)}
                            onFilterClick={() => setfilterPopupOpen(true)}
                        />
                    </div>
                </div>
            </div>

            <div
                ref={scrollTargetRef}
                className="custom-height bg-white pb-[13vh] dark:bg-slate-900"
                style={{
                    height: hasFilters()
                        ? 'calc( 100vh - 274px )'
                        : 'calc( 100vh - 200px )',
                }}
            >
                {renderProducts()}
            </div>

            {/* Filter Popup */}
            <ModalViewer
                body={<FilterPopup />}
                isOpen={!!filterPopupOpen}
                onClose={() => setfilterPopupOpen(false)}
                name={'filter'}
            />
            <ModalViewer
                body={
                    <SearchMorePopup
                        selectedProduct={selectedProduct}
                        onClose={() => {
                            setselectedProduct([])
                            setisSearchMoreOpen(false)
                        }}
                    />
                }
                isOpen={!!isSearchMoreOpen}
                onClose={() => {
                    setisSearchMoreOpen(false)
                }}
            />
            <ModalViewer
                body={
                    <MorePopup
                        item={isMoreItem}
                        onClose={() => {
                            setIsMoreItem(undefined)
                            setisMoreOpen(false)
                        }}
                    />
                }
                isOpen={!!isMoreOpen}
                onClose={() => {
                    setIsMoreItem(undefined)
                    setisMoreOpen(false)
                }}
            />
            <Link
                to="/add-product"
                className="text-md add-cutomer-btn active:scale-95 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 text-white"
            >
                <FormattedMessage id="action.addProduct" defaultMessage="Add Product" />
            </Link>
            <Footer />
        </>
    )
}