import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlaceOrderInterface {
    note: string;
    discount: number;
    cartItems: any[];
}

const initialState: PlaceOrderInterface = {
    note: '',
    discount: 0,
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
            state.cartItems?.push(action.payload);//TODO fix the logic
        },
        clearAll: (state) => {
            state.note = '';
            state.discount = 0;
            state.cartItems = [];
        },

    },
});

export const { setNote, setFlatDiscount, pushItemsToCart, clearAll } = placeOrderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectPlaceOrderInfo = (state: any): PlaceOrderInterface => state.placeorder;


export default placeOrderSlice.reducer;
