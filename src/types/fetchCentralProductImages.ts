export interface IFetchCentralProductImages {
    data: IData;
}
export interface IData {
    data?: (ICentralImage)[] | null;
}
export interface ICentralImage {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    productId: string;
    imageName: string;
    title: string;
    description: string;
}