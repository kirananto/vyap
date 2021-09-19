import { axiosClient } from './apiClient'
import type { paymentMethod, paymentStatus } from './enum'

export const fetchPaymentById = (token: string, id: string) => axiosClient({
    url: `/payment/${id}`,
    method: 'GET',
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const createPayment = (token: string, data: {
    "amount": number
    "note": string
    "status": paymentStatus,
    "method": paymentMethod,
    "senderOrgId": string,
    "senderUserId"?: string,
    "receiverId": string,
}) => axiosClient({
    url: `/payment`,
    method: 'POST',
    headers: {
        'authorization': `Bearer ${token}`
    },
    data,
})
