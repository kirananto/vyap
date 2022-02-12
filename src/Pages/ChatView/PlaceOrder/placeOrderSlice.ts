import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'src/redux/store'
import type { IProduct } from 'src/types/product'

export interface ProductIntermittentState extends IProduct {
    quantity: number
}
export interface PlaceOrderInterface {
    note: string;
    discount: number;
    orgId: string
    cartItems: ProductIntermittentState[];
}

const initialState: PlaceOrderInterface = {
    note: '',
    discount: 0,
    orgId: '',
    cartItems: [],
}


export const placeOrderSlice = createSlice({
    name: 'placeorder',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setNote: (state, action: PayloadAction<string>) => {
            state.note = action.payload
        },
        setFlatDiscount: (state, action: PayloadAction<number>) => {
            state.discount = action.payload
        },
        pushItemsToCart: (state, action: PayloadAction<ProductIntermittentState[]>) => {
            const oldCartItemsModified = state.cartItems?.map(mapItem => {
                const payloadQuantity = action.payload?.find((findItem) => findItem.id === mapItem.id)?.quantity ?? 0
                return {
                    ...mapItem,
                    quantity: mapItem.quantity + payloadQuantity
                }
            })
            const newCartItemCleaned = action.payload?.filter((filterItem) => {
                const isItAlreadyPresent = oldCartItemsModified?.some(someItem => someItem.id === filterItem.id)
                return !isItAlreadyPresent
            })
            state.cartItems = [...oldCartItemsModified, ...newCartItemCleaned]
        },
        updateItemsOnCart: (state, action: PayloadAction<ProductIntermittentState[]>) => {
            const oldCartItemsModified = state.cartItems?.map(mapItem => {
                const payloadQuantity = action.payload?.find((findItem) => findItem.id === mapItem.id)?.quantity ?? 0

                if(payloadQuantity > 0){
                    return {
                        ...mapItem,
                        quantity:  payloadQuantity
                    }
                }else{
                    return {
                        ...mapItem,
                        quantity:  mapItem.quantity + payloadQuantity
                    }
                }
                
            })
            const newCartItemCleaned = action.payload?.filter((filterItem) => {
                const isItAlreadyPresent = oldCartItemsModified?.some(someItem => someItem.id === filterItem.id)
                return !isItAlreadyPresent
            })
            state.cartItems = [...oldCartItemsModified, ...newCartItemCleaned]

        },
        removeItemsFromCart: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
            state.cartItems = state.cartItems?.map(mapItem => {
                if(mapItem.id === action.payload.id) {
                    return {
                        ...mapItem,
                        quantity: mapItem.quantity - (action.payload?.quantity ?? 0)
                    }
                } else {
                    return mapItem
                }
            }).filter(filterItem => filterItem.quantity > 0)
        },
        setOrgId: (state, action: PayloadAction<string>) => {
            state.orgId = action.payload
        },
        clearAll: (state) => {
            state.note = ''
            state.discount = 0
            state.cartItems = []
        },

    },
})

export const { setNote, setFlatDiscount, pushItemsToCart, updateItemsOnCart, removeItemsFromCart, setOrgId, clearAll } = placeOrderSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectPlaceOrderInfo = (state: RootState): PlaceOrderInterface => state.placeorder


export default placeOrderSlice.reducer