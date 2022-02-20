import React from 'react'
import OrderStatusIcon from '../Customers/ChatView/InfoPages/Order/OrderStatusIcon'
import { OrderStatusEnum } from './enum'

export default function ReturnStatusTile({status}: { status :OrderStatusEnum}) {
    let color = 'green'
    if (status === OrderStatusEnum.PENDING) {
        color = 'blue'
    }
    if (status === OrderStatusEnum.PROCESSING) {
        color = 'yellow'
    }
    return (<span className={`bg-${color}-200 font-bold text-xs text-${color}-800 px-2 py-1 rounded flex dark:bg-${color}-900 dark:text-${color}-100 dark:bg-opacity-80 dark:border ${color === 'yellow' ? 'dark:border-yellow-800' : `dark:border-${color}-400`}`}>
        <OrderStatusIcon status={status} /> 
        <span className="pt-[2px] px-1">{OrderStatusEnum[status]}</span>
    </span>)
}