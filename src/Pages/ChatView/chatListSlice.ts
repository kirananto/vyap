import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchInboxById, fetchThreadsById } from 'src/API/inbox.axios';
import type { Organization } from '../Login/credentialsSlice';

interface chatListInterface {
    [key: string]: IndividualChatInterface
}

interface IndividualChatInterface {
    inboxHash: string
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
    inboxHash: string;
    senderId: string;
    msg: string;
    type: ThreadTypeEnum;
    meta: string;
}

const initialState: chatListInterface = {}

export const fetchThreadsByInbox = createAsyncThunk(
    'chatList/fetchThreadsByInbox',
    async ({ token, inboxHash, offset, limit, id }: { token: string; inboxHash: string; offset: number; id: string; limit: number }) => {
        const response = await fetchThreadsById({ token: token!, inboxId: inboxHash!, offset, limit })
        return {
            inboxHash: inboxHash,
            id: id,
            isLoading: false,
            error: false,
            threads: response.data?.data
        }
    }
)
export const fetchInboxAction = createAsyncThunk(
    'chatList/fetchInboxAction',
    async ({ token, id }: { token: string; id: string }) => {
        const response = await fetchInboxById(token, id!)
        return response.data
    }
)

export const chatListInterface = createSlice({
    name: 'chatList',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        clearAll: () => {
            return {}
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchThreadsByInbox.fulfilled, (state, action) => {
            // Add user to the state array
            state[action.payload.id] = { ...(state[action.payload.id] ?? {}), ...action.payload };
        }),
        builder.addCase(fetchThreadsByInbox.pending, (state, action: any) => {
            // Add user to the state array
            if (state[action.meta?.args?.id]) {
                state[action.meta?.args?.id].error = false
                state[action.meta?.args?.id].isLoading = true
            }
        }),
        builder.addCase(fetchThreadsByInbox.rejected, (state, action: any) => {
            // Add user to the state array
            if (state[action.meta?.args?.id]) {
                state[action.meta?.args?.id].error = true
                state[action.meta?.args?.id].isLoading = false
            }
        }),
        builder.addCase(fetchInboxAction.fulfilled, (state, action) => {
            // Add user to the state array
            state[action.payload.id] = { ...(state[action.payload.id] ?? {}), ...action.payload };
        }),
        builder.addCase(fetchInboxAction.pending, (state, action: any) => {
            // Add user to the state array
            if (state[action.meta?.args?.id]) {
                state[action.meta?.args?.id].error = false
                state[action.meta?.args?.id].isLoading = true
            }
        }),
        builder.addCase(fetchInboxAction.rejected, (state, action: any) => {
            // Add user to the state array
            if (state[action.meta?.args?.id]) {
                state[action.meta?.args?.id].error = true
                state[action.meta?.args?.id].isLoading = false
            }
        })
    },
});

export const {
    clearAll
} = chatListInterface.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectChatList = (state: any): chatListInterface => state.chatList;


export default chatListInterface.reducer;
