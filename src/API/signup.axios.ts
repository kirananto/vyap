import type { SignupInterface } from 'src/Pages/Signup/signupSlice'
import { axiosClient } from './apiClient'

export const signupAPI = (data: SignupInterface) => axiosClient({
    url: '/auth/signup',
    method: 'POST',
    data
})