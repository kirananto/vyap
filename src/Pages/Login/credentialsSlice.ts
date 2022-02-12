import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'src/redux/store'


export interface Organization {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    listPrivately: boolean;
    officeNumber: string;
    profileImageUrl?: any;
    gstNumber: string;
    officeAddress: string;
    email: string;
    pinCode: string;
    isSupplier: boolean;
    organizationLocationId?: any;
    categoryId?: any;
}
export interface UserSettings {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isDarkMode: boolean;
}

export interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    phone: string;
    email: string;
    lastSeen: Date;
    roleId: string;
    profileImageUrl: string;
    settingsId?: any;
    settings: UserSettings | null
    organizationId: string;
    organization: Organization | null;
}

export interface CredentialsInterface {
    user: User | undefined;
    token?: string | undefined;
}

const initialState: CredentialsInterface = {
    token: undefined,
    user: undefined,
}


export const credentialsSlice = createSlice({
    name: 'credentials',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setCredentials: (state, action: PayloadAction<CredentialsInterface>) => {
            state.token = action.payload.token
            state.user = action.payload.user
        },
        setUserName: (state, action: PayloadAction<string>) => {
            if(state.user) {
                state.user.name = action.payload
            }
        },
        setUserEmail: (state, action: PayloadAction<string>) => {
            if(state.user) {
                state.user.email = action.payload
            }
        },
        setPinCode: (state, action: PayloadAction<string>) => {
            if(state.user?.organization) {
                state.user.organization.pinCode = action.payload
            }
        },
        setBusinessName: (state, action: PayloadAction<string>) => {
            if(state.user?.organization) {
                state.user.organization.name = action.payload
            }
        },
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            if(state.user?.settings) {
                state.user.settings.isDarkMode = action.payload
            }
        },
    },
})

export const { setCredentials, setUserName, setUserEmail, setPinCode, setBusinessName, setDarkMode } = credentialsSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectCredentials = (state: RootState): CredentialsInterface => state.credentials


export default credentialsSlice.reducer