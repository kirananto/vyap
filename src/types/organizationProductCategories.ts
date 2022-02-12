export interface IOrganizationProductCategories {
    data: Data;
    status: number;
    statusText: string;
}
export interface Data {
    limit: string;
    offset: string;
    total: number;
    data?: (IOrganizationProductCategory)[] | null;
}
export interface IOrganizationProductCategory {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    name: string;
    description: string;
    imageName: string;
    organizationId?: string;
}