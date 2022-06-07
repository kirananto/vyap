import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchProducts } from 'src/API/products.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import type { variantInterface } from 'src/Pages/Product/AddProduct/redux/addProductSlice'
import type { IProduct } from 'src/types/product'

export default function VariantBoxAddItem({ item, product, handleVariantChange, isSelected }: { item: variantInterface, product: IProduct, handleVariantChange: any , isSelected: boolean}) {
    const { token } = useSelector(selectCredentials)
    const [prod, setProd] = useState<IProduct | undefined>(undefined)

    useEffect(() => {
        fetchProducts({ token: token!, variantId: item.id, organizationId: product.organizationId, limit: 12, offset: 0 }).then(result => {
            setProd(result.data?.data?.[0])
        })
    }, [item.id])

    if(!prod?.id) {
        return <div className="h-2"></div>
    }

    return (<div onClick={() => handleVariantChange(item.id)} className={`border border-slate-300 dark:border-slate-700 rounded-full m-1 p-1 px-4 ${isSelected ? ' border-indigo-400 ' : ''}`}>
    <div className={`text-md ${isSelected ? ' text-indigo-600 dark:text-indigo-200 ' : ' text-slate-600 dark:text-slate-200 '}  font-semibold`}>
        {item.name}
    </div>
    {/* <div>
        {prod?.mrpPrice ? `${parseFloat(`${prod?.mrpPrice}`)?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}` : '--'}
    </div> */}
</div>)
}