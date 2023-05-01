import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {telegramLogin} from "../store/slice/authSlice";

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>({});

    function onTelegramAuth(user: any) {
        setUser(user);
        const { id, auth_date, hash, first_name, last_name, username, photo_url } = user;
        console.log(user);
        telegramLogin({ id, auth_date, hash, first_name, last_name, username, photo_url });
        navigate("/");
    }

    return (
        <div>
            <h1>Login Page</h1>
        </div>
    );
}

export default Login;
