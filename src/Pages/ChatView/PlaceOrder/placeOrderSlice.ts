import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlaceOrderInterface {
    note: string;
    discount: number;
    orgId: string
    cartItems: any[];
}

const initialState: PlaceOrderInterface = {
    note: '',
    discount: 0,
    orgId: '',
    cartItems: [],
};


export const placeOrderSlice = createSlice({
    name: 'placeorder',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setNote: (state, action: PayloadAction<string>) => {
            state.note = action.payload;
        },
        setFlatDiscount: (state, action: PayloadAction<number>) => {
            state.discount = action.payload;
        },
        pushItemsToCart: (state, action: PayloadAction<any>) => {
            const oldCartItemsModified = state.cartItems?.map(mapItem => {
                const payloadQuantity = action.payload?.find((findItem: any) => findItem.id === mapItem.id)?.quantity ?? 0
                return {
                    ...mapItem,
                    quantity: mapItem.quantity + payloadQuantity
                }
            })
            const newCartItemCleaned = action.payload?.filter((filterItem: any) => {
                const isItAlreadyPresent = oldCartItemsModified?.some(someItem => someItem.id === filterItem.id)
                return !isItAlreadyPresent
            })
            state.cartItems = [...oldCartItemsModified, ...newCartItemCleaned];
        },
        updateItemsOnCart: (state, action: PayloadAction<any>) => {
            const oldCartItemsModified = state.cartItems?.map(mapItem => {
                const payloadQuantity = action.payload?.find((findItem: any) => findItem.id === mapItem.id)?.quantity ?? 0

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
            const newCartItemCleaned = action.payload?.filter((filterItem: any) => {
                const isItAlreadyPresent = oldCartItemsModified?.some(someItem => someItem.id === filterItem.id)
                return !isItAlreadyPresent
            })
            state.cartItems = [...oldCartItemsModified, ...newCartItemCleaned];

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
            state.note = '';
            state.discount = 0;
            state.cartItems = [];
        },

    },
});

export const { setNote, setFlatDiscount, pushItemsToCart, updateItemsOnCart, removeItemsFromCart, setOrgId, clearAll } = placeOrderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectPlaceOrderInfo = (state: any): PlaceOrderInterface => state.placeorder;


export default placeOrderSlice.reducer;
