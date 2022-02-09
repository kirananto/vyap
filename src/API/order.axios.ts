import type { OrderStatusType } from 'src/Pages/Orders/enum'
import { axiosClient } from './apiClient'

export const fetchOrderAPI = (token?: string, id: string) => axiosClient({
    url: `/order/${id}`,
    method: 'GET',
    headers: {
        'authorization': `Bearer ${token}`
    }
})
export const fetchOrdersAPI = ({ token, orderStatus, offset, limit, ordering, relatedId }: { token?: string, orderStatus: OrderStatusType | undefined, offset: number, limit: number, ordering?: string, relatedId?: string }) => axiosClient({
    url: `/order`,
    method: 'GET',
    params: {
        orderStatus,
        offset,
        limit,
        ordering,
        relatedId
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const placeOrderAPI = (token?: string, data: {
    description: string
    supplierId: string
    buyerId: string
    flatDiscount: number
    orderItems: {
        quantity: string
        purchasePrice: number
        productId: string
    }[]
}) => axiosClient({
    url: `/order`,
    method: 'POST',
    data,
    headers: {
        'authorization': `Bearer ${token}`
    }
})


export function fetchOrderItems(token?: string, orderId: string, limit: number, offset: number) {
    return axiosClient({
        url: `/order-item`,
        method: 'GET',
        params: {
            orderId,
            limit,
            offset
        },
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
}

export const updateOrderStatus = ({ token, id, data }: { token: string; id?: string, data: any }) => axiosClient({
    url: `/order-status/${id}`,
    method: 'PATCH',
    data,
    headers: {
        'authorization': `Bearer ${token}`
    }
})