import { axiosClient } from './apiClient'

export const patchOrganization = ({ token, id, pinCode, name, profileImageUrl }: { token?: string; id?: string; pinCode?: string; name?: string, profileImageUrl?: string }) => axiosClient({
    url: `/organization/${id}`,
    method: 'PATCH',
    data: {
        pinCode,
        name,
        ...(profileImageUrl ? { profileImageUrl } : {})
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})