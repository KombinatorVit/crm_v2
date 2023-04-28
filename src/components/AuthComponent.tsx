import {FC, useEffect} from "react";
import {loginWithTelegram} from "../store/thunks/auth";
import {logout} from "../store/slice/authSlice";
import {useDispatch, useSelector} from "react-redux";

const AuthComponent: FC = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    console.log(isLoggedIn);

    useEffect(() => {
        dispatch(loginWithTelegram());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleTelegramAuth = () => {
        window.location.href = "https://t.me/Nzt_Team_Bot";
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <p>You are logged in!</p>
                    <button onClick={handleLogout}>Log out</button>
                </div>
            ) : (
                <div>
                    <p>You are not logged in.</p>
                    <button onClick={handleTelegramAuth}>Log in with Telegram</button>
                </div>
            )}
        </div>
    );
};

export default AuthComponent;
