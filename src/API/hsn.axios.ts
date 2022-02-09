import { axiosClient } from './apiClient'

export const getHSNsClearTax = ({ search }: { search: string }) => axiosClient({
    url: `/hsn/hsnlist`,
    method: 'POST',
    data: {
        'requests': [
            {
                'indexName': 'HSN_SAC_2021',
                'params': `query=${search.trim()}&optionalWords=${search.trim()}&hitsPerPage=100&highlightPreTag=%3Cstrong%3E&highlightPostTag=%3C%2Fstrong%3E&typoTolerance=false`
            }
        ]
    }
})

export const createIfNotExists = async ({ token, data }: { token?: string; data: { hsn: number; chapter: string; description: string; gstPercentage: number}  }) => {

    let apiResponse: any = undefined
    try {
        apiResponse = await axiosClient({
            url: `/hsn`,
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`
            },
            params: {
                filter: `hsn||$eq||${data.hsn}` 
            }
        })
    }
    catch(e) {
        apiResponse = undefined
    }
    if(!apiResponse?.data?.data?.[0]?.id) {
        const res = await createHSNAPI({ token, data }) 
        return res.data
    }
    else {
        return apiResponse?.data?.data?.[0]
    }

}

export const createHSNAPI = ({ token, data }: { token?: string; data: { hsn: number; chapter: string; description: string; gstPercentage: number}  }) => {
    return axiosClient({
        url: `/hsn`,
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`
        },
        data: data
    })
}

export const getHSNs = ({
    limit,
    offset,
    search,
    token
}: {
    token?: string,
    limit: number,
    offset: number,
    search?: string
}) => {
    const params = new URLSearchParams()
    params.append('limit', `${limit}`)
    params.append('offset', `${offset}`)
    if (search?.trim()) {
        params.append('or', `chapter||$contL||${search?.trim()}`)
        params.append('or', `description||$contL||${search?.trim()}`)
        params.append('or', `hsn||$contL||${search?.trim()}`)
    }
    return axiosClient({
        url: `/hsn`,
        method: 'GET',
        headers: {
            'authorization': `Bearer ${token}`
        },
        params
    })
}