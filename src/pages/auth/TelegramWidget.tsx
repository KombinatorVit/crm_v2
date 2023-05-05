import {useEffect} from "react";
import {login} from "../../store/thunks/auth";
import {useAppDispatch} from "../../utils/hooks";

export interface IUser {
    id: string,
    auth_date: number,
    hash: string,
    first_name?: string,
    last_name?: string,
    username: string,
    photo_url?: string
}


const TelegramWidget: React.FC = () => {
    const dispatch = useAppDispatch();


    useEffect(() => {
        const script = document.createElement("script");
        const onTelegramAuth = (user: IUser) => {
            console.log(user);
            dispatch(login(user));
        };
        window.onTelegramAuth = onTelegramAuth;

        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.async = true;
        script.setAttribute(
            "data-telegram-login",
            "Nzt_Team_Bot"
        );
        script.setAttribute("data-size", "large");
        script.setAttribute("data-radius", "20");
        script.setAttribute(
            "data-onauth",
            "onTelegramAuth(user)"
        );
        script.setAttribute(
            "data-request-access",
            "write"
        );

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <div id="telegram-login-button"/>;
};

export default TelegramWidget;
