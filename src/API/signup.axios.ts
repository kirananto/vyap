import { axiosClient } from './apiClient'

export const signupAPI = (data: any) => axiosClient({
    url: '/auth/signup',
    method: 'POST',
    data
})