import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getUserLocale from 'get-user-locale';
import { Language, userInterfaceLanguages } from './models/languageModel';
import { matchLanguage } from './utils/i18n';

interface LanguageInterface { language: Language}

const initialState: { language: Language} = {
    language: matchLanguage(getUserLocale(), userInterfaceLanguages),
};


export const i18nSlice = createSlice({
    name: 'addproduct',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setLanguage: (state: LanguageInterface, action: PayloadAction<Language>) => {
            state.language = action.payload;
        },

    },
});

export const {
    setLanguage
} = i18nSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.credentials.value)`
export const selecti18nConfig = (state: any): LanguageInterface => state.i18n;


export default i18nSlice.reducer;
