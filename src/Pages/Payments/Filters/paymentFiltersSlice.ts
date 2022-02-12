import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PaymentFilterInterface {
    paymentMethod: string | undefined;
    account: { id: string, name: string } | undefined;
    sorting: 'latest' | 'price-high-low' | 'price-low-high' | undefined;
}

const initialState: PaymentFilterInterface = {
    paymentMethod: undefined,
    account: undefined,
    sorting: undefined
}


export const paymentFiltersSlice = createSlice({
    name: 'paymentFilters',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setPaymentMethod: (state, action: PayloadAction<PaymentFilterInterface['paymentMethod']>) => {
            state.paymentMethod = action.payload
        },
        setAccount: (state, action: PayloadAction<PaymentFilterInterface['account']>) => {
            state.account = action.payload
        },
        setSorting: (state, action: PayloadAction<PaymentFilterInterface['sorting']>) => {
            state.sorting = action.payload
        },
        clearAll: (state) => {
            state.account = undefined
            state.paymentMethod = undefined
            state.sorting = undefined
        },

    },
})

export const { setPaymentMethod, setAccount, setSorting, clearAll } = paymentFiltersSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectPaymentFilters = (state: any): PaymentFilterInterface => state.paymentFilters


export default paymentFiltersSlice.reducer