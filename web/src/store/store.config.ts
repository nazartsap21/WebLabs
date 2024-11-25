// store.ts
import {configureStore} from '@reduxjs/toolkit';
import remindersReducer from "./reminderSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

const store = configureStore({
    reducer: {
        remindersReducer,
        cartReducer,
        authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;