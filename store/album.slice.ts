import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import {IAlbum, ITrack} from "./api/interfaces"
import {cloneDeep} from 'lodash';

interface Tracks extends ITrack {
    albumId: number
}
export interface state {
    myAlbums: IAlbum[],
    tracks: Tracks[]
}

const initialState: state = {
    myAlbums: [],
    tracks: []
}

export const MyAlbumsSlice = createSlice({
    name: 'myAlbums',
    initialState,
    reducers: {
        pushAlbum: (state, action: PayloadAction<IAlbum>) => {
            state.myAlbums.push(cloneDeep(action.payload));
        },
        pushTrack: (state, action: PayloadAction<{track: ITrack, albumId: number}>) => {
            const {track, albumId} = action.payload;
            const newTrack = cloneDeep({...track, albumId});
            state.tracks.push(cloneDeep(newTrack));
        }
    },
    /*extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.myAlbums
            }
        }
    }*/
});