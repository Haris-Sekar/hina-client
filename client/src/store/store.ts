import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./Reducers/UserReducers";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import PageSettingsReducer from "./Reducers/PageSettingsReducers";

export const store = configureStore({
    reducer: {
        user: UserReducer.reducer,
        pageSettings: PageSettingsReducer
    }
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;