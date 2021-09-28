
import credentialsSlice from '../Pages/Login/credentialsSlice';
import signupSlice from '../Pages/Signup/signupSlice';

import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import placeOrderSlice from 'src/Pages/ChatView/PlaceOrder/placeOrderSlice';
import addProductSlice from 'src/Pages/Product/AddProduct/addProductSlice';


const rootReducer = combineReducers({
    credentials: credentialsSlice,
    signup: signupSlice,
    placeorder: placeOrderSlice,
    addproduct: addProductSlice
})
const persistConfig = { key: 'root', version: 1, storage, }
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({ reducer: persistedReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], }, }), })
export const persistor = persistStore(store)