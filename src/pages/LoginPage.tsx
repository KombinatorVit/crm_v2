import React from "react";
import {useDispatch} from "react-redux";
import {login} from "../store/slice/authSlice";
import TelegramWidget from "./TelegramWidget";

function LoginPage() {


    const user = {
        id: "",
        auth_date: "",
        hash: "",
        first_name: "",
        last_name: "",

    };

    return (
        <div>
            <h1>Login with Telegram</h1>
            <button onClick={() => dispatch(login(user))}> Тыкни на меня</button>
            <TelegramWidget />
        </div>
    );
}

export default LoginPage;
