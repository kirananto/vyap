import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'src/redux/store'
import type { Organization } from '../Login/credentialsSlice'

export interface IInbox  {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    ownerId: string;
    recipientId: string;
    lastMsg: string;
    inboxHash: string;
    isSupplier: boolean;
    outstandingAmount: string;
    unseenNumbers: number;
    recipient: Organization;
}
export interface customersInterface {
    customers: IInbox[];
    total: number
}

const initialState: customersInterface = {
    customers: [],
    total: 0
}


export const customersSlice = createSlice({
    name: 'customers',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setCustomers: (state, action: PayloadAction<customersInterface['customers']>) => {
            state.customers = action.payload
        },
        setCustomerTotal: (state, action: PayloadAction<customersInterface['total']>) => {
            state.total = action.payload
        },
        clearAll: (state) => {
            state.customers = []
            state.total = 0
        },

    },
})

export const { setCustomers, setCustomerTotal, clearAll } = customersSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectCustomerInfo = (state: RootState): customersInterface => state.customers


export default customersSlice.reducer