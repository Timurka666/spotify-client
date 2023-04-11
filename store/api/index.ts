import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";
import { HYDRATE } from "next-redux-wrapper";
import { AppState, AppStore } from "..";
import { IGetMe, ILogReq, ILogRes, IRegReq, IRegRes, IUploadAlbumRes } from "./interfaces";

export const musicApi = createApi({
    reducerPath: 'music/api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.baseUrl}/api`,
        prepareHeaders(headers) {
            const token: string = getCookie('jwt') as string;

            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
          return action.payload[reducerPath]
        }
      },
    endpoints(build) {
        return {
            registerUser: build.mutation<IRegRes, IRegReq>({
                query: (req) => ({
                    method: 'POST',
                    url: '/user/register',
                    body: req
                })
            }),
            loginUser: build.mutation<ILogRes, ILogReq>({
                query: (req) => ({
                    method: 'POST',
                    url: '/user/login',
                    body: req
                })
            }),
            getMe: build.query<IGetMe, string>({
                query: (jwt) => ({
                    url: '/user/getMe',
                    headers: {
                        Authorization: jwt
                    }
                })
            }),
            uploadAlbum: build.mutation<{album: IUploadAlbumRes}, FormData>({
                query: (body) => ({
                    url: '/album/createNewAlbum',
                    method: 'POST',
                    headers: {
                        ContentType: 'multipart/form-data',
                        Authorization: getCookie('jwt') as string
                    },
                    body
                })
            })
        }
    }
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useUploadAlbumMutation
} = musicApi;
