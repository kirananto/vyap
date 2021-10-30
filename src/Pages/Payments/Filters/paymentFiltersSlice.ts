import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PaymentFilterInterface {
    paymentMethod: string | undefined;
    accounts: any[];
    sorting: 'latest' | 'price-high-low' | 'price-low-high' | undefined;
}

const initialState: PaymentFilterInterface = {
    paymentMethod: undefined,
    accounts: [],
    sorting: undefined
};


export const paymentFiltersSlice = createSlice({
    name: 'paymentFilters',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setPaymentMethod: (state, action: PayloadAction<PaymentFilterInterface['paymentMethod']>) => {
            state.paymentMethod = action.payload;
        },
        setAccounts: (state, action: PayloadAction<PaymentFilterInterface['accounts']>) => {
            state.accounts = action.payload;
        },
        setSorting: (state, action: PayloadAction<PaymentFilterInterface['sorting']>) => {
            state.sorting = action.payload;
        },
        addAccountsCheckbox: (state, action: PayloadAction<any>) => {
            const isPresent = state.accounts?.find(item => item.id === action.payload.id)
            if(isPresent) {
                state.accounts = state.accounts?.filter(filterItem => filterItem.id !== action.payload.id)
            } else {
                state.accounts.push(action.payload)
            }
        },
        clearAll: (state) => {
            state.accounts = [];
            state.paymentMethod = undefined;
            state.sorting = undefined;
        },

    },
});

export const { setPaymentMethod, setAccounts, setSorting, addAccountsCheckbox, clearAll } = paymentFiltersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectPaymentFilters = (state: any): PaymentFilterInterface => state.paymentFilters;


export default paymentFiltersSlice.reducer;
