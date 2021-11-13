import { axiosClient } from './apiClient'

export const fetchBrands = (token: string, limit: number, offset: number, search?: string) => axiosClient({
    url: `/brand`,
    method: 'GET',
    params: {
        limit,
        offset,
        filter: search ? `name||$contL||${search}` : undefined
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})