import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductFilterInterface {
    categories: any[];
    brands: any[];
    sorting: 'latest' | 'price-high-low' | 'price-low-high' | undefined;
}

const initialState: ProductFilterInterface = {
    categories: [],
    brands: [],
    sorting: undefined
};


export const productFiltersSlice = createSlice({
    name: 'productFilters',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setCategories: (state, action: PayloadAction<ProductFilterInterface['categories']>) => {
            state.categories = action.payload;
        },
        setBrands: (state, action: PayloadAction<ProductFilterInterface['brands']>) => {
            state.brands = action.payload;
        },
        setSorting: (state, action: PayloadAction<ProductFilterInterface['sorting']>) => {
            state.sorting = action.payload;
        },
        addCategories: (state, action: PayloadAction<any>) => {
            state.categories.push(action.payload);
        },
        addBrands: (state, action: PayloadAction<any>) => {
            state.brands.push(action.payload);
        },
        clearAll: (state) => {
            state.categories = [];
            state.brands = [];
            state.sorting = undefined;
        },

    },
});

export const { setCategories, setBrands, setSorting, addCategories, addBrands, clearAll } = productFiltersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectProductFilters = (state: any): ProductFilterInterface => state.productFilters;


export default productFiltersSlice.reducer;
