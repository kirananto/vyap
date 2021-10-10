import React, { useState, useEffect, useRef } from "react";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import "./assets/Product.css";
import FilterTag from "./FilterTag";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import ProductCheckedOptions from "./ProductCheckedOptions";
import { fetchProducts } from "src/API/products.axios";
import { useSelector } from "react-redux";
import { selectCredentials } from "../Login/credentialsSlice";
import { EmptyPopup } from "./Popups/EmptyPopup";
import { FilterPopup } from "./Popups/FilterPopup";
import { MorePopup } from "./Popups/MorePopup";
import { SearchMorePopup } from "./Popups/SearchMorePopup";
import { Link } from "react-router-dom";
import ChatImg from './assets/no_data.svg'
import ModalViewer from "src/Components/Style/ModalViewer";
import AppliedFilters from "./AppliedFilters";


// ! Main Component
export default function Product() {
  const { token, user } = useSelector(selectCredentials)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<any[]>([])
  // ! Tracking the total number of products is checked..
  // !--------------->
  const [filterPopupOpen, setfilterPopupOpen] = useState(false);
  // !------------------->
  const [isMoreOpen, setisMoreOpen] = useState(false);
  //  !--------Search-bar-more---------->
  const [isSearchMoreOpen, setisSearchMoreOpen] = useState(false);
  const [selectedProduct, setselectedProduct] = useState<any[]>([])

  // ! For second modal using first modal
  // !------------------------>
  //! ---------------->
  function toggleMore() {
    setisMoreOpen(!isMoreOpen);
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
  // ! ------===------->

  useEffect(() => {
    fetchProducts(token!, user?.organizationId!, 20, 0).then((result: any) => {
      setProducts(result.data?.data ?? [])
    }).catch(error => {
      console.log('error', error)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  function renderProducts() {
    if (loading) {
      return <div className="mt-12 p-12 text-center"> Loading...</div>
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
            heading="My Products"
            subHeading={`${products?.length ?? 0} Items`}
          />
          <div>
            <AppliedFilters 
              selectedProduct={selectedProduct} 
              onMoreClick={() => setisSearchMoreOpen(true)} 
              onFilterClick={() => setfilterPopupOpen(true)} 
            />
          </div>
        </div>
      </div>

      <div className="custom-height bg-gray-100 dark:bg-gray-900">
        {renderProducts()}
      </div>

      {/* Filter Popup */}
      <ModalViewer
        body={<FilterPopup />}
        isOpen={filterPopupOpen}
        onClose={() => setfilterPopupOpen(false)}
      />
      <ModalViewer 
        body={<SearchMorePopup />}
        isOpen={isSearchMoreOpen}
        onClose={() => setisSearchMoreOpen(false)}
      />
      <ModalViewer 
        body={<MorePopup />}
        isOpen={isMoreOpen}
        onClose={() => setisMoreOpen(false)}
      />
      <Link to="/add-product" className="text-white text-md rounded-full h-12 add-cutomer-btn bg-gradient-to-br from-blue-500 to-indigo-700">
        Add Product
      </Link>
      <Footer />
    </>
  );
}
