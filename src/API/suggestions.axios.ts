import { axiosClient } from './apiClient'

export const fetchPrevOrderedProducts = ({ token, organizationId, limit, offset }: { token: string; organizationId: string; limit: number; offset: number }) => axiosClient({
    url: `/suggestions/previously-ordered`,
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