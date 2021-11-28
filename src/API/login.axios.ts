import { axiosClient } from './apiClient'

export const generateOtp = (phone: string) => axiosClient({
    url: '/auth/generate-otp',
    method: 'POST',
    data: {
        phone
    }
})

export const verifyOtp = (phone: string, otp: string) => axiosClient({
    url: '/auth/verify-otp',
    method: 'POST',
    data: {
        phone,
        otp
    }
})

export const verifyPhone = (phone: string, otp: string) => axiosClient({
    url: '/auth/verify-phone',
    method: 'POST',
    data: {
        phone,
        otp
    }
})



export const logOutAPI = (token: string) => axiosClient({
    url: '/auth/logout',
    method: 'POST',
    headers: {
        'authorization': `Bearer ${token}`
    }
})