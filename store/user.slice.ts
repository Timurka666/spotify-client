import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { musicApi } from "./api";

interface userState {
    id: number,
    nickName: string,
    email: string,
}

const initialState: userState = {
    id: 0,
    nickName: '',
    email: '',
}


export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        pushUser: (state, action: PayloadAction<userState>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.nickName = action.payload.nickName;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            musicApi.endpoints.getMe.matchFulfilled,
            (state, action) => {
                const {id, email, nickName} = action.payload;
                state.id = id;
                state.email = email;
                state.nickName = nickName;
            }
        )
    }
});