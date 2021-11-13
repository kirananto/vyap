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
    thumbnailImage: string
    aliasName: string,
    organizationCatalogueCategoryId?: string,
    centralCatalogueId: string,
    itemSKUCode: string
    taxEnabled: boolean,
    mrpPrice: number,
    rate: number
}

export interface AddCentralCatalogueInterface {
    name: string
    description: string
    brandId?: string
    hsnId?: string
    // TODO Unverified
    categories: any
    images: any
    brand?: { 
        name?: string
        description?: string
        imageName?: string
    }
}

export const fetchProducts = ({ token, organizationId, limit, offset, categoryIds, brandIds, ordering, search }: { token: string; organizationId: string; limit: number; offset: number, categoryIds?: string, brandIds?: string, ordering?: string, search?: string }) => axiosClient({
    url: `/organization-catalogue`,
    method: 'GET',
    params: {
        organizationId,
        limit,
        categoryIds,
        brandIds,
        ordering,
        search,
        offset
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const deleteProductById = ({ token, id }: { token: string; id?: string }) => axiosClient({
    url: `/organization-catalogue/${id}`,
    method: 'DELETE',
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const patchProductById = ({ token, id, data }: { token: string; id?: string, data: any }) => axiosClient({
    url: `/organization-catalogue/${id}`,
    method: 'PATCH',
    data,
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const fetchCentralProducts = (token: string, limit: number, offset: number) => axiosClient({
    url: `/central-catalogue`,
    method: 'GET',
    params: {
        limit,
        offset,
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const fetchCentralProductCategories = (token: string, limit: number, offset: number) => axiosClient({
    url: `/organization-catalogue-category`,
    method: 'GET',
    params: {
        limit,
        offset,
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const fetchCentralProductImages = (token: string, limit: number, offset: number, catalogueId: string) => axiosClient({
    url: `/central-catalogue-image`,
    method: 'GET',
    params: {
        limit,
        offset,
        filter: `productId||$eq||${catalogueId}`
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
