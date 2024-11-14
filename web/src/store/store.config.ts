// store.ts
import {configureStore} from '@reduxjs/toolkit';
import remindersReducer from "./reminderSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
    reducer: {
        remindersReducer,
        cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;