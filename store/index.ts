import { Action, bindActionCreators, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "./syncStorage";
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

const persistConfig = {
  key: "musicPlatform",
  whitelist: ["user", "myAlbums", "player"],
  blacklist: [musicApi.reducerPath, "watchedAlbum"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(musicApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
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
    const dispatch = useDispatch();

    return bindActionCreators(actions, dispatch);
};
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
