import { axiosClient } from './apiClient'

export const patchOrganization = ({ token, id, pinCode, name }: { token?: string; id: string; pinCode?: string; name: string }) => axiosClient({
    url: `/organization/${id}`,
    method: 'PATCH',
    data: {
        pinCode,
        name
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})