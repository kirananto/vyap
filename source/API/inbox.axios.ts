import { axiosClient } from './apiClient'

export const fetchInbox = (token: string, offset?: number, limit?: number) => axiosClient({
    url: '/inbox',
    method: 'GET',
    headers: {
        'authorization': `Bearer ${token}`
    },
    params: {
        offset,
        limit
    }
})
