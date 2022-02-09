import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface productsInterface {
    products: any[];
    total: number
}

const initialState: productsInterface = {
    products: [],
    total: 0
}


export const productsSlice = createSlice({
    name: 'products',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setProducts: (state, action: PayloadAction<productsInterface['products']>) => {
            state.products = action.payload
        },
        setProductsTotal: (state, action: PayloadAction<productsInterface['total']>) => {
            state.total = action.payload
        },
        clearAll: (state) => {
            state.products = []
            state.total = 0
        },

    },
})

export const { setProducts, setProductsTotal, clearAll } = productsSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectProductsInfo = (state: any): productsInterface => state.products


export default productsSlice.reducer