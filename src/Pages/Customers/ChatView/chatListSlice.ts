import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchInboxById, fetchThreadsById } from 'src/API/inbox.axios'
import type { IOrderItem, orderInterface } from 'src/Pages/Customers/ChatView/Cards/OrderCard'
import type { paymentObject } from 'src/Pages/Customers/ChatView/Cards/PaymentCard'
import type { RootState } from 'src/redux/store'
import type { Organization } from '../../Login/credentialsSlice'

interface chatListInterface {
    [key: string]: IndividualChatInterface
}

export interface IndividualChatInterface {
    inboxHash?: string
    isLoading: boolean
    id: string
    error: boolean
    createdAt: Date;
    updatedAt: Date;
    isSupplier: boolean;
    ownerId: string;
    recipientId: string;
    lastMsg: string;
    outstandingAmount: string;
    unseenNumbers: number;
    recipient: Organization;
    threads: ThreadInterface[]
}


export enum ThreadTypeEnum {
    'PAYMENT' = 0,
    'ORDER' = 1,
    'MESSAGE' = 2
}

export interface ThreadInterface {
    id: string;
    createdAt: string;
    updatedAt: string;
    inboxHash?: string;
    senderId: string;
    msg: string;
    type: ThreadTypeEnum;
    meta: string;
    payment?: paymentObject
    order?: orderInterface

}

const initialState: chatListInterface = {}

export const fetchThreadsByInbox = createAsyncThunk(
    'chatList/fetchThreadsByInbox',
    async ({ token, inboxHash, offset, limit, id }: { token?: string; inboxHash?: string; offset: number; id: string; limit: number }) => {
        const response = await fetchThreadsById({ token: token, inboxId: inboxHash, offset, limit })
        return {
            inboxHash: inboxHash,
            id: id,
            isLoading: false,
            error: false,
            threads: response.data?.data as ThreadInterface[]
        }
    }
)
export const fetchInboxAction = createAsyncThunk(
    'chatList/fetchInboxAction',
    async ({ token, id }: { token?: string; id?: string }) => {
        const response = await fetchInboxById({ token, id: id })
        return response.data
    }
)

export const chatListSlice = createSlice({
    name: 'chatList',
    initialState,
    reducers: {
        setCustomers: (state, action: PayloadAction<chatListInterface>) => {
            // Return array as key value object
            const newState = Object.values(action.payload).reduce((acc: chatListInterface, curr) => {
                acc[curr.id] = { ...(state[curr.id] ?? {}), ...curr, threads: state[curr.id]?.threads ?? [] }
                return acc
            }, {})
            return newState
        },
        setPaymentInfo: (state, action: PayloadAction<{ inboxId?: string, threadId?: string, payment: paymentObject }>) => {
            const threadIndex = state[action.payload.inboxId ?? ''].threads.findIndex(findItem => findItem.id === action.payload.threadId)
            state[action.payload.inboxId ?? ''].threads[threadIndex].payment = action.payload.payment
        },
        setOrderInfo: (state, action: PayloadAction<{ inboxId: string, threadId?: string, order: orderInterface }>) => {
            const threadIndex = state[action.payload.inboxId].threads.findIndex(findItem => findItem.id === action.payload.threadId)
            state[action.payload.inboxId].threads[threadIndex].order = action.payload.order
        },
        setOrderStatus: (state, action: PayloadAction<{ inboxId: string, threadId?: string, orderStatus: orderInterface['orderStatus'] }>) => {
            const threadIndex = state[action.payload.inboxId].threads.findIndex(findItem => findItem.id === action.payload.threadId)
            if(state[action.payload.inboxId].threads[threadIndex].order !== undefined) {
                //@ts-ignore
                state[action.payload.inboxId].threads[threadIndex].order.orderStatus = action.payload.orderStatus
            } 
        },
        setOrderItems: (state, action: PayloadAction<{ inboxId: string, threadId?: string, orderItems: IOrderItem[] }>) => {
            const threadIndex = state[action.payload.inboxId].threads.findIndex(findItem => findItem.id === action.payload.threadId)
            const order = state[action.payload.inboxId].threads[threadIndex].order
            if (order) {
                state[action.payload.inboxId].threads[threadIndex].order = {
                    ...order,
                    orderItems: action.payload.orderItems
                }
            }
        },
        clearAll: () => {
            return {}
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchThreadsByInbox.fulfilled, (state, action) => {
            if (state[action.payload.id]?.threads) {
                const existingItems = state[action.payload.id].threads
                const newItems = action.payload.threads
                state[action.payload.id].threads = newItems.map((item: ThreadInterface) => {
                    const existingItem = existingItems.find(findItem => findItem.id === item.id) ?? {}
                    return { ...existingItem, ...item }
                })
                state[action.payload.id].isLoading = false
            } else {
                state[action.payload.id] = { ...(state[action.payload.id] ?? {}), ...action.payload, isLoading: false, error: false }
            }
        }),
        builder.addCase(fetchThreadsByInbox.pending, (state, action: PayloadAction<undefined, string, { arg: { id: string }}>) => {
            if (state[action.meta?.arg?.id]) {
                state[action.meta?.arg?.id].error = false
                state[action.meta?.arg?.id].isLoading = true
            }
        }),
        builder.addCase(fetchThreadsByInbox.rejected, (state, action: PayloadAction<unknown, string, { arg: { id?: string }}>) => {
            const id = action.meta?.arg?.id
            if (id && state[id]) {
                state[id].error = true
                state[id].isLoading = false
            }
        }),
        builder.addCase(fetchInboxAction.fulfilled, (state, action) => {
            state[action.payload.id] = { ...(state[action.payload.id] ?? {}), ...action.payload, isLoading: false, error: false }
        }),
        builder.addCase(fetchInboxAction.pending, (state, action: PayloadAction<undefined, string, { arg: { id?: string }}>) => {
            const id = action.meta?.arg?.id
            if (id && state[id]) {
                state[id].error = false
                state[id].isLoading = true
            }
        }),
        builder.addCase(fetchInboxAction.rejected, (state, action: PayloadAction<unknown, string, { arg: { id?: string }}>) => {
            const id = action.meta?.arg?.id
            if (id && state[id]) {
                state[id].error = true
                state[id].isLoading = false
            }
        })
    },
})

export const {
    setOrderInfo,
    setOrderStatus,
    setPaymentInfo,
    setOrderItems,
    setCustomers,
    clearAll
} = chatListSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectChatList = (state: RootState): chatListInterface => state.chatList


export default chatListSlice.reducer