import { axiosClient } from './apiClient'

export interface IAddProduct {
    organizationCatalogueCategory?: {
        name?: string,
        description?: string,
        imageName?: string,
        id?: string,
        organizationId?: string
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

export interface IEditProduct {
    aliasName: string,
    mrpPrice: number,
    rate: number
}

export interface AddCentralCatalogueInterface {
    name: string
    description: string
    brandId?: string
    hsnId?: string
    barCode?: string
    categoriesId?: string
    categories: any
    images: any
    brand?: { 
        name?: string
        description?: string
        imageName?: string
    }
}

export const fetchProducts = ({ token, organizationId, limit, offset, categoryIds, brandIds, ordering, search, outOfStock }: { token?: string; organizationId: string; limit: number; offset: number, categoryIds?: string, brandIds?: string, ordering?: string, search?: string, outOfStock?: boolean }) => axiosClient({
    url: `/organization-catalogue`,
    method: 'GET',
    params: {
        organizationId,
        limit,
        categoryIds,
        brandIds,
        ordering,
        search: search?.trim(),
        offset,
        outOfStock
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const deleteProductById = ({ token, id }: { token?: string; id?: string }) => axiosClient({
    url: `/organization-catalogue/${id}`,
    method: 'DELETE',
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const fetchProductById = ({ token, id }: { token?: string; id?: string }) => axiosClient({
    url: `/organization-catalogue/${id}`,
    method: 'GET',
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const patchProductById = ({ token, id, data }: { token?: string; id?: string, data: any }) => axiosClient({
    url: `/organization-catalogue/${id}`,
    method: 'PATCH',
    data,
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const fetchCentralProduct = ({ token, id }: { token?: string; id?: string}) => axiosClient({
    url: `/central-catalogue/${id}`,
    method: 'GET',
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const fetchCentralProducts = (token?: string, limit: number, offset: number, search?: string) => axiosClient({
    url: `/central-catalogue`,
    method: 'GET',
    params: {
        limit,
        offset,
        filter: search ? `name||$contL||${search?.trim()}` : undefined
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const fetchOrganizationProductCategories = (token?: string, limit: number, offset: number, search?: string, orgId?: string) => axiosClient({
    url: `/organization-catalogue-category`,
    method: 'GET',
    params: {
        limit,
        offset,
        search: search?.trim(),
        orgId,
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const fetchCentralProductCategories = (token?: string, limit: number, offset: number, search?: string) => axiosClient({
    url: `/central-catalogue-category`,
    method: 'GET',
    params: {
        limit,
        offset,
        search: search?.trim(),
    },
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const fetchCentralProductImages = (token?: string, limit: number, offset: number, catalogueId: string) => axiosClient({
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

export const postAddCentralProduct = (token?: string, data: AddCentralCatalogueInterface) => axiosClient({
    url: `/central-catalogue`,
    method: 'POST',
    data,
    headers: {
        'authorization': `Bearer ${token}`
    }
})

export const postAddProduct = (token?: string, data: IAddProduct) => axiosClient({
    url: `/organization-catalogue`,
    method: 'POST',
    data,
    headers: {
        'authorization': `Bearer ${token}`
    }
})