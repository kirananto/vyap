import React from 'react'
import Completed from 'src/Components/Style/Icons/Completed'
import Pending from 'src/Components/Style/Icons/Pending'
import Processing from 'src/Components/Style/Icons/Processing'
import { OrderStatusEnum } from 'src/Pages/Orders/enum'

function OrderInfoIcon(props: { heading: string; status: { status: OrderStatusEnum, note?: string, id: string, createdAt?: string }[] }) {

    function renderIcon(statusItem: OrderStatusEnum) {
        switch (statusItem) {
            case OrderStatusEnum.COMPLETE: return (<span className='text-green-400'><Completed /></span>)
            case OrderStatusEnum.PROCESSING: return (<span className='text-orange-400'><Processing /></span>)
            case OrderStatusEnum.PENDING: return (<span className='text-red-400'><Pending /></span>)
            default: return (<div></div>)
        }
    }
    return (
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{props.heading}</p>
            {([...(props?.status ?? [])])?.reverse()?.map(mapItem => (
                <div key={mapItem.id} className="flex items-center gap-1 mt-2">
                    {renderIcon(mapItem.status)}
                    <p className="text-sm ml-1 font-normal text-gray-700 dark:text-gray-100">
                        {mapItem.note}
                        <div className="text-xs text-gray-500 dark:text-gray-500">{mapItem.createdAt?.split('T')?.[0]}</div>
                    </p>
                </div>
            ))}
        </div>
    )
}

export { OrderInfoIcon }