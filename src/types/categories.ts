export interface IFetchCategories {
    data: IFetchCategoriesData
}

export interface IFetchCategoriesData {
    data: ICategories[]
}

export interface ICategories {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    name: string;
    description: string;
    imageName: string;
}