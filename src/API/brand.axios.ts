import { axiosClient } from './apiClient'

export const fetchBrands = (token: string, limit: number, offset: number) => axiosClient({
    url: `/brand`,
    method: 'GET',
    params: {
        limit,
        offset
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})