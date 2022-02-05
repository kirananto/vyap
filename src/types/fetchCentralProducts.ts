export interface IFetchCentralProducts {
    data: IData;
    status: number;
    statusText: string;
}
export interface IData {
    data?: (ICentralProduct)[] | null;
    count: number;
    total: number;
    page: number;
    pageCount: number;
}
export interface ICentralProduct {
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
    images?: (IImagesEntity | null)[] | null;
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