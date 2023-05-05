import {createAsyncThunk} from "@reduxjs/toolkit";
import {instanceAuth} from "../../../utils/axios";

//типизировать response

interface AuthRequestParams {
    id: string;
    auth_date: string;
    hash: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
}


export const login = createAsyncThunk(
    "auth/login",
    async (params: AuthRequestParams, {rejectWithValue}) => {
        try {

            const response = await instanceAuth.get("auth/login", {
                params: {
                    id: params.id,
                    auth_date: params.auth_date,
                    hash: params.hash,
                    first_name: params.first_name,
                    last_name: params.last_name,
                    username: params.username,
                    photo_url: params.photo_url,
                },
            });

            const data = response.data;

            if (response.status !== 200) {
                throw new Error("My Error");
            }
            console.log(data.data);
            return data.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);