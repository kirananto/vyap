import { axiosClient } from './apiClient'

export const getHSNs = ({
    limit,
    offset,
    search,
    token
}: {
    token: string,
    limit: number,
    offset: number,
    search?: string
}) => {
    var params = new URLSearchParams();
    params.append("limit", `${limit}`);
    params.append("offset", `${offset}`);
    if (search) {
        params.append("or", `chapter||$contL||${search}`);
        params.append("or", `description||$contL||${search}`);
        params.append("or", `hsn||$contL||${search}`);
    }
    var request = {
        params: params
    };
    return axiosClient({
        url: `/hsn`,
        method: 'GET',
        headers: {
            'authorization': `Bearer ${token}`
        },
        params
    })
}