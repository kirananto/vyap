export interface ICentralProduct {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    name: string;
    description: string;
    brandId?: null;
    barCode: string;
    isApproved: boolean;
    hsnId?: null;
    images?: (string)[] | null;
}