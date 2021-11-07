
import credentialsSlice from '../Pages/Login/credentialsSlice';
import signupSlice from '../Pages/Signup/signupSlice';

import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import placeOrderSlice from 'src/Pages/ChatView/PlaceOrder/placeOrderSlice';
import addProductSlice from 'src/Pages/Product/AddProduct/redux/addProductSlice';
import i18nSlice from 'src/i18nSlice';
import productFiltersSlice from 'src/Pages/Product/productFiltersSlice';
import paymentFiltersSlice from 'src/Pages/Payments/Filters/paymentFiltersSlice';
import orderFiltersSlice from 'src/Pages/Orders/Filters/orderFiltersSlice';
import customersSlice from 'src/Pages/Home/customersSlice';


const rootReducer = combineReducers({
    credentials: credentialsSlice,
    signup: signupSlice,
    placeorder: placeOrderSlice,
    addproduct: addProductSlice,
    i18n: i18nSlice,
    productFilters: productFiltersSlice,
    paymentFilters: paymentFiltersSlice,
    orderFilters: orderFiltersSlice,
    customers: customersSlice
})
const persistConfig = { key: 'root', version: 1, storage, }
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({ reducer: persistedReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], }, }), })
export const persistor = persistStore(store)