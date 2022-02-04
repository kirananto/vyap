export interface IProductImageUploadResult {
    data: IProductImageUploadResultData;
    status: number;
    statusText: string;
}
export interface IProductImageUploadResultData {
    fileId: string;
    name: string;
    size: number;
    filePath: string;
    url: string;
    fileType: string;
    height: number;
    width: number;
    thumbnailUrl: string;
    AITags?: null;
}