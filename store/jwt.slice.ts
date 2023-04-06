import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface state {
    jwt: string
}
const initialState: state = {
    jwt: ''
}

export const JwtSlice = createSlice({
    name: 'jwt',
    initialState,
    reducers: {
        pushJwt: (state, action: PayloadAction<string>) => {
            state.jwt = action.payload;
        }
    }
});