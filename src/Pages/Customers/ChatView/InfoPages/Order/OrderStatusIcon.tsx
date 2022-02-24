import React from 'react'
import Completed from 'src/Components/Style/Icons/Completed'
import Pending from 'src/Components/Style/Icons/Pending'
import Processing from 'src/Components/Style/Icons/Processing'
import { OrderStatusEnum } from 'src/Pages/Orders/enum'

export default function OrderStatusIcon({ status }: { status: OrderStatusEnum }) {
    switch (status) {
        case OrderStatusEnum.COMPLETE: return (<span className='text-green-500 dark:text-green-400'><Completed /></span>)
        case OrderStatusEnum.PROCESSING: return (<span className='text-yellow-600 dark:text-yellow-800'><Processing /></span>)
        case OrderStatusEnum.PENDING: return (<span className='text-blue-500 dark:text-blue-400'><Pending /></span>)
        default: return (<div></div>)
    }
}