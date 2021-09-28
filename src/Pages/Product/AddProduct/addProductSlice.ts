import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AddProductInterface {
    mrpPrice: number;
    rate: number;
    taxEnabled: boolean;
    itemSKUCode: string;
    centralCatalogueId?: string;
    organizationId?: string
    aliasName: string
}

const initialState: AddProductInterface = {
    mrpPrice: 0,
    rate: 0,
    taxEnabled: false,
    itemSKUCode: '',
    centralCatalogueId: undefined,
    organizationId:  undefined,
    aliasName: ''
};


export const addProductSlice = createSlice({
    name: 'addproduct',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setMrpPrice: (state, action: PayloadAction<number>) => {
            state.mrpPrice = action.payload;
        },
        setRate: (state, action: PayloadAction<number>) => {
            state.rate = action.payload;
        },
        setTaxEnabled: (state, action: PayloadAction<boolean>) => {
            state.taxEnabled = action.payload
        },
        clearAll: (state) => {
            state.mrpPrice = 0;
            state.rate = 0;
            state.taxEnabled = false;
        },

    },
});

export const { setMrpPrice, setRate, setTaxEnabled, clearAll } = addProductSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectAddProductInfo = (state: any): AddProductInterface => state.addproduct;


export default addProductSlice.reducer;
