import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BrandInterface } from '../ProductScreen/BrandModal';

interface CentralCatalogueInterface {
    barCode: string
    brandId: string
    description: string
    hsnId: string
    id: string
    name: string
}

export interface HSNInterface {
    chapter: string
    id: string
    description: string
    gstPercentage: number
    hsn: string
}
export interface AddProductInterface {
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
        }
        barCode: string
        brand?: BrandInterface
        brandId: string
        caseQuantity: number
        aliasName: string
    }
}

const initialState: AddProductInterface = {
    centralCatalogue: undefined,
    pricing: {
        mrpPrice: undefined,
        salesPrice: undefined,
        taxEnabled: false,
        hsn: undefined,
        gstPercentage: 0
    },
    others: {
        productImage: [],
        aliasName: '',
        skuCode: '',
        category: undefined,
        barCode: '',
        brand: undefined,
        brandId: '',
        caseQuantity: 0
    }
};


export const addProductSlice = createSlice({
    name: 'addproduct',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setCentralCatalogue: (state: AddProductInterface, action: PayloadAction<CentralCatalogueInterface>) => {
            state.centralCatalogue = action.payload;
        },
        setMrpPrice: (state: AddProductInterface, action: PayloadAction<number>) => {
            state.pricing.mrpPrice = action.payload;
        },
        setSalesPrice: (state: AddProductInterface, action: PayloadAction<number>) => {
            state.pricing.salesPrice = action.payload;
        },
        setTaxEnabled: (state, action: PayloadAction<boolean>) => {
            state.pricing.taxEnabled = action.payload
        },
        setHsnNumber: (state, action: PayloadAction<AddProductInterface['pricing']['hsn']>) => {
            state.pricing.hsn = action.payload
            state.pricing.gstPercentage = 0
        },
        setGstPercentage: (state, action: PayloadAction<number>) => {
            state.pricing.gstPercentage = action.payload
            state.pricing.hsn = undefined
        },
        setProductImage: (state: AddProductInterface, action: PayloadAction<any>) => {
            state.others.productImage = [
                ...state.others.productImage,
                action.payload
            ]
        },
        setSkuCode: (state, action: PayloadAction<any>) => {
            state.others.skuCode = action.payload
        },
        setAliasName: (state, action: PayloadAction<string>) => {
            state.others.aliasName = action.payload
        },
        setDescription: (state, action: PayloadAction<string>) => {
            if (state.centralCatalogue) {
                state.centralCatalogue.description = action.payload
            }
        },
        setCategory: (state, action: PayloadAction<AddProductInterface['others']['category']>) => {
            state.others.category = action.payload
        },
        setBarCode: (state, action: PayloadAction<any>) => {
            state.others.barCode = action.payload
        },
        setBrand: (state, action: PayloadAction<any>) => {
            state.others.brand = action.payload
        },
        setCaseQuantity: (state, action: PayloadAction<any>) => {
            state.others.caseQuantity = action.payload
        },
        clearAll: () => {
            return initialState
        },

    },
});

export const {
    setCentralCatalogue,
    setMrpPrice,
    setBarCode,
    setBrand,
    setCaseQuantity,
    setCategory,
    setGstPercentage,
    setHsnNumber,
    setProductImage,
    setSalesPrice,
    setSkuCode,
    setTaxEnabled,
    setAliasName,
    setDescription,
    clearAll
} = addProductSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectAddProductInfo = (state: any): AddProductInterface => state.addproduct;


export default addProductSlice.reducer;
