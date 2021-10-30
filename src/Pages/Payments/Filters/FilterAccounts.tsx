import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInboxes } from "src/API/inbox.axios";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";
import { addAccountsCheckbox, selectPaymentFilters, setAccounts, setPaymentMethod } from "./paymentFiltersSlice";

interface CategoryName {
  item: any
  type: 'paymentType' | 'account'
}
const Account = ({ item, type }: CategoryName) => {

  const dispatch = useDispatch()
  const filters = useSelector(selectPaymentFilters)

  const isChecked = type === 'paymentType' ? filters?.paymentMethod === item.name : !!filters?.accounts?.find(findItem => findItem.id === item?.id)

  function tickCheckBox() {
    if(type === 'paymentType') {
      dispatch(setPaymentMethod(item?.name))
    } else {
      dispatch(addAccountsCheckbox(item))
    }
  }

  return (
    <div className="flex items-center gap-2 ml-4">
      <input type="checkbox" checked={isChecked} onChange={tickCheckBox} />
      <label htmlFor="" className="text-sm font-semibold text-gray-500 dark:text-gray-400">
        {type === 'paymentType' ? item?.name : item?.recipient?.name}
      </label>
    </div>
  );
};

interface FilterCategories {
  heading: String;
  type: 'paymentType' | 'account'
}
export default function FilterCategory(props: FilterCategories) {
  const [items, setItems] = useState<any[]>([])
  const { token } = useSelector(selectCredentials)

  useEffect(() => {
    if (props.type === 'paymentType') {
      setItems([{
        id: 'cash',
        name: 'CASH'
      }])
    } else {
      fetchInboxes({ token: token!, limit: 100, offset: 0 }).then((result: any) => {
        setItems(result?.data?.data?.filter((item: any) => item?.recipient))
      })
    }
  }, [])

  return (
    <div>
      <h1 className="mb-1 text-base font-semibold text-gray-500 dark:text-gray-300">
        {props.heading}
      </h1>
      <div className="flex flex-col gap-1 mt-2">
        {items?.map(item => <Account key={item.id} item={item} type={props.type} />)}
      </div>
    </div>
  );
}
