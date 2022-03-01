import type { IMAGEKIT_FOLDERS } from 'src/utils/imageKit'
import { axiosClient } from './apiClient'

export const imageUpload = ({ token, data, folder }: { token?: string; data: FormData, folder?: IMAGEKIT_FOLDERS }) => axiosClient({
    url: `/image-upload/upload`,
    method: 'POST',
    data,
    params: folder ? {
        folder
    } : {},
    headers: {
        'authorization': `Bearer ${token}`
    }
})