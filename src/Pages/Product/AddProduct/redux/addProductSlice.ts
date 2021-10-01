import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CentralCatalogueInterface {
    barCode: string
    brandId: string
    description: string
    hsnId: string
    id: string
    name: string
}
export interface AddProductInterface {
    pricing: {
        mrpPrice: number
        salesPrice: number
        taxEnabled: boolean
        hsnNumber: number
        gstPercentage: number
    },
    centralCatalogue?: CentralCatalogueInterface,
    others: {
        productImage: any[]
        skuCode: string
        category: string
        barCode: string
        brand: string
        caseQuantity: number
    }
}

const initialState: AddProductInterface = {
    centralCatalogue: undefined,
    pricing: {
        mrpPrice: 0,
        salesPrice: 0,
        taxEnabled: false,
        hsnNumber: 0,
        gstPercentage: 0
    },
    others: {
        productImage: [{
            id: '123',
            url: "https://i5.walmartimages.com/asr/b16c6dcf-98b5-4000-b106-728647912d81_1.ae9db2c3a2020d02b73f03d740cdef14.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
        }],
        skuCode: '',
        category: '',
        barCode: '',
        brand: '',
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
        setHsnNumber: (state, action: PayloadAction<number>) => {
            state.pricing.hsnNumber = action.payload
        },
        setGstPercentage: (state, action: PayloadAction<number>) => {
            state.pricing.gstPercentage = action.payload
        },
        setProductImage: (state, action: PayloadAction<any>) => {
            state.others.productImage = action.payload
        },
        setSkuCode: (state, action: PayloadAction<any>) => {
            state.others.skuCode = action.payload
        },
        setCategory: (state, action: PayloadAction<any>) => {
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
    clearAll
} = addProductSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectAddProductInfo = (state: any): AddProductInterface => state.addproduct;


export default addProductSlice.reducer;
