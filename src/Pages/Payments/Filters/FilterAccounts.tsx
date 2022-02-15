import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInboxes } from 'src/API/inbox.axios'
import { Organization, selectCredentials } from 'src/Pages/Login/credentialsSlice'
import {
    selectPaymentFilters,
    setAccount,
    setPaymentMethod,
} from './paymentFiltersSlice'

interface PaymentFitlerAccountInterface {
  item: Organization | { id: string, name: string};
  type: 'paymentType' | 'account';
}
const Account = ({ item, type }: PaymentFitlerAccountInterface) => {
    const dispatch = useDispatch()
    const filters = useSelector(selectPaymentFilters)

    const isChecked =
    type === 'paymentType'
        ? filters?.paymentMethod === item.name
        : filters?.account?.id === item?.id

    function tickCheckBox() {
        if (type === 'paymentType') {
            dispatch(setPaymentMethod(item?.name))
        } else {
            dispatch(
                setAccount({ id: item?.id, name: item?.name })
            )
        }
    }

    return (
        <div className="ml-4 flex items-center gap-2 pb-1">
            <input type="radio" id={`accountCheckBox${item.name}`} checked={isChecked} onChange={tickCheckBox} />
            <label
                htmlFor={`accountCheckBox${item.name}`}
                className="text-sm font-semibold text-gray-500 dark:text-gray-400"
            >
                {type === 'paymentType' ? item?.name : item?.name}
            </label>
        </div>
    )
}

interface FilterCategories {
  heading: string;
  type: 'paymentType' | 'account';
}
export default function FilterCategory(props: FilterCategories) {
    const [items, setItems] = useState<Organization[] | { id: string, name: string }[]>([])
    const { token } = useSelector(selectCredentials)

    useEffect(() => {
        if (props.type === 'paymentType') {
            setItems([
                {
                    id: 'cash',
                    name: 'CASH',
                },
                {
                    id: 'cheque',
                    name: 'CHEQUE',
                },
            ])
        } else {
            fetchInboxes({ token: token, limit: 100, offset: 0 }).then(
                (result) => {
                    setItems(result?.data?.data?.filter((item: { recipient: Organization }) => item?.recipient)?.map((item:  { recipient: Organization }) => item.recipient))
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