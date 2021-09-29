import { axiosClient } from './apiClient'

export const fetchOrderAPI = (token: string, id: string) => axiosClient({
    url: `/order/${id}`,
    method: 'GET',
    headers: {
        'authorization': `Bearer ${token}`
    }
})
export const fetchOrdersAPI = (token: string) => axiosClient({
    url: `/order`,
    method: 'GET',
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const placeOrderAPI = (token: string, data: {
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