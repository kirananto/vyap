import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'src/redux/store'

export interface ProductFilterInterface {
    categories: any[];
    brands: any[];
    sorting: 'latest' | 'price-high-low' | 'price-low-high' | undefined;
}

const initialState: ProductFilterInterface = {
    categories: [],
    brands: [],
    sorting: undefined
}


export const productFiltersSlice = createSlice({
    name: 'productFilters',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setCategories: (state, action: PayloadAction<ProductFilterInterface['categories']>) => {
            state.categories = action.payload
        },
        setBrands: (state, action: PayloadAction<ProductFilterInterface['brands']>) => {
            state.brands = action.payload
        },
        setSorting: (state, action: PayloadAction<ProductFilterInterface['sorting']>) => {
            state.sorting = action.payload
        },
        categoriesCheckbox: (state, action: PayloadAction<any>) => {
            const isPresent = state.categories?.find(item => item.id === action.payload.id)
            if(isPresent) {
                state.categories = state.categories?.filter(filterItem => filterItem.id !== action.payload.id)
            } else {
                state.categories.push(action.payload)
            }
        },
        brandsCheckbox: (state, action: PayloadAction<any>) => {
            const isPresent = state.brands?.find(item => item.id === action.payload.id)
            if(isPresent) {
                state.brands = state.brands?.filter(filterItem => filterItem.id !== action.payload.id)
            } else {
                state.brands.push(action.payload)
            }
        },
        clearAll: (state) => {
            state.categories = []
            state.brands = []
            state.sorting = undefined
        },

    },
})

export const { setCategories, setBrands, setSorting, categoriesCheckbox, brandsCheckbox, clearAll } = productFiltersSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectProductFilters = (state: RootState): ProductFilterInterface => state.productFilters


export default productFiltersSlice.reducer