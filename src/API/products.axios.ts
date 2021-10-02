import { axiosClient } from './apiClient'

export interface IAddProduct {
    organizationCatalogueCategory: {
        name: string,
        description: string,
        imageName?: string,
        id?: string,
        createdAt?: string,
        updatedAt?: string
    },
    aliasName?: string,
    organizationCatalogueCategoryId?: string,
    centralCatalogueId?: string,
    itemSKUCode: string
    taxEnabled: boolean,
    mrpPrice: number,
    rate: number
}

export interface AddCentralCatalogueInterface {
   name: string
   description: string
   brandId: string
   hsnId: string
   // TODO Unverified
   categories: any
   image: any
}

export const fetchProducts = (token: string, organizationId: string, limit: number, offset: number) => axiosClient({
    url: `/organization-catalogue`,
    method: 'GET',
    params: {
        organizationId,
        limit,
        offset
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const fetchCentralProducts = (token: string, limit: number, offset: number) => axiosClient({
    url: `/central-catalogue`,
    method: 'GET',
    params: {
        limit,
        offset
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})
export const postAddCentralProduct = (token: string, data: AddCentralCatalogueInterface) => axiosClient({
    url: `/central-catalogue`,
    method: 'POST',
    data,
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const postAddProduct = (token: string, data: IAddProduct) => axiosClient({
    url: `/organization-catalogue`,
    method: 'POST',
    data,
    headers: {
        'authorization': `Bearer ${token}`
    }
})
