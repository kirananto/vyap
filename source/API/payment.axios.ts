import { axiosClient } from './apiClient'

export const fetchPaymentById = (token: string, id: string) => axiosClient({
    url: `/payment/${id}`,
    method: 'GET',
    headers: {
        'authorization': `Bearer ${token}`
    }
})
