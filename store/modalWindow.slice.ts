import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export enum WindowType {
    WARN = 'warning',
    ERROR = 'error',
    NOTIF = 'notification'
}
export interface state {
    isActive: boolean,
    message: string,
    type: WindowType
}
const initialState: state = {
    isActive: false,
    message: '',
    type: WindowType.NOTIF
}

export const WindowSlice = createSlice({
    name: 'modalWindows',
    initialState,
    reducers: {
        switchActive: (state) => {
            state.isActive = !state.isActive;
        },
        callWindow: (state, action: PayloadAction<{message: string, type: WindowType}>) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.isActive = true;
        }
    }
})