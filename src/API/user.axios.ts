import { axiosClient } from './apiClient'

export const patchUser = ({
    id,
    name,
    phone,
    email,
    profileImageUrl
}: {
    id: string,
    name?: string,
    phone?: string,
    email?: string,
    profileImageUrl?: string,
}) => axiosClient({
    url: `/user/${id}`,
    method: 'patch',
    data: {
        name,
        phone,
        email,
        profileImageUrl
    }
})
