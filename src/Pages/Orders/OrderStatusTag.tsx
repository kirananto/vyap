import React from 'react'
import OrderStatusIcon from '../Customers/ChatView/InfoPages/Order/OrderStatusIcon'
import { OrderStatusEnum } from './enum'

export default function ReturnStatusTile({ status }: { status: OrderStatusEnum }) {
    let color = 'green'
    if (status === OrderStatusEnum.PENDING) {
        color = 'blue'
    }
    if (status === OrderStatusEnum.PROCESSING) {
        color = 'yellow'
    }
    function getClasses() {
        switch (color) {
            case 'green':
                return `text-green-800 bg-green-200  dark:bg-green-900 dark:text-green-100 border-green-400`
            case 'blue':
                return `text-blue-800 bg-blue-200  dark:bg-blue-900 dark:text-blue-100 border-blue-400`
            case 'yellow':
                return `text-yellow-700 bg-yellow-200  dark:bg-yellow-900 dark:text-yellow-100 border-yellow-500 dark:border-yellow-800`
        }
    }
    return (<span className={`dark:bg-opacity-80 border font-bold text-xs px-2 py-1 rounded flex  ${getClasses()}`}>
        <OrderStatusIcon status={status} />
        <span className="pt-[2px] px-1">{OrderStatusEnum[status]}</span>
    </span>)
}