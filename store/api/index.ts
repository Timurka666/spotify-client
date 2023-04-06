import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { IRegReq, IRegRes } from "./interfaces";

export const musicApi = createApi({
    reducerPath: 'music/api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.baseUrl}/api`,
        prepareHeaders(headers, {getState}) {
            const token = (getState() as RootState).jwt.jwt;

            if (token) {
                headers.set('authorization', token);
            }
            return headers;
        },
    }),
    endpoints(build) {
        return {
            registerUser: build.mutation<IRegRes, IRegReq>({
                query: (req) => ({
                    method: 'POST',
                    url: '/user/register',
                    body: req
                })
            })
        }
    }
});

export const {useRegisterUserMutation} = musicApi;
