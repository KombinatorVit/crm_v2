import React from "react";
import TelegramWidget, {IUser} from "./TelegramWidget";
// import {useStyles} from "./styles";
import {useDispatch} from "react-redux";
import {login} from "../../store/thunks/auth";


function LoginPage() {
    // const classes = useStyles();
    const dispatch = useDispatch();


    const userTest: IUser = {
        id: "1",
        auth_date: Date.now(),
        hash: "",
        first_name: "",
        last_name: "",
        username: "",
        photo_url: ""
    };

    function onClickHandler(userTest) {
        dispatch(login(userTest));

    }

    return (
//className={classes.root}
        <div >
            <button onClick={onClickHandler}> test</button>
            <h1>Login with Telegram</h1>
            <TelegramWidget/>
        </div>
    );
}

export default LoginPage;
