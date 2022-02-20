
import credentialsSlice from '../Pages/Login/credentialsSlice'
import signupSlice from '../Pages/Signup/signupSlice'

import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import placeOrderSlice from 'src/Pages/Customers/ChatView/PlaceOrder/placeOrderSlice'
import addProductSlice from 'src/Pages/Product/AddProduct/redux/addProductSlice'
import i18nSlice from 'src/i18n/i18nSlice'
import productFiltersSlice from 'src/Pages/Product/productFiltersSlice'
import paymentFiltersSlice from 'src/Pages/Payments/Filters/paymentFiltersSlice'
import orderFiltersSlice from 'src/Pages/Orders/Filters/orderFiltersSlice'
import customersSlice from 'src/Pages/Customers/customersSlice'
import addItemsproductFiltersSlice from 'src/Pages/Customers/ChatView/PlaceOrder/AddItem/addProductFiltersSlice'
import chatListSlice from 'src/Pages/Customers/ChatView/chatListSlice'
import productsSlice from 'src/Pages/Product/productsSlice'


const rootReducer = combineReducers({
    credentials: credentialsSlice,
    signup: signupSlice,
    placeorder: placeOrderSlice,
    addproduct: addProductSlice,
    i18n: i18nSlice,
    productFilters: productFiltersSlice,
    addItemsproductFilters: addItemsproductFiltersSlice,
    paymentFilters: paymentFiltersSlice,
    orderFilters: orderFiltersSlice,
    customers: customersSlice,
    products: productsSlice,
    chatList: chatListSlice
})
const persistConfig = { key: 'root', version: 1, storage, blacklist: ['signup', 'placeorder', 'paymentFilters', 'orderFilters', 'productFilters', 'addItemsproductFilters'] }
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({ reducer: persistedReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], }, }), })
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>;