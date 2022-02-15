import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrganizationProductCategories } from 'src/API/products.axios'
import type { IOrganizationProductCategory, IOrganizationProductCategories } from 'src/types/organizationProductCategories'
import { selectCredentials } from '../Login/credentialsSlice'
import {
    categoriesCheckbox,
    selectProductFilters,
} from './productFiltersSlice'

interface CategoryName {
  name: string;
  item: IOrganizationProductCategory;
}
const Category = (props: CategoryName) => {
    const dispatch = useDispatch()
    const filters = useSelector(selectProductFilters)

    const isChecked = !!filters?.categories?.find(
        (findItem) => findItem.id === props?.item?.id
    )

    function tickCheckBox() {
        dispatch(categoriesCheckbox(props.item))
    }

    return (
        <div className="ml-4 flex items-center gap-2 pb-1">
            <input type="checkbox" id={`categoryCheckBox${props.name}`} checked={isChecked} onChange={tickCheckBox} />
            <label
                htmlFor={`categoryCheckBox${props.name}`}
                className="text-sm font-semibold text-gray-500 dark:text-gray-400"
            >
                {props.name}
            </label>
        </div>
    )
}

interface FilterCategories {
  heading: string;
  type: 'brand' | 'category';
}
export default function FilterCategory(props: FilterCategories) {
    const [items, setItems] = useState<IOrganizationProductCategory[] | undefined>([])
    const { user, token } = useSelector(selectCredentials)

    useEffect(() => {
        fetchOrganizationProductCategories(
            { token, limit: 20, offset: 0, search: undefined, orgId: user?.organizationId }        ).then((result: IOrganizationProductCategories) => {
            setItems(result?.data?.data?.filter((item: IOrganizationProductCategory) => item?.name))
        })
    }, [token, user?.organizationId])

    function renderItems() {
        if (items?.length === 0) {
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
            <div className="mt-2  flex max-h-[25vh] flex-col gap-1 overflow-y-scroll">
                {renderItems()}
            </div>
        </div>
    )
}