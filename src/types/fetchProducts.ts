import type { IProduct } from './product'
export interface IProductList {
    data: Data;
    status: number;
    statusText: string;
}
export interface Data {
    limit: number;
    offset: number;
    total: number;
    data?: (IProduct)[] | null;
}