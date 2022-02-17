import type { IOrganizationProductCategory } from './organizationProductCategories'

export interface IFetchCentralCatalogueProduct {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    name: string;
    description: string;
    brandId: string;
    barCode: string;
    isApproved: boolean;
    hsnId?: null;
    categories?: IOrganizationProductCategory[];
    brand: Brand;
    images?: (ImagesEntity)[] | null;
}
export interface Brand {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    name: string;
    description: string;
    imageName: string;
}
export interface ImagesEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    productId: string;
    imageName: string;
    title: string;
    description: string;
}