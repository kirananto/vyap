import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderFilterInterface {
    orderStatus: string | undefined;
    accounts: any[];
    sorting: 'latest' | 'price-high-low' | 'price-low-high' | undefined;
}

const initialState: OrderFilterInterface = {
    orderStatus: undefined,
    accounts: [],
    sorting: undefined
};


export const orderFiltersSlice = createSlice({
    name: 'orderFilters',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setOrderStatus: (state, action: PayloadAction<OrderFilterInterface['orderStatus']>) => {
            state.orderStatus = action.payload;
        },
        setAccounts: (state, action: PayloadAction<OrderFilterInterface['accounts']>) => {
            state.accounts = action.payload;
        },
        setSorting: (state, action: PayloadAction<OrderFilterInterface['sorting']>) => {
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
            state.orderStatus = undefined;
            state.sorting = undefined;
        },

    },
});

export const { setOrderStatus, setAccounts, setSorting, addAccountsCheckbox, clearAll } = orderFiltersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectOrderFilters = (state: any): OrderFilterInterface => state.orderFilters;


export default orderFiltersSlice.reducer;
