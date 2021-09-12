import React from "react";


interface CategoryName{
    CategoryName: String
}
const Category = (props:CategoryName) => {
  return (
    <div className="flex items-center gap-2 ml-4">
      <input type="checkbox" />
      <label htmlFor="" className="text-sm font-semibold text-gray-500">{props.CategoryName}</label>
    </div>
  );
};


interface FilterCategories{
    heading: String
}
export default function FilterCategories(props:FilterCategories) {
  return (
    <div>
      <h1 className="mb-1 text-base font-semibold text-gray-500">{props.heading}</h1>
      <Category CategoryName="Category 1"/>
      <Category CategoryName="Category 1"/>
      <Category CategoryName="Category 1"/>
      <Category CategoryName="Category 1"/>
    </div>
  );
}
