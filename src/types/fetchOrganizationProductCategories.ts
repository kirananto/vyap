export interface IFetchOrganizationProductCategories {
    data: Data;
    status: number;
    statusText: string;
}
export interface Data {
    limit: string;
    offset: string;
    total: number;
    data?: (IFetchOrganizationProductCategory)[] | null;
}
export interface IFetchOrganizationProductCategory {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    name: string;
    description: string;
    imageName: string;
    organizationId: string;
}