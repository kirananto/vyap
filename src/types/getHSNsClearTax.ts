export interface IGetHSNsClearTax {
    data: IGetHSNsClearTaxData;
    status: number;
    statusText: string;
}
export interface IGetHSNsClearTaxData {
    results?: (IGetHSNsClearTaxDataItem)[] | null;
}
export interface IGetHSNsClearTaxDataItem {
    hits?: (HitsEntity)[] | null;
    nbHits: number;
    page: number;
    nbPages: number;
    hitsPerPage: number;
    exhaustiveNbHits: boolean;
    query: string;
    params: string;
    index: string;
    processingTimeMS: number;
}
export interface HitsEntity {
    chapter_index: string;
    chapter_name: string;
    chapter: string;
    product_hsn_code: string;
    hsn_code_length: string;
    type: string;
    product_rate: string;
    product_description: string;
    product_cess: string;
    product_effective_date: string;
    product_rate_revision: string;
    Keywords: string;
    objectID: string;
}