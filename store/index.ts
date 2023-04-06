import { bindActionCreators, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { musicApi } from "./api";
import { JwtSlice } from "./jwt.slice";
import { UserSlice } from "./user.slice";

export const store = configureStore({
    reducer: {
        [musicApi.reducerPath]: musicApi.reducer,
        user: UserSlice.reducer,
        jwt: JwtSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(musicApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export const actions = {
    ...UserSlice.actions,
    ...JwtSlice.actions
}

export const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators(actions, dispatch);
};
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;