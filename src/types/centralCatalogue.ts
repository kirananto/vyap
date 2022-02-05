export interface ICentralCatalogue {
    data: IData;
    status: number;
    statusText: string;
}
export interface IData {
    data?: (IDataEntity)[] | null;
}
export interface IDataEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    productId: string;
    imageName: string;
    title: string;
    description: string;
}