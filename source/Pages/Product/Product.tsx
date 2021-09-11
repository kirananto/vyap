import React, { useState, useEffect } from "react";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import "./Product.css";
import FilterTag from "./FilterTag";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import { FilterPopup, EmptyPopup, MorePopup, SearchMorePopup } from "./Popups";

// ! Modal Logic
function Modal({
  isOpen,
  FirstComponentAttributes,
  SecondComponentAttributes,
  FirstComponent,
  SecondComponent,
} : {
  isOpen: any
  FirstComponentAttributes?: any
  SecondComponentAttributes?: any
  FirstComponent: any
  SecondComponent: any
}) {
  if (!isOpen) return <FirstComponent {...FirstComponentAttributes} />;
  return <SecondComponent {...SecondComponentAttributes} />;
}

// ! Main Component
export default function Product() {
  // ! Tracking the state of modal(input[checkbox] is Clicked or not)
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
        <ProductCard onClicked={CheckboxClicked} onMore={toggleMore} />
        <ProductCard onClicked={CheckboxClicked} onMore={toggleMore} />
        <ProductCard onClicked={CheckboxClicked} onMore={toggleMore} />
        <ProductCard onClicked={CheckboxClicked} onMore={toggleMore} />
        <ProductCard onClicked={CheckboxClicked} onMore={toggleMore} />
        <ProductCard onClicked={CheckboxClicked} onMore={toggleMore} />
        <ProductCard onClicked={CheckboxClicked} onMore={toggleMore} />
      </div>

      {/* Filter Popup */}
      <Modal
        isOpen={filterPopupOpen}
        FirstComponent={EmptyPopup}
        SecondComponent={FilterPopup}
      ></Modal>
      {/* More Product Popup */}
      <Modal
        isOpen={isMoreOpen}
        FirstComponent={EmptyPopup}
        SecondComponent={MorePopup}
      ></Modal>
      {/* More Search Bar Popup */}
      <Modal
        isOpen={isSearchMoreOpen}
        FirstComponent={EmptyPopup}
        SecondComponent={SearchMorePopup}
      ></Modal>
      <Footer />
    </>
  );
}
