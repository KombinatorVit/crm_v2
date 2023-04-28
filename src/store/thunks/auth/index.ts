import { createAsyncThunk } from "@reduxjs/toolkit";

interface LoginResponse {
    access_token: string;
    expires_time: number;
}

export const loginWithTelegram = createAsyncThunk(
    "auth/loginWithTelegram",
    async () => {
        const response = await fetch("https://api-v1.nzt-team.com/auth/login");
        const data: LoginResponse = await response.json();
        return data.access_token;
    }
);
