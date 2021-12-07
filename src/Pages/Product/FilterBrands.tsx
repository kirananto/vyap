import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands } from "src/API/brand.axios";
import { fetchCentralProductCategories } from "src/API/products.axios";
import { selectCredentials } from "../Login/credentialsSlice";
import { brandsCheckbox, selectProductFilters } from "./productFiltersSlice";

interface CategoryName {
  name: String;
  item: any  
}
const Category = (props: CategoryName) => {

  const dispatch = useDispatch()
  const filters = useSelector(selectProductFilters)

  const isChecked = !!filters?.brands?.find(findItem => findItem.id === props?.item?.id)

  function tickCheckBox() {
    dispatch(brandsCheckbox(props.item))
  }

  return (
    <div className="flex items-center gap-2 ml-4">
      <input type="checkbox" checked={isChecked} onChange={tickCheckBox} />
      <label htmlFor="" className="text-sm font-semibold text-gray-500 dark:text-gray-400">
        {props.name}
      </label>
    </div>
  );
};

interface FilterBrands {
  heading: String;
  type: 'brand' | 'category'
}
export default function FilterBrand(props: FilterBrands) {
  const [items, setItems] = useState<any[]>([])
  const { token } = useSelector(selectCredentials)

  useEffect(() => {
    fetchBrands(token!, 10, 0).then((result: any) => {
      setItems(result?.data?.data)
    })
  }, [])

  
  function renderItems () {
    if(items?.length < 1) {
      return <div className="text-gray-700 dark:text-gray-100 text-xs"> No {props.type} present </div>
    }
    return items?.map(item => <Category key={item.id} item={item} name={item.name} />)
  }

  return (
    <div>
      <h1 className="mb-1 text-base font-semibold text-gray-500 dark:text-gray-300">
        {props.heading}
      </h1>
      <div className="flex flex-col gap-1 mt-2">
        {renderItems()}
      </div>
    </div>
  );
}
