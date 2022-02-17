import React from 'react'
import type { OrderStatusEnum } from 'src/Pages/Orders/enum'
import OrderStatusIcon from './OrderStatusIcon'

function OrderInfoIcon(props: { heading: string; status: { status: OrderStatusEnum, note?: string, id: string, createdAt?: string }[] }) {

    return (
        <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{props.heading}</p>
            {([...(props?.status ?? [])])?.reverse()?.map(mapItem => (
                <div key={mapItem.id} className="flex items-center gap-1 mt-2">
                    <OrderStatusIcon status={mapItem.status} />
                    <p className="text-sm ml-1 font-normal text-slate-700 dark:text-slate-100">
                        {mapItem.note}
                        <div className="text-xs text-slate-500 dark:text-slate-500">{mapItem.createdAt?.split('T')?.[0]}</div>
                    </p>
                </div>
            ))}
        </div>
    )
}

export { OrderInfoIcon }