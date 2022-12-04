import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authSlice from "./slices/authSlice";

const persistConfig = {
    key: "root",
    storage,
};

const reducer = combineReducers({
    auth: authSlice,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
});
export const persistor = persistStore(store);
