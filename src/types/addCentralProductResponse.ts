import type { variantInterface } from "src/Pages/Product/AddProduct/redux/addProductSlice";

export interface IAddCentralProductResponse {
    data: IAddCentralProductResponseData;
    status: number;
    statusText: string;
}
export interface IAddCentralProductResponseData {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    variants: variantInterface[]
    name: string;
    description: string;
    brandId?: null;
    barCode: string;
    isApproved: boolean;
    hsnId?: null;
    images?: (null)[] | null;
}