import axios from "axios/index";
import Cookies from "js-cookie";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAuthToken, User} from "../../slice/auth";



export const login = createAsyncThunk("https://api-v1.nzt-team.com/auth/login", async (payload: User, {rejectWithValue}) => {
    try {
        const response = await axios.get(`/auth/login`, {
            params: payload,
        });
        const {access_token, expires_time} = response.data.data;
        Cookies.set("token", access_token, {expires: expires_time});
        setAuthToken(access_token);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
