import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrganizationLocationInterface {
    lat: number,
    lng: number
}

export interface SignupInterface {
    name: string;
    phone: string;
    email: string;
    pinCode: string;
    organizationLocation: OrganizationLocationInterface
    businessName: string
    listPrivately: boolean
}

const initialState: SignupInterface = {
    name: 'undefined',
    phone: '',
    email: '',
    pinCode: '',
    organizationLocation: {
        lat: 41,
        lng: 41
    },
    businessName: '',
    listPrivately: false

};


export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPinCode: (state, action: PayloadAction<string>) => {
            state.pinCode = action.payload;
        },
        setBusinessName: (state, action: PayloadAction<string>) => {
            state.businessName = action.payload;
        },
        setListPrivately: (state, action: PayloadAction<boolean>) => {
            state.listPrivately = action.payload;
        },
        setOrganizationLocation: (state, action: PayloadAction<OrganizationLocationInterface>) => {
            state.organizationLocation.lat = action.payload.lat;
            state.organizationLocation.lng = action.payload.lng;
        },
    },
});

export const { setName, setPhone, setBusinessName, setEmail, setListPrivately, setOrganizationLocation, setPinCode } = signupSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selectSignupInfo = (state: any): SignupInterface => state.signup;


export default signupSlice.reducer;
