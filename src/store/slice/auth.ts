import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import {RootState} from "../store";

interface User {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    photo_url: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    expiresTime: number | null;
}

const initialState: AuthState = {
    user: null,
    accessToken: Cookies.get("access_token") ?? null,
    expiresTime: Cookies.get("expires_time") ?? null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        telegramLogin: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.accessToken = null;
            state.expiresTime = null;
            Cookies.remove("access_token");
            Cookies.remove("expires_time");
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            state.expiresTime = Date.now() + 86400 * 1000;
            Cookies.set("access_token", action.payload, { expires: 1 });
            Cookies.set("expires_time", state.expiresTime.toString(), { expires: 1 });
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.expiresTime = null;
            Cookies.remove("access_token");
            Cookies.remove("expires_time");
        },
    },
});

export const { telegramLogin, setAccessToken, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const getAuthUser = () => async (dispatch: any) => {
    try {
        const response = await axios.get("https://api-v1.nzt-team.com/auth/login", {
            headers: {
                Authorization: `Bearer ${Cookies.get("access_token")}`,
            },
        });
        dispatch(telegramLogin(response.data.data));
    } catch (error) {
        console.log(error);
        dispatch(logout());
    }
};
