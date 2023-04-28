import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "../index";

interface AuthState {
    isLoggedIn: boolean;
    accessToken: string | null;
    expiresIn: number | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    accessToken: null,
    expiresIn: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.isLoggedIn = true;
            state.accessToken = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.accessToken = null;
            state.expiresIn = null;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
