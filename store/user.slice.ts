import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});