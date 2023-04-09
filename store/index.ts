import { Action, bindActionCreators, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { musicApi } from "./api";
import { JwtSlice } from "./jwt.slice";
import { WindowSlice } from "./modalWindow.slice";
import { UserSlice } from "./user.slice";

const rootReducer = combineReducers({
    [musicApi.reducerPath]: musicApi.reducer,
    [UserSlice.name]: UserSlice.reducer,
    [JwtSlice.name]: JwtSlice.reducer,
    [WindowSlice.name]: WindowSlice.reducer
})

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(musicApi.middleware)
  });

export const makeStore = () => {
    const isServer = typeof window === "undefined";
    if (isServer) {
    return makeConfiguredStore(); 
    } else {
        const persistConfig = {
            key: "nextjs",
            whitelist: ["user"],
            storage,
        };
        const persistedReducer = persistReducer(persistConfig, rootReducer);
        let store = configureStore({
        reducer: persistedReducer,
        devTools: process.env.NODE_ENV !== "production",

        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(musicApi.middleware)
        });

        return store;
    }
};
export const persistor = persistStore(makeStore());

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const actions = {
    ...UserSlice.actions,
    ...JwtSlice.actions,
    ...WindowSlice.actions
}

export const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(actions, dispatch);
};
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore);