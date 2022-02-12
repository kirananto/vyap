import { axiosClient } from './apiClient'

export const patchUser = ({
    token,
    id,
    name,
    phone,
    email,
    profileImageUrl
}: {
    token?: string,
    id?: string,
    name?: string,
    phone?: string,
    email?: string,
    profileImageUrl?: string,
}) => axiosClient({
    url: `/user/${id}`,
    method: 'patch',
    headers: {
        'authorization': `Bearer ${token}`
    },
    data: {
        name,
        phone,
        email,
        profileImageUrl
    }
})