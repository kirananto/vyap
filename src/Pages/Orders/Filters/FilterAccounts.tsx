import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInboxes } from 'src/API/inbox.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import {
    selectOrderFilters,
    setAccount,
    setOrderStatus,
} from './orderFiltersSlice'

interface CategoryName {
  item: any;
  type: 'orderStatus' | 'account';
}
const Account = ({ item, type }: CategoryName) => {
    const dispatch = useDispatch()
    const filters = useSelector(selectOrderFilters)

    const isChecked =
    type === 'orderStatus'
        ? filters?.orderStatus === item.id
        : filters?.account?.id === item?.recipient?.id

    function tickCheckBox() {
        if (type === 'orderStatus') {
            dispatch(setOrderStatus(item?.id))
        } else {
            dispatch(
                setAccount({ id: item?.recipient?.id, name: item?.recipient?.name })
            )
        }
    }

    return (
        <div className="ml-4 flex items-center gap-2">
            <input
                type={type === 'orderStatus' ? 'radio' : 'checkbox'}
                checked={isChecked}
                onChange={tickCheckBox}
            />
            <label
                htmlFor=""
                className="text-sm font-semibold text-gray-500 dark:text-gray-400"
            >
                {type === 'orderStatus' ? item?.name : item?.recipient?.name}
            </label>
        </div>
    )
}

interface FilterCategories {
  heading: string;
  type: 'orderStatus' | 'account';
}
export default function FilterCategory(props: FilterCategories) {
    const [items, setItems] = useState<any[]>([])
    const { token } = useSelector(selectCredentials)

    useEffect(() => {
        if (props.type === 'orderStatus') {
            setItems([
                {
                    id: 'PENDING',
                    name: 'Pending',
                },
                {
                    id: 'PROCESSING',
                    name: 'Processing',
                },
                {
                    id: 'COMPLETE',
                    name: 'Complete',
                },
            ])
        } else {
            fetchInboxes({ token: token, limit: 100, offset: 0 }).then(
                (result: any) => {
                    setItems(result?.data?.data?.filter((item: any) => item?.recipient))
                }
            )
        }
    }, [props.type, token])

    return (
        <div>
            <h1 className="mb-1 text-base font-semibold text-gray-500 dark:text-gray-300">
                {props.heading}
            </h1>
            <div
                className={`mt-2 flex flex-col gap-1 ${
                    props.type === 'account' && 'max-h-[30vh]  overflow-y-scroll'
                }`}
            >
                {items?.map((item) => (
                    <Account key={item.id} item={item} type={props.type} />
                ))}
            </div>
        </div>
    )
}