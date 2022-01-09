import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BrandInterface } from '../../AddProduct/ProductScreen/BrandModal';
import type { HSNInterface } from '../../AddProduct/redux/addProductSlice';

interface CentralCatalogueInterface {
    barCode?: string
    brandId?: string
    description?: string
    hsnId?: string
    id?: string
    name?: string
}

export interface EditProductInterface {
    centralCatalogue?: CentralCatalogueInterface,
    editProduct: any
    id?: string,
    mrpPrice?: number
    salesPrice?: number
    aliasName?: string
    thumbnailImage?:string
}

export interface ProductInterface {
    pricing: {
        mrpPrice?: number
        salesPrice?: number
        taxEnabled: boolean
        hsn?:  HSNInterface | undefined,
        gstPercentage: number
    },
    centralCatalogue?: CentralCatalogueInterface,
    others: {
        productImage: any[]
        skuCode: string
        category?: {
            id?: string,
            name: string,
            description?: string,
            imageName?: string
        },
        centralCategory?: {
            id?: string,
            name: string,
            description?: string,
            imageName?: string
        },
        barCode: string
        brand?: BrandInterface
        brandId: string
        caseQuantity: number
        aliasName: string
    }
}

const initialState: EditProductInterface = {
    editProduct: {},
    thumbnailImage:'',
    aliasName: '',
    mrpPrice: undefined,
    salesPrice: undefined,
};


export const editProductSlice = createSlice({
    name: 'editproduct',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setEditProduct: (state: EditProductInterface, action: PayloadAction<ProductInterface>) => {
            state.editProduct = action.payload;
        },
        setMrpPrice: (state: EditProductInterface, action: PayloadAction<number>) => {
            state.mrpPrice = action.payload;
        },
        setSalesPrice: (state: EditProductInterface, action: PayloadAction<number>) => {
            state.salesPrice = action.payload;
        },
        setAliasName: (state, action: PayloadAction<string>) => {
            state.aliasName = action.payload
        },
        clearAll: () => {
            return initialState
        },

    },
});

export const {
    setEditProduct,
    setMrpPrice,
    setSalesPrice,
    setAliasName,
    clearAll
} = editProductSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectEditProductInfo = (state: any): EditProductInterface => state.editproduct;


export default editProductSlice.reducer;
