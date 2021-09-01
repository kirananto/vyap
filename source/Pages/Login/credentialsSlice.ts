import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    organizationId: string;
}

export interface CredentialsInterface {
    user: User | undefined;
    token: string | undefined;
}

const initialState: CredentialsInterface = {
  token: undefined,
  user: undefined,
};


export const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialsInterface>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token = action.payload.token;
      state.user = action.payload.user
    },
  },
});

export const { setCredentials } = credentialsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectCredentials = (state: any): CredentialsInterface => state.credentials;


export default credentialsSlice.reducer;
