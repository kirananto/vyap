export interface IOrganizationProductCategories {
    data: Data;
    status: number;
    statusText: string;
}
export interface Data {
    limit: string;
    offset: string;
    total: number;
    data?: (IDataEntity)[] | null;
}
export interface IDataEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    name: string;
    description: string;
    imageName: string;
    organizationId: string;
}