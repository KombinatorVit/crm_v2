import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login} from "../../thunks/auth";

interface User {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    photo_url: string;
}

interface AuthState {
    accessToken: string | null;
    expiresTime: number | null;
    loading: boolean;
    error: string | null;
    // isLoggedIn: boolean;
    // user: User | {}
}


const initialState: AuthState = {
    // user: {},
    accessToken: null,
    expiresTime: null,

    // accessToken: Cookies.get("access_token") || null,
//     expiresTime: Cookies.get("expires_time") ? +Cookies.get("expires_time") : null,
    loading: false,
    error: null,
    // isLoggedIn: false
};



 const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.accessToken = null;
            state.expiresTime = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ access_token: string, expires_time: number }>) => {
                //     state.user = action.payload;
                state.accessToken = action.payload.access_token;
                state.expiresTime = action.payload.expires_time;
                state.loading = false;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.accessToken = null;
                state.expiresTime = null;
                state.loading = false;
                state.error = action.payload|| "Something went wrong.";
            });
    },
});

export const {resetAuth} = authSlice.actions;

export default authSlice.reducer;
