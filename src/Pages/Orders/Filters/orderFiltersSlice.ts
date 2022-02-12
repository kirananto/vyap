import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { OrderStatusType } from '../enum'

export interface OrderFilterInterface {
    orderStatus: OrderStatusType | undefined;
    account: { id: string, name: string } | undefined;
    sorting: 'latest' | 'price-high-low' | 'price-low-high' | undefined;
}

const initialState: OrderFilterInterface = {
    orderStatus: undefined,
    account: undefined,
    sorting: undefined
}


export const orderFiltersSlice = createSlice({
    name: 'orderFilters',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setOrderStatus: (state, action: PayloadAction<OrderFilterInterface['orderStatus']>) => {
            state.orderStatus = action.payload
        },
        setAccount: (state, action: PayloadAction<OrderFilterInterface['account']>) => {
            state.account = action.payload
        },
        setSorting: (state, action: PayloadAction<OrderFilterInterface['sorting']>) => {
            state.sorting = action.payload
        },
        clearAll: (state) => {
            state.account = undefined
            state.orderStatus = undefined
            state.sorting = undefined
        },

    },
})

export const { setOrderStatus, setAccount, setSorting, clearAll } = orderFiltersSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectOrderFilters = (state: any): OrderFilterInterface => state.orderFilters


export default orderFiltersSlice.reducer