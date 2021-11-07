import { axiosClient } from './apiClient'

export const getHSNs = ({
    limit,
    offset,
    search,
    token
}: {
    token: string,
    limit: number,
    offset: number,
    search?: string
}) => axiosClient({
    url: `/hsn`,
    method: 'GET',
    headers: {
        'authorization': `Bearer ${token}`
    },
    params: {
        limit,
        offset,
        filter: search ? `chapter||$contL||${search}&or=description||$contL||${search}&or=hsn||$contL||${search}` : undefined
    }
})
