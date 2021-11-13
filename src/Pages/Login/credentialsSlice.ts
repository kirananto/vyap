import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface Organization {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    listPrivately: boolean;
    officeNumber: string;
    profileImageUrl?: any;
    gstNumber: string | null;
    officeAddress: string;
    email: string | null;
    pinCode: string;
    isSupplier: boolean;
    isActive: boolean;
    organizationLocationId?: any;
    categoryId?: any;
    category?: any;
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
    email: string | null;
    lastSeen: Date;
    roleId: string;
    profileImageUrl: string | null;
    settingsId?: any;
    settings: UserSettings | null
    organizationId: string;
    organization: Organization | null;
}

export interface CredentialsInterface {
    user: User | undefined;
    token: string | undefined;
}

const initialState: CredentialsInterface = {
  token: 'EVxt0fOsBqyA59RPCIDaVv9Lu-kaWcj8X1H3gUfJMTOUef8YTYBOVyzrX2rqqYghJigaTifEtcrRTSDnxo2YB-_vIQWbmC26FNeU2wrSa98Y',
  user: {
    id: 'b2545594-cc4a-4917-90f5-f895cf6f5c64',
    createdAt: new Date('2021-09-14T13:27:14.980Z'),
    updatedAt: new Date('2021-11-04T01:57:41.773Z'),
    name: 'Kiran Anto',
    phone: '7012918926',
    email: null,
    lastSeen: new Date('2021-09-14T13:27:14.980Z'),
    roleId: '56ec7303-4339-4954-a950-bd97297e81bf',
    profileImageUrl: null,
    settingsId: 'ec2779d3-16e2-46c5-b2f1-c73ae3473bd7',
    organizationId: '29e260d0-89e5-43b7-89de-324fc6fbecdc',
    organization: {
      id: '29e260d0-89e5-43b7-89de-324fc6fbecdc',
      createdAt: new Date('2021-09-14T13:27:14.980Z'),
      updatedAt: new Date('2021-09-14T13:27:14.980Z'),
      name: 'Kiran Anto',
      description: 'Nil',
      listPrivately: true,
      officeNumber: '7012918926',
      profileImageUrl: null,
      gstNumber: null,
      officeAddress: '2323',
      email: null,
      pinCode: '680125',
      isSupplier: true,
      isActive: false,
      organizationLocationId: null,
      categoryId: null,
      category: null
    },
    settings: {
      id: 'ec2779d3-16e2-46c5-b2f1-c73ae3473bd7',
      createdAt: new Date('2021-09-14T13:27:14.980Z'),
      updatedAt: new Date('2021-09-14T13:27:14.980Z'),
      isDarkMode: false
    }
  }
};


export const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialsInterface>) => {
      state.token = action.payload.token;
      state.user = action.payload.user
    },
    setUserName: (state, action: PayloadAction<string>) => {
      if(state.user) {
        state.user.name = action.payload;
      }
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      if(state.user) {
        state.user.email = action.payload;
      }
    },
    setPinCode: (state, action: PayloadAction<string>) => {
      if(state.user?.organization) {
        state.user.organization.pinCode = action.payload;
      }
    },
    setBusinessName: (state, action: PayloadAction<string>) => {
      if(state.user?.organization) {
        state.user.organization.name = action.payload;
      }
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if(state.user?.settings) {
        state.user.settings.isDarkMode = action.payload;
      }
    },
  },
});

export const { setCredentials, setUserName, setUserEmail, setPinCode, setBusinessName, setDarkMode } = credentialsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectCredentials = (state: any): CredentialsInterface => state.credentials;


export default credentialsSlice.reducer;
