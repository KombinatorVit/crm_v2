import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export interface User {
    id: number;
    username: string;
    auth_date: string;
    hash: string;
    first_name?: string;
    last_name?: string;
    photo_url?: string;
}


interface AuthState {
    isAuthenticated: boolean;
    accessToken: string | null;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    accessToken: null,
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.accessToken = action.payload;
            state.error = null;
        },
        logoutSuccess: (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {loginSuccess, logoutSuccess, setError} = authSlice.actions;

// Thunk action for Telegram login
export const telegramLogin = (payload: any) => async (dispatch: any) => {
    try {
        const response = await axios.get(
            `https://api-v1.nzt-team.com/auth/login?id=${payload.id}&auth_date=${payload.auth_date}&hash=${payload.hash}&first_name=${payload.first_name}&last_name=${payload.last_name}&username=${payload.username}&photo_url=${payload.photo_url}`
        );
        console.log(response);
        const {access_token, expires_time} = response.data.data;

        Cookies.set("token", access_token, {expires: expires_time});
        dispatch(loginSuccess(access_token));
    } catch (error) {
        dispatch(setError(error.response.data.message));
    }
};

export default authSlice.reducer;
