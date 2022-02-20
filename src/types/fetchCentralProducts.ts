import type { CentralCatalogueInterface } from 'src/Pages/Product/AddProduct/redux/addProductSlice'

export interface IFetchCentralProducts {
    data: IData;
    status: number;
    statusText: string;
}
export interface IData {
    data?: (CentralCatalogueInterface)[] | null;
    count: number;
    total: number;
    page: number;
    pageCount: number;
}
export interface IImagesEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    productId: string;
    imageName: string;
    title: string;
    description: string;
}