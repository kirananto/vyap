import { axiosClient } from './apiClient'

export const imageUpload = ({ token, data }: { token?: string; data: FormData }) => axiosClient({
    url: `/image-upload/upload`,
    method: 'POST',
    data,
    headers: {
        'authorization': `Bearer ${token}`
    }
})