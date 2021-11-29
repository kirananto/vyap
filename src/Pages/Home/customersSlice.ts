import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface customersInterface {
    customers: any[];
    total: number
}

const initialState: customersInterface = {
    customers: [],
    total: 0
};


export const customersSlice = createSlice({
    name: 'customers',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setCustomers: (state, action: PayloadAction<customersInterface['customers']>) => {
            state.customers = action.payload;
        },
        setCustomerTotal: (state, action: PayloadAction<customersInterface['total']>) => {
            state.total = action.payload;
        },
        clearAll: (state) => {
            state.customers = [];
            state.total = 0;
        },

    },
});

export const { setCustomers, setCustomerTotal, clearAll } = customersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectCustomerInfo = (state: any): customersInterface => state.customers;


export default customersSlice.reducer;
