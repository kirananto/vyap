import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'src/redux/store'
import type { IFetchCentralCatalogueProduct } from 'src/types/fetchCentralProduct'
import type { IProduct } from 'src/types/product'

export interface productsInterface {
    products: IProduct[];
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
        setSingleProduct: (state, action: PayloadAction<IProduct>) => {
            const productIndex = state.products.findIndex(product => product.id === action.payload.id)
            if (productIndex === -1) {
                state.products.push(action.payload)
            } else {
                state.products[productIndex] = action.payload
            }
        },
        setSingleCentralData: (state, action: PayloadAction<IFetchCentralCatalogueProduct>) => {
            const productIndex = state.products.findIndex(product => product.centralCatalogueId === action.payload.id)
            if (productIndex === -1) {
                console.log('Product not found..!')
            } else {
                console.log('Product found..!... Adding central data')
                state.products[productIndex] = { ...state.products[productIndex], ...{ centralData: action.payload } }
            }

            console.log('New data:', state.products[productIndex])

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

export const { setProducts, setProductsTotal, setSingleProduct, setSingleCentralData, clearAll } = productsSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectProductsInfo = (state: RootState): productsInterface => state.products


export default productsSlice.reducer