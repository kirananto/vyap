import { axiosClient } from './apiClient'

export const fetchCategories = (token?: string) => axiosClient({
    url: '/organization-category',
    method: 'GET',
    headers: {
        'authorization': `Bearer ${token}`
    }
})