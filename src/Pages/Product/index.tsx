import React, { useState, useEffect } from 'react'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
import './assets/Product.css'
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
import { FormattedMessage, useIntl } from 'react-intl'
import Spinner from 'src/Components/Style/Spinner'
import useQueryParam from 'src/useQueryParams'
import type { IProduct } from 'src/types/product'
import type { IProductList } from 'src/types/fetchProducts'

// ! Main Component
export default function Product() {
    const { token, user } = useSelector(selectCredentials)
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<IProduct[]>([])
    const filters = useSelector(selectProductFilters)
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
        if(selectedProduct.length === 0)
            setLongPressEnabled(true)
    }, [selectedProduct])

    useEffect(() => {
        if(longPresEnabled)
            setisMoreEnabled(true)
        else
            setisMoreEnabled(false)
    }, [longPresEnabled])
    

    // ! For second modal using first modal
    // !------------------------>
    //! ---------------->
    function toggleMore(item?: IProduct) {
        if(isMoreEnabled){
            setisMoreOpen(item === undefined ? false : true)
            setIsMoreItem(item)
        }
    }
    // function toggleModal() {
    //   setIsOpen(!isOpen);
    // }
    // !---Condition if a single product is checked the filter bar will appear->and this function will pass as a function in Product Card component==>
    function CheckboxClicked(item: IProduct) {
        const tempSelectedProductGlobal = selectedProduct
        if (
            tempSelectedProductGlobal.find((findItem) => findItem?.id === item?.id)
        ) {
            const tempSelectedProduct = tempSelectedProductGlobal.filter(
                (filterItem) => filterItem?.id !== item?.id
            )
            setselectedProduct(tempSelectedProduct)
        }
        else {
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
            token: token!,
            organizationId: user?.organizationId!,
            limit: 5000,
            offset: 0,
            search: searchValue,
            ordering: filters?.sorting,
            categoryIds: filters?.categories?.length
                ? `${filters?.categories
                    ?.map((item: { id: string }) => item.id)
                    .join(',')}`
                : undefined,
            brandIds: filters?.brands?.length
                ? `${filters?.brands?.map((item: { id: string }) => item.id).join(',')}`
                : undefined,
        })
            .then((result: IProductList) => {
                setProducts(result.data?.data ?? [])
            })
            .catch((error) => {
                console.log('error', error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [
        filters?.categories,
        filters?.brands,
        filters?.sorting,
        isMoreOpen,
        searchValue,
        isSearchMoreOpen,
        reRenderCounter,
    ])

    useEffect(() => {
        return () => {
            dispatch(clearAll())
        }
    }, [])


    function renderProducts() {
        if (loading) {
            return (
                <div className="mt-12 grid p-12 text-center dark:text-gray-100">
                    <Spinner />
                    <div className="mt-4">Loading...</div>
                </div>
            )
        }
        if (products?.length === 0) {
            return (
                <div>
                    <img className="m-auto mt-12 h-64 p-12" src={ChatImg} />
                    <div className="m-auto w-2/3 px-6 text-center dark:text-gray-200">
                        {' '}
            You do not have any products added. Please add a product to begin
            listing it to your shops.{' '}
                    </div>
                </div>
            )
        }
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
            />
        ))
    }
    return (
        <>
            <div className="bg-gray-100 dark:bg-gray-900">
                <div className="w-full bg-white pb-3 shadow dark:bg-gray-800">
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
                className="custom-height bg-gray-100 pb-[13vh] dark:bg-gray-900"
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
                isOpen={filterPopupOpen!}
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
                isOpen={isSearchMoreOpen!}
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
                isOpen={isMoreOpen!}
                onClose={() => {
                    setIsMoreItem(undefined)
                    setisMoreOpen(false)
                }}
            />
            <Link
                to="/add-product"
                className="text-md add-cutomer-btn h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 text-white"
            >
                <FormattedMessage id="action.addProduct" defaultMessage="Add Product" />
            </Link>
            <Footer />
        </>
    )
}