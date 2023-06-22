import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { IAlbumRes } from "./api/interfaces";
import { musicApi } from "./api";

const initialState: IAlbumRes = {
    author: '',
    coverPath: '',
    id: -1,
    name: '',
    publisher: '',
    tracks: []
}

export const currentAlbumSlice = createSlice({
    name: 'watchedAlbum',
    initialState,
    reducers: {
        pushAlbum: (state, action: PayloadAction<IAlbumRes>) => {
            state.id = action.payload.id;
            state.author = action.payload.author;
            state.coverPath = action.payload.coverPath;
            state.name = action.payload.name;
            state.publisher = action.payload.publisher;
            state.tracks = cloneDeep(action.payload.tracks);
        },
        removeTrack: (state, action: PayloadAction<number>) => {
            const newTracks = state.tracks.filter(el => el.id !== action.payload);
            state.tracks = cloneDeep(newTracks);
        }
    },
    extraReducers(builder) {
        builder.addMatcher(
            musicApi.endpoints.getAlbum.matchFulfilled,
            (state, action) => {
                const {author, id, coverPath, name, publisher, tracks} = action.payload;
                state.author = author;
                state.id = id;
                state.coverPath = coverPath;
                state.publisher = publisher;
                state.name = name;
                state.tracks = cloneDeep(tracks);
            }
        )
    },
})