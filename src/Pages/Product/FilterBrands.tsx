import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBrands } from 'src/API/brand.axios'
import { selectCredentials } from '../Login/credentialsSlice'
import { brandsCheckbox, selectProductFilters } from './productFiltersSlice'

interface CategoryName {
  name: string;
  item: any;
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
        <div className="ml-4 flex items-center gap-2">
            <input type="checkbox" checked={isChecked} onChange={tickCheckBox} />
            <label
                htmlFor=""
                className="text-sm font-semibold text-gray-500 dark:text-gray-400"
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
    const [items, setItems] = useState<any[]>([])
    const { token } = useSelector(selectCredentials)

    useEffect(() => {
        fetchBrands(token!, 10, 0).then((result: any) => {
            setItems(result?.data?.data)
        })
    }, [token])

    function renderItems() {
        if (items?.length < 1) {
            return (
                <div className="text-xs text-gray-700 dark:text-gray-100">
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
            <h1 className="mb-1 text-base font-semibold text-gray-500 dark:text-gray-300">
                {props.heading}
            </h1>
            <div className="mt-2 flex max-h-[25vh] flex-col gap-1  overflow-y-scroll">
                {renderItems()}
            </div>
        </div>
    )
}