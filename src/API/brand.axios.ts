import { axiosClient } from './apiClient'

export const fetchBrands = ({ token, limit, offset, search }: { token?: string; limit: number; offset: number; search?: string }) => axiosClient({
    url: `/brand`,
    method: 'GET',
    params: {
        limit,
        offset,
        filter: search?.trim() ? `name||$contL||${search?.trim()}` : undefined
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})