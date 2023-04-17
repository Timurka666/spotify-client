import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import {IAlbum} from "./api/interfaces"

export interface state {
    myAlbums: IAlbum[]
}

const initialState: state = {
    myAlbums: []
}

export const MyAlbumsSlice = createSlice({
    name: 'myAlbums',
    initialState,
    reducers: {
        pushAlbum: (state, action: PayloadAction<IAlbum>) => {
            state.myAlbums.push({...action.payload})
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.myAlbums
            }
        }
    },
});