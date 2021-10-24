import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

interface FilterCategories {
  heading: String;
  type: 'brand' | 'category'
}
export default function FilterCategory(props: FilterCategories) {
  const [items, setItems] = useState<any[]>([])
  const { token } = useSelector(selectCredentials)

  useEffect(() => {
    fetchCentralProductCategories(token!, 10, 0).then((result: any) => {
      setItems(result?.data?.data?.filter((item: any) => item?.name))
    })
  }, [])

  return (
    <div>
      <h1 className="mb-1 text-base font-semibold text-gray-500 dark:text-gray-300">
        {props.heading}
      </h1>
      <div className="flex flex-col gap-1 mt-2">
        {items?.map(item => <Category key={item.id} CategoryName={item.name} />)}
      </div>
    </div>
  );
}
