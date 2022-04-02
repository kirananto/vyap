import type { OrderStatusEnum, OrderStatusType } from 'src/Pages/Orders/enum'
import { axiosClient } from './apiClient'

export const fetchOrderAPI = ({ token, id }: { token?: string; id?: string }) => axiosClient({
    url: `/order/${id}`,
    method: 'GET',
    headers: {
        'authorization': `Bearer ${token}`
    }
})
export const fetchOrdersAPI = ({ token, orderStatus, offset, limit, ordering, relatedId, startDate, endDate }: { token?: string, orderStatus: OrderStatusType | undefined, offset: number, limit: number, ordering?: string, relatedId?: string, startDate?: string, endDate?: string }) => axiosClient({
    url: `/order`,
    method: 'GET',
    params: {
        orderStatus,
        offset,
        limit,
        ordering,
        relatedId,
        startDate,
        endDate
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const placeOrderAPI = ({ token, data }: {
    token?: string; data: {
        description?: string
        supplierId?: string
        buyerId?: string
        flatDiscount: number
        orderItems: {
            quantity: number
            purchasePrice: number
            productId: string
        }[]
    }
}) => axiosClient({
    url: `/order`,
    method: 'POST',
    data,
    headers: {
        'authorization': `Bearer ${token}`
    }
})


export function fetchOrderItems({ token, orderId, limit, offset }: { token?: string; orderId: string; limit: number; offset: number }) {
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

export const createOrderStatus = ({ token, orderId, note, status }: { token: string; orderId?: string, note?: string, status: OrderStatusEnum }) => axiosClient({
    url: `/order-status`,
    method: 'POST',
    data: {
        orderId,
        note,
        status
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const fetchOrderStatusCodeNoteHistory = ({ token, statusCode }: { token: string; statusCode: string }) => axiosClient({
    url: `/order-status/notes/${statusCode}`,
    method: 'GET',
    headers: {
        'authorization': `Bearer ${token}`
    }
})


export const createOrderShare = ({ token, orderId }: { token: string; orderId?: string }) => axiosClient({
    url: `/order-share`,
    method: 'POST',
    data: {
        orderId
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const fetchOrderShare = ({ id }: { id?: string }) => axiosClient({
    url: `/order-share/${id}`,
    method: 'GET',
})