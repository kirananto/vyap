import { axiosClient } from './apiClient'

export const fetchPrevOrderedProducts = ({ token, buyerId, supplierId, limit, offset }: { token?: string; buyerId: string; supplierId: string; limit: number; offset: number }) => axiosClient({
    url: `/suggestions/previously-ordered`,
    method: 'GET',
    params: {
        buyerId,
        supplierId,
        limit,
        offset
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})