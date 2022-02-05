export interface IProduct {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    aliasName?: string | null;
    organizationCatalogueCategoryId?: string | null;
    thumbnailImage?: string | null;
    outOfStock: boolean;
    organizationId: string;
    centralCatalogueId: string;
    itemSKUCode?: string | null;
    taxEnabled: boolean;
    mrpPrice: string;
    rate: string;
    centralCatalogue: ICentralCatalogue;
}
export interface ICentralCatalogue {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    name: string;
    description: string;
    brandId?: null;
    barCode?: string | null;
    isApproved: boolean;
    hsnId?: string | null;
}