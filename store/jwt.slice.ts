import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "cookies-next";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from ".";

export interface state {
    jwt: string
}
const initialState: state = {
    jwt: getCookie('jwt') as string || ''
}

export const JwtSlice = createSlice({
    name: 'jwt',
    initialState,
    reducers: {
        pushJwt: (state, action: PayloadAction<string>) => {
                state.jwt = action.payload;
                const date = new Date(Date.now() + (Number(process.env.jwtExpires) * 24 * 60 * 60 * 1000));
                setCookie('jwt', `${action.payload}`, {expires: date});
        }
    },
    /*extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.jwt
            }
        }
    },*/
});

export const selectJwt = (state: AppState) => state.jwt.jwt;