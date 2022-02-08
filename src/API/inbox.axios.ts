import { axiosClient } from './apiClient'

export function fetchInboxes({ token, offset, limit, search } : { token?: string, offset?: number, limit?: number, search?: string }) {
    return axiosClient({
        url: '/inbox',
        method: 'GET',
        headers: {
            'authorization': `Bearer ${token}`
        },
        params: {
            offset,
            search: search?.trim(),
            limit
        }
    })
}


export const fetchInboxById = (token?: string, id: string) => axiosClient({
    url: `/inbox/${id}`,
    method: 'GET',
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export function fetchThreadsById({ token, inboxId, offset, limit }: { token?: string; inboxId: string; offset: number; limit: number }) {
    return axiosClient({
        url: `/thread`,
        method: 'GET',
        headers: {
            'authorization': `Bearer ${token}`
        },
        params: {
            inboxId,
            offset,
            limit
        }
    })
}