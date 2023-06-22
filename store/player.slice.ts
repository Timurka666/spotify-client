import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { IAlbum, ITrack } from "./api/interfaces";

interface IPlayer {
    currentAlbum: IAlbum | null | undefined,
    isShown: boolean,
    isPlayed: boolean,
    volume: number,
    currentTime: number,
    length: number,
    currentTrack: ITrack | null
}

const initialState: IPlayer = {
    currentAlbum: null,
    currentTrack: null,
    length: 0,
    isShown: false,
    isPlayed: false,
    volume: 100,
    currentTime: 0
}

export const PlayerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        playAlbum: (state, action: PayloadAction<IAlbum>) => {
            state.currentAlbum = cloneDeep(action.payload);
            state.currentTrack = cloneDeep(state.currentAlbum.tracks[0]);
        },
        closePlayer: (state) => {
            state.currentAlbum = null;
            state.currentTrack = null;
            state.isShown = false;
            state.isPlayed = false;

        },
        setLength: (state, action: PayloadAction<number>) => {
            state.length = cloneDeep(action.payload);
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = cloneDeep(action.payload);
        },
        playTrack: (state) => {
            state.isPlayed = true;
        },
        pauseTrack: (state) => {
            state.isPlayed = false;
        },
        hidePlayer: (state) => {
            state.isShown = false;
        },
        showPlayer: (state) => {
            state.isShown = true;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        switchToNext: (state) => {
            let newTrack: ITrack | undefined;
            const length = state.currentAlbum?.tracks.length as number;

            state.currentAlbum?.tracks.forEach((el, i) => {
                if (el.id === state.currentTrack?.id && i < length-1) {
                    newTrack = state.currentAlbum?.tracks[i+1];
                }
            });

            if (newTrack) {
                state.currentTrack = cloneDeep(newTrack);
            }
            
        },
        switchToPrev: (state) => {
            let newTrack: ITrack | undefined;

            state.currentAlbum?.tracks.forEach((el, i) => {
                if (el.id === state.currentTrack?.id && i > 0) {
                    newTrack = state.currentAlbum?.tracks[i-1];
                }
            });

            if (newTrack) {
                state.currentTrack = cloneDeep(newTrack);
            }
        }
    },
});
