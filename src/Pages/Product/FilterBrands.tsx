import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBrands } from 'src/API/brand.axios'
import { selectCredentials } from '../Login/credentialsSlice'
import type { BrandInterface } from './AddProduct/ProductScreen/OthersTab/BrandModal'
import { brandsCheckbox, selectProductFilters } from './productFiltersSlice'

interface CategoryName {
  name: string;
  item: BrandInterface;
}
const Category = (props: CategoryName) => {
    const dispatch = useDispatch()
    const filters = useSelector(selectProductFilters)

    const isChecked = !!filters?.brands?.find(
        (findItem) => findItem.id === props?.item?.id
    )

    function tickCheckBox() {
        dispatch(brandsCheckbox(props.item))
    }

    return (
        <div className="ml-4 flex items-center gap-2 pb-1">
            <input type="checkbox" id={`brandsCheckbox${props.name}`} checked={isChecked} onChange={tickCheckBox} />
            <label
                htmlFor={`brandsCheckbox${props.name}`}
                className="text-sm font-semibold text-slate-500 dark:text-slate-400"
            >
                {props.name}
            </label>
        </div>
    )
}

interface FilterBrands {
  heading: string;
  type: 'brand' | 'category';
}
export default function FilterBrand(props: FilterBrands) {
    const [items, setItems] = useState<BrandInterface[]>([])
    const { token } = useSelector(selectCredentials)

    useEffect(() => {
        fetchBrands({ token, limit: 10, offset: 0 }).then((result) => {
            setItems(result?.data?.data)
        })
    }, [token])

    function renderItems() {
        if (items?.length < 1) {
            return (
                <div className="text-xs text-slate-700 dark:text-slate-100">
                    {' '}
          No {props.type} present{' '}
                </div>
            )
        }
        return items?.map((item) => (
            <Category key={item.id} item={item} name={item.name} />
        ))
    }

    return (
        <div>
            <h1 className="mb-1 text-base font-semibold text-slate-500 dark:text-slate-300">
                {props.heading}
            </h1>
            <div className="mt-2 flex max-h-[25vh] flex-col gap-1  overflow-y-scroll">
                {renderItems()}
            </div>
        </div>
    )
}