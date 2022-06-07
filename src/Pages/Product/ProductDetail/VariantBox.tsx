import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchProducts } from 'src/API/products.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import type { IProduct } from 'src/types/product'
import type { variantInterface } from '../AddProduct/redux/addProductSlice'

export default function VariantBox({ item, product }: { item: variantInterface, product: IProduct }) {
    const { token } = useSelector(selectCredentials)
    const [prod, setProd] = useState<IProduct | undefined>(undefined)

    useEffect(() => {
        fetchProducts({ token: token!, variantId: item.id, organizationId: product.organizationId, limit: 12, offset: 0 }).then(result => {
            setProd(result.data?.data?.[0])
        })
    }, [item.id])

    if(!prod?.id) {
        return <></>
    }

    return (<div className="border border-slate-300 dark:border-slate-700 rounded m-2 p-2 px-4">
        <div className="text-lg text-slate-600 dark:text-slate-200 font-semibold">
            {item.name}
        </div>
        <div>
            {prod?.mrpPrice ? `${parseFloat(`${prod?.mrpPrice}`)?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}` : '--'}
        </div>
    </div>)
}