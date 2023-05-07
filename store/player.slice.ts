import { createSlice } from "@reduxjs/toolkit";
import { IAlbum, ITrack } from "./api/interfaces";

interface IPlayer {
    currentAlbum: IAlbum | null,
    isShown: boolean,
    isPlayed: boolean,
    volume: number,
    currentTime: number,
    currentTrack: ITrack | null
}

const initialState: IPlayer = {
    currentAlbum: null,
    currentTrack: null,
    isShown: false,
    isPlayed: false,
    volume: 100,
    currentTime: 0
}

export const PlayerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {

    }
});
