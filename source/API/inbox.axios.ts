import { axiosClient } from './apiClient'

export const fetchInboxes = (token: string, offset?: number, limit?: number) => axiosClient({
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


export const fetchInboxById = (token: string, id: string) => axiosClient({
    url: `/inbox/${id}`,
    method: 'GET',
    headers: {
        'authorization': `Bearer ${token}`
    }
})
