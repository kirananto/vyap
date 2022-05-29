import type { CentralCatalogueInterface, variantInterface } from 'src/Pages/Product/AddProduct/redux/addProductSlice'
import type { IFetchCentralCatalogueProduct } from './fetchCentralProduct'

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
    centralCatalogue: CentralCatalogueInterface;
    organizationCatalogueCategory?: {
        name: string
    }
    variant?: variantInterface
    variantId?: string
    centralData?: IFetchCentralCatalogueProduct
}