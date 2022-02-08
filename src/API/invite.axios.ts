import { axiosClient } from './apiClient'

export const inviteExisting = (token?: string, phone: string, openingBalance?: number) => axiosClient({
    url: `/invite/existing`,
    method: 'POST',
    data: {
        phone,
        openingBalance
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})
export const checkIfUserExists = (token?: string, phone: string) => axiosClient({
    url: `/invite/user-exists`,
    method: 'GET',
    params: {
        phone
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const inviteNew = (token?: string, data: {
    openingBalance: number
    phone: string,
    businessName: string,
    address: string,
    businessNumber: string,
    pinCode: string
}) => axiosClient({
    url: `/invite/new`,
    method: 'POST',
    headers: {
        'authorization': `Bearer ${token}`
    },
    data,
})