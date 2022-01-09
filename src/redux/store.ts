
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
import addItemsproductFiltersSlice from 'src/Pages/ChatView/PlaceOrder/AddItem/addProductFiltersSlice';
import chatListSlice from 'src/Pages/ChatView/chatListSlice';
import editProductSlice from './../Pages/Product/EditProduct/redux/editProductSlice';


const rootReducer = combineReducers({
    credentials: credentialsSlice,
    signup: signupSlice,
    placeorder: placeOrderSlice,
    addproduct: addProductSlice,
    editproduct: editProductSlice,
    i18n: i18nSlice,
    productFilters: productFiltersSlice,
    addItemsproductFilters: addItemsproductFiltersSlice,
    paymentFilters: paymentFiltersSlice,
    orderFilters: orderFiltersSlice,
    customers: customersSlice,
    chatList: chatListSlice
})
const persistConfig = { key: 'root', version: 1, storage, blacklist: ['signup', 'placeorder', 'paymentFilters', 'orderFilters', 'addproduct','editproduct', 'productFilters', 'addItemsproductFilters'] }
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({ reducer: persistedReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], }, }), })
export const persistor = persistStore(store)