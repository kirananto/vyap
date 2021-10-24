import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchBrands } from "src/API/brand.axios";
import { fetchCentralProductCategories } from "src/API/products.axios";
import { selectCredentials } from "../Login/credentialsSlice";

interface CategoryName {
  CategoryName: String;
}
const Category = (props: CategoryName) => {
  return (
    <div className="flex items-center gap-2 ml-4">
      <input type="checkbox" />
      <label htmlFor="" className="text-sm font-semibold text-gray-500 dark:text-gray-400">
        {props.CategoryName}
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

  return (
    <div>
      <h1 className="mb-1 text-base font-semibold text-gray-500 dark:text-gray-300">
        {props.heading}
      </h1>
      <div className="flex flex-col gap-1 mt-2">
        {items?.map(item => <Category key={item.id} CategoryName={item.name ?? 'Blank category'} />)}
      </div>
    </div>
  );
}
