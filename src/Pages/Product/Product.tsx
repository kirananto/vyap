import React, { useState, useEffect } from "react";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import "./assets/Product.css";
import FilterTag from "./FilterTag";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import { fetchProducts } from "src/API/products.axios";
import { useSelector } from "react-redux";
import { selectCredentials } from "../Login/credentialsSlice";
import { EmptyPopup } from "./Popups/EmptyPopup";
import { FilterPopup } from "./Popups/FilterPopup";
import { MorePopup } from "./Popups/MorePopup";
import { SearchMorePopup } from "./Popups/SearchMorePopup";
import { Link } from "react-router-dom";
import ChatImg from './assets/no_data.svg'

// ! Modal Logic
function Modal({
  isOpen,
  FirstComponentAttributes,
  SecondComponentAttributes,
  FirstComponent,
  SecondComponent,
}: {
  isOpen: any;
  FirstComponentAttributes?: any;
  SecondComponentAttributes?: any;
  FirstComponent: any;
  SecondComponent: any;
}) {
  if (!isOpen) return <FirstComponent {...FirstComponentAttributes} />;
  return <SecondComponent {...SecondComponentAttributes} />;
}

// ! Main Component
export default function Product() {
  const { token, user } = useSelector(selectCredentials)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false);
  // ! Tracking the total number of products is checked..
  const [checkedProductsCounts, setProductsCounts] = useState(0);
  // !--------------->
  const [filterPopupOpen, setfilterPopupOpen] = useState(false);
  // !------------------->
  const [isMoreOpen, setisMoreOpen] = useState(false);
  //  !--------Search-bar-more---------->
  const [isSearchMoreOpen, setisSearchMoreOpen] = useState(false);

  // ! For second modal using first modal
  function FilterClick() {
    setfilterPopupOpen(!filterPopupOpen);
  }
  // !------------------------>
  function MoreBTNClick() {
    setisSearchMoreOpen(!isSearchMoreOpen);
  }
  //! ---------------->
  function toggleMore() {
    setisMoreOpen(!isMoreOpen);
  }
  // function toggleModal() {
  //   setIsOpen(!isOpen);
  // }
  // !---Condition if a single product is checked the filter bar will appear->and this function will pass as a function in Product Card component==>
  function CheckboxClicked(e: any) {
    if (e.target.checked) {
      setProductsCounts(checkedProductsCounts + 1);
    } else {
      setProductsCounts(checkedProductsCounts - 1);
    }
  }
  useEffect(() => {
    if (checkedProductsCounts > 0) setIsOpen(true);
    else setIsOpen(false);
  }, [checkedProductsCounts]);
  // ! ------===------->

  useEffect(() => {
    fetchProducts(token!, user?.organizationId!, 20, 0).then(result => {
      setProducts(result.data?.data ?? [])
    }).catch(error => {
      console.log('error', error)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  function renderProducts() {
    if(loading) {
      return <div className="mt-12 p-12 text-center"> Loading...</div>
    }
    if (products?.length === 0) {
      return <div>
        <img className="mt-12 h-64 p-12 m-auto" src={ChatImg} />
        <div className="text-center px-6 w-2/3 m-auto"> You do not have any products added. Please add a product to begin listing it to your shops. </div>
      </div>
    }
    return products?.map(mapItem => <ProductCard item={mapItem} onClicked={CheckboxClicked} onMore={toggleMore} />)
  }
  return (
    <>
      {/* Header Container */}
      <div className="pb-4 bg-white border-b-2 ">
        <div className="border-b">
          <Header
            heading="My Products"
            subHeading="500 Items"
          // icon="../assets/icons/call.svg"
          />
        </div>
        {/* 
        =======================
        Header Search & Filter 
        =======================
      */}
        <Modal
          isOpen={isOpen}
          FirstComponent={SearchBar}
          SecondComponent={FilterBar}
          FirstComponentAttributes={{ onFilterClick: FilterClick }}
          SecondComponentAttributes={{ onMoreClick: MoreBTNClick }}
        ></Modal>
        {/* <button onClick={toggleModal}>Check</button> */}
        {/* 
        =======================
        Filter Tag Section  
        =======================
      */}
        <div className="flex items-center w-11/12 gap-4 mx-auto mt-4 ">
          <h1 className="text-base font-bold text-gray-500">Applied Filters</h1>
          <p className="text-sm font-semibold text-blue-500">Clear All</p>
        </div>
        {/* ------ */}
        <div className="flex items-center w-11/12 mx-auto mt-2 ">
          <div className="flex w-8/12 gap-1 ">
            <FilterTag tagName="Category 1" />
            <FilterTag tagName="Category 1" />
          </div>
          <div className="flex justify-end w-2/4 ">
            <p className="text-sm font-semibold text-blue-500">
              Select Products
            </p>
          </div>
        </div>
      </div>
      {/*
      ==========
      Card
      ==========
      */}
      <div className="custom-height">
        {renderProducts()}
      </div>

      {/* Filter Popup */}
      <Modal
        isOpen={filterPopupOpen}
        FirstComponent={EmptyPopup}
        SecondComponent={FilterPopup}
        SecondComponentAttributes={{
          isVisible: filterPopupOpen,
          toggleVisibility: () => setfilterPopupOpen(false)
        }}
      ></Modal>
      {/* More Product Popup */}
      <Modal
        isOpen={isMoreOpen}
        FirstComponent={EmptyPopup}
        SecondComponent={MorePopup}
        SecondComponentAttributes={{
          isVisible: isMoreOpen,
          toggleVisibility: () => setisMoreOpen(false)
        }}
      ></Modal>
      {/* More Search Bar Popup */}
      <Modal
        isOpen={isSearchMoreOpen}
        FirstComponent={EmptyPopup}
        SecondComponent={SearchMorePopup}
        SecondComponentAttributes={{
          isVisible: isSearchMoreOpen,
          toggleVisibility: () => setisSearchMoreOpen(false)
        }}
      ></Modal>
      <Link to="/add-product" className="text-white text-md rounded-full h-12 add-cutomer-btn bg-gradient-to-br from-blue-500 to-indigo-700">
        Add Product
      </Link>
      <Footer />
    </>
  );
}
