import { axiosClient } from './apiClient'
import type { paymentMethod, paymentStatus } from './enum'

export function fetchPaymentById({ token, id }: { token?: string; id?: string} ) {
    return axiosClient({
        url: `/payment/${id}`,
        method: 'GET',
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
}
export function fetchAllPayments({ token, limit, offset, paymentMethod, ordering, relatedId }: { token?: string; limit: number; offset: number; paymentMethod?: string; ordering?: string; relatedId?: string} ) {
    return axiosClient({
        url: `/payment`,
        method: 'GET',
        params: {
            limit,
            offset,
            paymentMethod,
            relatedId,
            ordering
        },
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
}

export function createPayment({ token, data }: {
    token?: string; data: {
        'amount': number
        'note': string
        'status': paymentStatus
        'method': paymentMethod
        'senderOrgId'?: string
        'senderUserId'?: string
        'receiverId'?: string
    }
}) {
    return axiosClient({
        url: `/payment`,
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`
        },
        data,
    })
}