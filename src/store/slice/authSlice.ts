import axios from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    accessToken: string | null;
    expiresTime: number | null;
    loading: boolean;
    error: string | null;
}

interface AuthRequestParams {
    id: string;
    auth_date: string;
    hash: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
}

const initialState: AuthState = {
    accessToken: null,
    expiresTime: null,
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    "auth/login",
    async (params: AuthRequestParams) => {
        const url = "https://api-v1.nzt-team.com/auth/login";

        const response = await axios.get(url, {
            params: {
                id: params.id,
                auth_date: params.auth_date,
                hash: params.hash,
                first_name: params.first_name,
                last_name: params.last_name,
                username: params.username,
                photo_url: params.photo_url,
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${import.meta.env.VITE_TELEGRAM_API_TOKEN}`
            },
        });

        const data = response.data;

        if (response.status !== 200) {
            throw new Error(data.message);
        }
        console.log(data.data);
        return data.data;
    }
);

export const authSlice = createSlice({
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
                state.accessToken = action.payload.access_token;
                state.expiresTime = action.payload.expires_time;
                state.loading = false;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.accessToken = null;
                state.expiresTime = null;
                state.loading = false;
                state.error = action.error.message || "Something went wrong.";
            });
    },
});

export const {resetAuth} = authSlice.actions;

export default authSlice.reducer;
