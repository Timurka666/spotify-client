import { Action, bindActionCreators, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { musicApi } from "./api";
import { JwtSlice } from "./jwt.slice";
import { WindowSlice } from "./modalWindow.slice";
import { UserSlice } from "./user.slice";
import { MyAlbumsSlice } from "./album.slice";
import { PlayerSlice } from "./player.slice";
import { currentAlbumSlice } from "./currentlyWatchedAlbum.slice";



const rootReducer = combineReducers({
    [musicApi.reducerPath]: musicApi.reducer,
    [UserSlice.name]: UserSlice.reducer,
    [JwtSlice.name]: JwtSlice.reducer,
    [WindowSlice.name]: WindowSlice.reducer,
    [MyAlbumsSlice.name]: MyAlbumsSlice.reducer,
    [PlayerSlice.name]: PlayerSlice.reducer,
    [currentAlbumSlice.name]: currentAlbumSlice.reducer,
})
//@ts-ignore
export const makeStore = ({reduxWrapperMiddleware}) =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({serializableCheck: false}).concat(musicApi.middleware, reduxWrapperMiddleware)
  });


export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const actions = {
    ...UserSlice.actions,
    ...JwtSlice.actions,
    ...WindowSlice.actions,
    ...MyAlbumsSlice.actions,
    ...PlayerSlice.actions,
    ...currentAlbumSlice.actions,
}

export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>();

    return bindActionCreators(actions, dispatch);
};
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore);