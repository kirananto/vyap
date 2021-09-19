import { axiosClient } from './apiClient'

export const fetchProducts = (token: string, organizationId: string, limit: number, offset: number) => axiosClient({
    url: `/organization-catalogue`,
    method: 'GET',
    params: {
        organizationId,
        limit,
        offset
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})