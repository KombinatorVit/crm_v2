import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {login} from "../store/slice/authSlice";

const TelegramWidget: React.FC = () => {
    const dispatch = useDispatch();

    let onTelegramAuth;


    useEffect(() => {
        const script = document.createElement("script");
        onTelegramAuth = (user: any) => {
            alert("Logged in as " + user.first_name + " " + user.last_name + " (" + user.id + (user.username ? ", @" + user.username : "" + "" + user.hash) + ")");
            dispatch(login(user));
        };
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
