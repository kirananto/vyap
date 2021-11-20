import React, { useState, useEffect, useRef } from "react";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import "./assets/Product.css";
import ProductCard from "./ProductCard";
import { fetchProducts } from "src/API/products.axios";
import { useSelector } from "react-redux";
import { selectCredentials } from "../Login/credentialsSlice";
import { FilterPopup } from "./Popups/FilterPopup";
import { MorePopup } from "./Popups/MorePopup";
import { SearchMorePopup } from "./Popups/SearchMorePopup";
import { Link } from "react-router-dom";
import ChatImg from './assets/no_data.svg'
import ModalViewer from "src/Components/Style/ModalViewer";
import AppliedFilters from "./AppliedFilters";
import { selectProductFilters } from "./productFiltersSlice";
import { FormattedMessage, useIntl } from "react-intl";
import Spinner from "src/Components/Style/Spinner";
import { useNavigate } from "react-router";

// ! Main Component
export default function Product() {
  const { token, user } = useSelector(selectCredentials)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<any[]>([])
  const filters = useSelector(selectProductFilters)

  const intl = useIntl()
  const navigate = useNavigate()


  // ! Tracking the total number of products is checked..
  // !--------------->
  const [filterPopupOpen, setfilterPopupOpen] = useState(false);
  // !------------------->
  const [isMoreOpen, setisMoreOpen] = useState<any>(undefined);
  const [searchValue, setSearchValue] = useState<any>(undefined);
  const [reRenderCounter, setCounter] = useState(1)
  //  !--------Search-bar-more---------->
  const [isSearchMoreOpen, setisSearchMoreOpen] = useState(false);
  const [selectedProduct, setselectedProduct] = useState<any[]>([])

  // ! For second modal using first modal
  // !------------------------>
  //! ---------------->
  function toggleMore(item?: any) {
    setisMoreOpen(item);
  }
  // function toggleModal() {
  //   setIsOpen(!isOpen);
  // }
  // !---Condition if a single product is checked the filter bar will appear->and this function will pass as a function in Product Card component==>
  function CheckboxClicked(item: any) {
    const tempSelectedProductGlobal = selectedProduct
    if (tempSelectedProductGlobal.find(findItem => findItem?.id === item?.id)) {
      const tempSelectedProduct = tempSelectedProductGlobal.filter(filterItem => filterItem?.id !== item?.id)
      setselectedProduct(tempSelectedProduct)
    } else {
      const tempVal = [...tempSelectedProductGlobal, item]
      setselectedProduct(tempVal)
    }
  }

  function hasFilters() {
    return filters?.categories?.length > 0 || filters?.brands?.length > 0 || filters?.sorting !== undefined
  }
  // ! ------===------->

  useEffect(() => {
    fetchProducts({
      token: token!,
      organizationId: user?.organizationId!,
      limit: 20,
      offset: 0,
      search: searchValue,
      ordering: filters?.sorting,
      categoryIds: filters?.categories?.length ? `${filters?.categories?.map((item: { id: string }) => item.id).join(',')}` : undefined,
      brandIds: filters?.brands?.length ? `${filters?.brands?.map((item: { id: string }) => item.id).join(',')}` : undefined
    }).then((result: any) => {
      setProducts(result.data?.data ?? [])
    }).catch(error => {
      console.log('error', error)
    }).finally(() => {
      setLoading(false)
    })
  }, [filters?.categories, filters?.brands, filters?.sorting, isMoreOpen, searchValue, isSearchMoreOpen, reRenderCounter])

  function renderProducts() {
    if (loading) {
      return<div className="p-12 mt-12 text-center dark:text-gray-100 grid">
      <Spinner />
      <div className="mt-4">Loading...</div>
    </div>
    }
    if (products?.length === 0) {
      return <div>
        <img className="mt-12 h-64 p-12 m-auto" src={ChatImg} />
        <div className="text-center px-6 w-2/3 m-auto dark:text-gray-200"> You do not have any products added. Please add a product to begin listing it to your shops. </div>
      </div>
    }
    return products?.map(mapItem => <ProductCard
      key={mapItem.id}
      item={mapItem}
      onClicked={CheckboxClicked}
      onMore={toggleMore}
      isChecked={!(selectedProduct?.find(findItem => findItem?.id === mapItem?.id) === undefined)}
    />)
  }
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900">
        <div className="w-full pb-3 bg-white shadow dark:bg-gray-800">
          <Header
            isSticky={false}
            backDisabled={true}
            heading={intl.formatMessage({ id: 'global.my_products' })}
            subHeading={`${products?.length ?? 0} ${intl.formatMessage({ id: 'global.items' })}`}
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

      <div className="custom-height bg-gray-100 dark:bg-gray-900" style={{ height: hasFilters() ? 'calc( 100vh - 274px )' : 'calc( 100vh - 200px )' }}>
        {renderProducts()}
      </div>

      {/* Filter Popup */}
      <ModalViewer
        body={<FilterPopup />}
        isOpen={filterPopupOpen}
        onClose={() => setfilterPopupOpen(false)}
      />
      <ModalViewer
        body={<SearchMorePopup
          selectedProduct={selectedProduct}
          onClose={() => {
            setselectedProduct([])
            setisSearchMoreOpen(false)
          }}
        />}
        isOpen={isSearchMoreOpen}
        onClose={() => {
          setselectedProduct([])
          setisSearchMoreOpen(false)
        }}
      />
      <ModalViewer
        body={<MorePopup
          item={isMoreOpen}
          onClose={() => setisMoreOpen(undefined)}
        />}
        isOpen={isMoreOpen}
        onClose={() => setisMoreOpen(undefined)}
      />
      <Link to="/add-product" className="text-white text-md rounded-full h-12 add-cutomer-btn bg-gradient-to-br from-blue-500 to-indigo-700">
        <FormattedMessage
          id="action.addProduct"
          defaultMessage="Add Product"
        />
      </Link>
      <Footer />
    </>
  );
}
